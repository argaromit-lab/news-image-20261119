import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { stories, regions, figures } from './stories.mjs';
import { illustrations, worldMap } from './illustrations.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root,'.makefun-kit');
await fs.mkdir(output,{recursive:true});
const tooling = process.env.NEWS_TOOLING_DIR;
const require = createRequire(tooling ? path.join(tooling,'package.json') : import.meta.url);
const { chromium } = require('playwright');
const sharp = require('sharp');
const escape = s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const title = s=>escape(s).replaceAll('\n','<br>');
if(stories.length!==28 || new Set(stories.map(s=>s.id)).size!==28) throw new Error('Expected 28 unique stories');
if(regions.reduce((n,r)=>n+r.count,0)!==28) throw new Error('Regional accounting mismatch');
if(stories.some(s=>s.date!=='2026-11-19')) throw new Error('Out-of-date story');

const card = s=>`<article class="story" data-story="${s.id}"><div class="art">${illustrations[s.id-1]()}</div><div class="story-copy"><p class="locator"><b>${s.id}</b>${escape(s.place.split(' · ')[0])} · ${s.source}</p><h2>${title(s.title)}</h2><p class="summary">${escape(s.summary)}</p></div></article>`;
let html = await fs.readFile(path.join(root,'render.html'),'utf8');
const replacements = {
  REGIONS:`<div class="distribution">${regions.map(r=>`<span style="flex:${r.count};background:${r.color}"></span>`).join('')}</div><div class="region-keys">${regions.map(r=>`<div class="region" style="color:${r.color}">${r.name} ${r.count}</div>`).join('')}</div>`,
  FIGURES:figures.map(([number,label])=>`<div class="figure"><strong>${escape(number)}</strong><span>${escape(label)}</span></div>`).join(''),
  LEADS:stories.slice(0,3).map(card).join(''),
  SECOND:stories.slice(3,7).map(card).join(''),
  THIRD:stories.slice(7,11).map(card).join(''),
  MAP:worldMap(stories),
  BRIEFS:stories.slice(11).map(s=>`<p class="brief" data-story="${s.id}"><span class="id">${s.id}</span><b>${escape(s.place)}:</b> ${escape(s.summary)}</p>`).join(''),
};
for(const [key,value] of Object.entries(replacements)) html=html.replace(`<!-- ${key} -->`,value);
if(/PENDING|\.\.\.|…/.test(html)) throw new Error('Forbidden editorial truncation or status');
await fs.writeFile(path.join(output,'print.html'),html);
await fs.writeFile(path.join(output,'story-ledger.json'),JSON.stringify(stories,null,2)+'\n');
await fs.writeFile(path.join(output,'sources.md'),'# Source and date ledger\n\nAll 28 entries are attributed; accessed 19 November 2026. Dates refer to events or first reports, not merely a rolling URL. Original drawings illustrate subjects and are not documentary images.\n\n'+stories.map(s=>`## ${s.id}. ${s.title.replaceAll('\n',' ')}\n\n- Region: ${s.region}. Publication/event date: ${s.date}.\n- Copy: ${s.summary}\n- Source: [${s.source}](${s.url})\n${s.note?`- Date/attribution note: ${s.note}\n`:''}`).join('\n')+'\n## Exclusions\n\n18 November: Voyager 1 light-day milestone, EU €45bn Ukraine loan proposal, Fed minutes, House Democrats’ Jeffries vote. Fiji disaster declaration was made Wednesday and is excluded despite a 19 November Reuters dateline. NASA’s stellar-merger story and Voyager data issue were published 18 November and are excluded. GTA VI sales are an attributed live estimate, never a final-day certified total. Barty’s formal induction next August is excluded; her reported election is the story.\n');

const options={headless:true,args:['--disable-lcd-text','--font-render-hinting=none','--force-color-profile=srgb']};
if(process.env.NEWS_BROWSER_PATH) options.executablePath=process.env.NEWS_BROWSER_PATH;
else if(process.platform==='win32') options.channel='msedge';
const browser=await chromium.launch(options);
try {
  const page=await browser.newPage({viewport:{width:1024,height:1024},deviceScaleFactor:2});
  await page.route('**/*',route=>route.abort());
  await page.setContent(html,{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  const audit=await page.evaluate(()=>{
    const problems=[];
    const bounds=el=>{const r=el.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
    const overlap=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>.8&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>.8;
    const blocks=[...document.querySelectorAll('h1,h2,h3,.subtitle,.edition,.calendar,.region,.numbers-title,.figure,.locator,.summary,.brief,.map-note,.date-check,.footer')];
    for(const el of blocks){
      const r=bounds(el);
      if(r.left<-.1||r.top<-.1||r.right>1024.1||r.bottom>1024.1) problems.push({type:'page-overflow',text:el.textContent,rect:r});
      if(el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1) problems.push({type:'element-overflow',text:el.textContent});
      const parent=el.closest('.story,.brief-panel,.masthead,.bottom');
      if(parent){const p=bounds(parent);if(r.left<p.left-.1||r.right>p.right+.1||r.bottom>p.bottom+.1)problems.push({type:'container-overflow',text:el.textContent,rect:r,parent:p});}
    }
    for(let i=0;i<blocks.length;i++)for(let j=i+1;j<blocks.length;j++){
      if(blocks[i].contains(blocks[j])||blocks[j].contains(blocks[i]))continue;
      if(overlap(bounds(blocks[i]),bounds(blocks[j])))problems.push({type:'text-overlap',a:blocks[i].textContent,b:blocks[j].textContent});
    }
    // Range rectangles also detect individual text runs escaping their boxes.
    let textRuns=0;
    const walker=document.createTreeWalker(document.querySelector('.page'),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode;if(!node.textContent.trim()||node.parentElement.closest('svg'))continue;
      const range=document.createRange();range.selectNodeContents(node);
      for(const r of range.getClientRects()){
        textRuns++;
        if(r.left<0||r.right>1024.1||r.top<0||r.bottom>1024.1)problems.push({type:'text-run-clipped',text:node.textContent});
      }
    }
    for(const el of document.querySelectorAll('svg text')){
      const box=el.getBoundingClientRect(),scene=el.closest('svg').getBoundingClientRect();
      if(box.left<scene.left-.5||box.right>scene.right+.5||box.top<scene.top-.5||box.bottom>scene.bottom+.5)problems.push({type:'svg-label-clipped',text:el.textContent});
    }
    return {width:1024,height:1024,renderScale:2,storyCount:document.querySelectorAll('[data-story]').length,textBlocks:blocks.length,textRuns,problems};
  });
  await fs.writeFile(path.join(output,'layout-audit.json'),JSON.stringify(audit,null,2)+'\n');
  await page.screenshot({path:path.join(output,'entry-2048.png'),animations:'disabled'});
  await sharp(path.join(output,'entry-2048.png')).resize(1024,1024,{kernel:'lanczos3'}).removeAlpha().png({compressionLevel:9,adaptiveFiltering:true}).toFile(path.join(root,'entry.png'));
  await sharp(path.join(root,'entry.png')).resize(300,300,{kernel:'lanczos3'}).png().toFile(path.join(output,'thumbnail-300.png'));
  const bytes=(await fs.stat(path.join(root,'entry.png'))).size;
  console.log(JSON.stringify({bytes,layoutProblems:audit.problems.length,storyCount:audit.storyCount,textRuns:audit.textRuns}));
  for(const p of audit.problems)console.log(JSON.stringify(p));
  if(bytes>=900000||audit.problems.length) process.exitCode=1;
} finally {await browser.close();}
