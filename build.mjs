import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { stories, regions, figures, featuredCount } from './stories.mjs';
import { worldMap } from './illustrations.mjs';
import { featureScenes, sceneBackgrounds } from './editorial-art.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const output=path.join(root,'.makefun-kit');
await fs.mkdir(output,{recursive:true});
const tooling=process.env.NEWS_TOOLING_DIR;
const require=createRequire(tooling?path.join(tooling,'package.json'):import.meta.url);
const {chromium}=require('playwright');
const sharp=require('sharp');
const canvas={width:1800,height:1340,scale:2};
const entrySize={width:1024,height:762};
const masterName='world-in-one-day-2026-11-19.png';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const title=s=>escape(s).replaceAll('\n','<br>');
const color=region=>{
  const match=regions.find(item=>item.name===region);
  if(!match)throw new Error(`Unknown region: ${region}`);
  return match.color;
};
if(stories.length!==33||featuredCount!==14||new Set(stories.map(s=>s.url)).size!==33)throw new Error('Expected 33 distinct stories and 14 features');
if(stories.some((s,i)=>s.id!==i+1||s.date!=='2026-11-19'||!s.url||!s.summary))throw new Error('Incomplete or incorrectly dated ledger');
if(regions.some(r=>!r.count)||regions.reduce((n,r)=>n+r.count,0)!==33)throw new Error('Regional accounting mismatch');
if(stories.slice(0,featuredCount).some(s=>typeof featureScenes[s.art]!=='function'))throw new Error('Missing featured illustration');
const sourceLabels=[['REUTERS','Reuters'],['AP','AP'],['AFP','AFP'],['AL JAZEERA','Al Jazeera'],['ABS','ABS'],['IMD','IMD'],['NASA','NASA']];
const activeSources=new Set(stories.flatMap(s=>s.source.toUpperCase().split(' · ')));
if(sourceLabels.filter(([key])=>activeSources.has(key)).length!==activeSources.size)throw new Error('Missing footer source');
const shortSource=s=>s.toUpperCase().replaceAll(' · ',' / ');
const compactCopy=s=>s.replace(/\b\d{1,3}(?:,\d{3})+\b/g,number=>new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(Number(number.replaceAll(',',''))));
const card=s=>{
  return `<article class="story" data-story="${s.id}" style="--region:${color(s.region)};--scene-bg:${sceneBackgrounds[s.art]}"><div class="art">${featureScenes[s.art]()}</div><div class="story-copy"><p class="locator"><b>${s.id}</b><span>${escape(s.place.split(' · ')[0].toUpperCase())} · ${escape(shortSource(s.source))}</span><span class="badge">${escape(s.badge)}</span></p><h2>${title(s.title)}</h2><p class="summary">${escape(compactCopy(s.summary))}</p></div></article>`;
};
const brief=s=>`<p class="brief" data-story="${s.id}" style="--region:${color(s.region)}"><span class="id">${s.id}</span><span class="brief-copy"><b>${escape(s.title)}.</b> ${escape(s.summary)}</span><span class="source">${escape(shortSource(s.source))}</span></p>`;
const briefColumns=[stories.slice(14,21),stories.slice(21,27),stories.slice(27,33)];
const replacements={
  FIGURES:figures.map(([number,label,region])=>`<div class="figure" style="--region:${color(region)}"><strong>${escape(number)}</strong><span>${escape(label)}</span></div>`).join(''),
  REGIONS:regions.map(r=>`<span class="region" style="--region:${r.color}"><i aria-hidden="true"></i>${escape(r.name)} ${r.count}</span>`).join(''),
  LEADS:stories.slice(0,3).map(card).join(''),
  SECOND:stories.slice(3,7).map(card).join(''),
  THIRD:stories.slice(7,11).map(card).join(''),
  FOURTH:stories.slice(11,14).map(card).join(''),
  MAP:worldMap(stories,featuredCount),
  BRIEFS:briefColumns.map(column=>`<div class="brief-column">${column.map(brief).join('')}</div>`).join(''),
  SOURCES:escape(sourceLabels.filter(([key])=>activeSources.has(key)).map(([,label])=>label).join(' · ')),
};
let html=await fs.readFile(path.join(root,'render.html'),'utf8');
for(const [key,value] of Object.entries(replacements)){
  if(!html.includes(`<!-- ${key} -->`))throw new Error(`Missing template slot ${key}`);
  html=html.replace(`<!-- ${key} -->`,value);
}
if(/PENDING|\.\.\.|…|<!-- [A-Z_]+ -->/.test(html))throw new Error('Unresolved placeholder or editorial truncation');
await fs.writeFile(path.join(output,'print.html'),html);
await fs.writeFile(path.join(output,'story-ledger.json'),JSON.stringify(stories,null,2)+'\n');
await fs.writeFile(path.join(output,'sources.md'),'# Source and date ledger\n\n33 distinct stories: 14 features and 19 briefs. All illustrations are original. Event dates and publication dates are distinguished below.\n\n'+stories.map(s=>`## ${s.id}. ${s.title.replaceAll('\n',' ')}\n\n- Source: ${s.source}\n- URL: ${s.url}\n- Region: ${s.region}\n- Event or report date: ${s.date}\n- Copy: ${s.summary}\n${s.note?`- Note: ${s.note}\n`:''}`).join('\n'));

const options={headless:true,args:['--disable-lcd-text','--font-render-hinting=none','--force-color-profile=srgb']};
if(process.env.NEWS_BROWSER_PATH)options.executablePath=process.env.NEWS_BROWSER_PATH;
else if(process.platform==='win32')options.channel='msedge';
const browser=await chromium.launch(options);
try{
  const page=await browser.newPage({viewport:{width:canvas.width,height:canvas.height},deviceScaleFactor:canvas.scale});
  await page.route('**/*',route=>route.abort());
  await page.setContent(html,{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  const audit=await page.evaluate(({width,height})=>{
    const problems=[];
    const bounds=el=>{const r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
    const overlap=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>.8&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>.8;
    const blocks=[...document.querySelectorAll('h1,h2,h3,.calendar,.publication,.subtitle,.edition,.region,.regions-note,.figure,.locator,.summary,.brief,.map-note,.date-check,.footer')];
    const storyIds=[...document.querySelectorAll('[data-story]')].map(el=>Number(el.dataset.story));
    if(storyIds.length!==33||storyIds.some((id,i)=>id!==i+1))problems.push({type:'story-order',storyIds});
    for(const el of blocks){
      const r=bounds(el);
      if(r.left<-.1||r.top<-.1||r.right>width+.1||r.bottom>height+.1)problems.push({type:'page-overflow',text:el.textContent,rect:r});
      if(el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1)problems.push({type:'element-overflow',text:el.textContent});
      for(const parent of [el.closest('.story,.brief-panel,.masthead,.map-panel'),el.closest('.stories,.bottom')]){
        if(parent){const p=bounds(parent);if(r.left<p.left-.1||r.right>p.right+.1||r.top<p.top-.1||r.bottom>p.bottom+.1)problems.push({type:'container-overflow',text:el.textContent,rect:r,parent:p});}
      }
    }
    for(let i=0;i<blocks.length;i++)for(let j=i+1;j<blocks.length;j++){
      if(blocks[i].contains(blocks[j])||blocks[j].contains(blocks[i]))continue;
      if(overlap(bounds(blocks[i]),bounds(blocks[j])))problems.push({type:'text-overlap',a:blocks[i].textContent,b:blocks[j].textContent});
    }
    let textRuns=0;
    const walker=document.createTreeWalker(document.querySelector('.page'),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode;if(!node.textContent.trim()||node.parentElement.closest('svg'))continue;
      const range=document.createRange();range.selectNodeContents(node);
      const container=node.parentElement.closest('.brief,.story,.masthead,.figure,.date-check,.footer,.region,.regions-note');
      for(const r of range.getClientRects()){
        textRuns++;
        if(r.left<0||r.right>width+.1||r.top<0||r.bottom>height+.1)problems.push({type:'text-run-clipped',text:node.textContent});
        if(container){const p=bounds(container);if(r.left<p.left-.6||r.right>p.right+.6||r.bottom>p.bottom+1)problems.push({type:'text-run-container-overflow',text:node.textContent});}
      }
    }
    const labels=[...document.querySelectorAll('.map svg text')];
    for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++)if(overlap(bounds(labels[i]),bounds(labels[j])))problems.push({type:'map-label-overlap',a:labels[i].textContent,b:labels[j].textContent});
    for(const el of document.querySelectorAll('svg text')){
      const box=bounds(el),scene=bounds(el.closest('svg'));
      if(box.left<scene.left-.5||box.right>scene.right+.5||box.top<scene.top-.5||box.bottom>scene.bottom+.5)problems.push({type:'svg-label-clipped',text:el.textContent});
    }
    return{width,height,storyCount:storyIds.length,featuredCount:document.querySelectorAll('.story').length,briefCount:document.querySelectorAll('.brief').length,textBlocks:blocks.length,textRuns,problems};
  },canvas);
  await fs.writeFile(path.join(output,'layout-audit.json'),JSON.stringify(audit,null,2)+'\n');
  if(audit.problems.length)throw new Error(JSON.stringify(audit.problems));
  const capture=await page.screenshot({animations:'disabled'});
  const master=await sharp(capture).removeAlpha().png({compressionLevel:9,adaptiveFiltering:true}).toBuffer();
  const entry=await sharp(master).resize(entrySize.width,entrySize.height,{kernel:'lanczos3'}).png({compressionLevel:9,adaptiveFiltering:true}).toBuffer();
  if(entry.length>=900000)throw new Error(`Entry exceeds 900 KB: ${entry.length}`);
  if(process.env.NEWS_SNAPSHOT_PREVIOUS==='1'){
    await fs.writeFile(path.join(output,'pre-polish-master.png'),await fs.readFile(path.join(root,masterName)));
    await fs.writeFile(path.join(output,'pre-polish-entry.png'),await fs.readFile(path.join(root,'entry.png')));
  }
  if(process.env.NEWS_SNAPSHOT_QUALITY_BASELINE==='1'){
    await fs.writeFile(path.join(output,'pre-upgrade-master.png'),await fs.readFile(path.join(root,masterName)));
    await fs.writeFile(path.join(output,'pre-upgrade-entry.png'),await fs.readFile(path.join(root,'entry.png')));
  }
  await fs.writeFile(path.join(root,masterName),master);
  await fs.writeFile(path.join(root,'entry.png'),entry);
  await sharp(entry).resize({width:300}).png().toFile(path.join(output,'thumbnail-300.png'));
  await sharp(master).resize({width:1440}).png().toFile(path.join(output,'landscape-review.png'));
  console.log(JSON.stringify({master:masterName,masterWidth:canvas.width*canvas.scale,masterHeight:canvas.height*canvas.scale,masterBytes:master.length,entryWidth:entrySize.width,entryHeight:entrySize.height,entryBytes:entry.length,layoutProblems:0,stories:audit.storyCount,features:audit.featuredCount,briefs:audit.briefCount,textRuns:audit.textRuns}));
}finally{await browser.close();}
