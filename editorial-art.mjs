// Original editorial scenes. Each composition is drawn for its actual card
// proportions; the browser preserves the geometry instead of stretching it.
const ink='#263f51';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const box=(x,y,w,h,fill,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const shape=(d,fill,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
const rule=(x1,y1,x2,y2,stroke=ink,width=1.5,extra='')=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
const dot=(x,y,r,fill,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const oval=(x,y,rx,ry,fill,extra='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
const type=(x,y,words,size=15,fill=ink,extra='')=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${fill}" ${extra}>${esc(words)}</text>`;
const bold=(x,y,words,size=18,fill=ink,extra='')=>type(x,y,words,size,fill,`font-weight="700" ${extra}`);
const panel=(x,y,w,h,fill='#f9f8f0')=>box(x+3,y+4,w,h,'#263f51','opacity=".12"')+box(x,y,w,h,fill,'stroke="#8197a0" stroke-width="1"');
const floorGrain=(w,y)=>Array.from({length:18},(_,i)=>rule(12+i*47,y+i%3*4,30+i*47,y+i%3*4,'#adc2bd',.6,'opacity=".28"')).join('');
const hero=(id,content)=>scene(id,800,360,box(0,0,800,360,`url(#${id}-sky)`)+`<g transform="translate(40 -12) scale(.9)">${content}</g>`,'#173647');
const imageLabels={
  IPO:{main:'IPO $83 · $81.3BN',size:58,bg:'#15354d',fg:'#ffe2a0'},
  Gaming:{main:'GTA VI',size:60,bg:'#263c58',fg:'#fff3d5'},
  Cyclone:{main:'AKVAN · 90–100 KM/H',size:56,bg:'#183f57',fg:'#fff7e8'},
  Exports:{main:'$1 TRILLION',size:68,bg:'#194c48',fg:'#fff5da'},
  Riyadh:{main:'0 INJURIES REPORTED',size:56,bg:'#27564d',fg:'#fff5e1'},
  Kerch:{main:'RAIL HALTED',size:60,bg:'#a5263c',fg:'#fff8e7'},
  Arctic:{main:'109–0',size:68,bg:'#1f4864',fg:'#fff7e6'},
  Jobs:{main:'4.9%',size:68,bg:'#1b5a75',fg:'#fff6df'},
  Athletics:{main:'BANNED · 3 YRS',size:48,bg:'#f6efdd',fg:'#a6243b',stamp:true},
  Cricket:{main:'9 WICKETS',size:68,bg:'#184d43',fg:'#fff4d8'},
  Atacama:{main:'NASA · ATACAMA BLOOM',size:56,bg:'#244659',fg:'#fff5dd'},
};
function imageLabel(id,w,y){
  const d=imageLabels[id];if(!d)return'';
  if(d.stamp)return box(0,y,w,65,d.bg)+`<g transform="rotate(-1.8 ${w/2} ${y+32})">${box(w/2-250,y+8,500,46,d.bg,`stroke="${d.fg}" stroke-width="3"`)}${bold(w/2,y+44,d.main,d.size,d.fg,'text-anchor="middle"')}</g>`;
  return box(0,y,w,65,d.bg)+bold(w/2,y+50,d.main,d.size,d.fg,'text-anchor="middle"');
}
function scene(id,w,h,content,bg='#dfeaf0'){
  const compact=Boolean(imageLabels[id]),coreHeight=compact?(w>1000?115:140):h,totalHeight=compact?coreHeight+65:h;
  const ground={IPO:[124,'#718b91'],Gaming:[120,'#4b6374'],Cyclone:[140,'#346b83'],Exports:[112,'#37677d'],Riyadh:[129,'#819b98'],Kerch:[96,'#37677d'],Arctic:[96,'#7198ac'],Jobs:[112,'#37677d'],Athletics:[88,'#a76255'],Cricket:[82,'#7e9e74'],Atacama:[107,'#8d6c7e']}[id];
  const scale=coreHeight/h;
  const art=compact?box(0,0,w,coreHeight,content.includes(`url(#${id}-sky)`)?`url(#${id}-sky)`:bg)+box(0,ground[0]*scale,w,coreHeight-ground[0]*scale,ground[1])+`<g transform="translate(${(w-w*scale)/2} 0) scale(${scale})">${content}</g>`:content;
  return `<svg role="img" aria-label="${esc(id)}" viewBox="0 0 ${w} ${totalHeight}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}-sky" x2=".2" y2="1"><stop stop-color="#9dbdcb"/><stop offset=".76" stop-color="#e7dcc1"/><stop offset="1" stop-color="#edcb94"/></linearGradient><linearGradient id="${id}-glass" x2="1" y2=".4"><stop stop-color="#35566e"/><stop offset=".42" stop-color="#a9cbd5"/><stop offset=".55" stop-color="#527b91"/><stop offset="1" stop-color="#1b3c57"/></linearGradient><linearGradient id="${id}-water" x2="0" y2="1"><stop stop-color="#7eafba"/><stop offset="1" stop-color="#37677d"/></linearGradient><linearGradient id="${id}-paper" x2=".6" y2="1"><stop stop-color="#fffef5"/><stop offset="1" stop-color="#e5dfce"/></linearGradient></defs>${box(0,0,w,totalHeight,bg)}${art}${imageLabel(id,w,coreHeight)}</svg>`;
}
function flag(x,y,country,scale=1){
  let cloth='';
  if(country==='US'){
    cloth=box(0,0,54,30,'#fff6e8');
    for(let i=0;i<7;i++)cloth+=box(0,i*4.3,54,2.15,'#a72e40');
    cloth+=box(0,0,23,16,'#244266');
    for(let i=0;i<12;i++)cloth+=dot(4+i%4*5,4+Math.floor(i/4)*4,1,'#fff5df');
  }else if(country==='CN'){
    cloth=box(0,0,54,30,'#b42739')+shape('M9 4L11 10L17 10L12 14L14 20L9 16L4 20L6 14L1 10H7Z','#f6d47c');
  }else if(country==='RU')cloth=box(0,0,54,30,'#fff8eb')+box(0,10,54,10,'#386290')+box(0,20,54,10,'#b43b45');
  else if(country==='DK')cloth=box(0,0,54,30,'#b52a40')+box(17,0,5,30,'#fff8e7')+box(0,12,54,5,'#fff8e7');
  else if(country==='GL')cloth=box(0,0,54,30,'#fff6e8')+box(0,15,54,15,'#c3424b')+shape('M16 15A9 9 0 0 1 34 15Z','#c3424b')+shape('M16 15A9 9 0 0 0 34 15Z','#fff6e8');
  else if(country==='KR')cloth=box(0,0,54,30,'#fff9ef')+dot(27,15,9,'#b52e42')+shape('M18 15A9 9 0 0 0 36 15Q32 21 27 15Q22 9 18 15Z','#2c5e83')+rule(8,7,14,3,ink,2)+rule(39,26,46,22,ink,2);
  return `<g transform="translate(${x} ${y}) scale(${scale})">${box(0,0,54,30,'#fff')}${cloth}${rule(0,0,0,50,'#6f8490',1.5)}</g>`;
}
function skyline(id,buildings,base=110){
  let result='';
  for(const [x,w,h] of buildings){
    result+=box(x,base-h,w,h,'#6d8f9f','opacity=".48"')+shape(`M${x+w} ${base-h}L${x+w+5} ${base-h+5}V${base}H${x+w}Z`,'#456a80','opacity=".35"');
    for(let y=base-h+7;y<base-3;y+=9)result+=rule(x+4,y,x+w-4,y,'#d4e3e4',1.25);
  }
  return result;
}
function president(x,name,hair,tie,kind){
  const top=kind==='trump'?'M-16 5Q-17-13 1-11Q21-14 23 2L12 4L2-2L-10 4L-15 13Z':kind==='xi'?'M-17 9Q-21-13 0-12Q23-13 20 10L14 0Q0-5-12 0L-15 12Z':'M-17 11Q-21-5-9-9L-6-3L-12 2L-13 13ZM12 12L13-2L7-8Q21-5 19 10Z';
  return `<g transform="translate(${x} 133) scale(1.75)">${oval(1,63,45,6,'#163447','opacity=".15"')}${shape('M-37 69L-31 39Q-27 30-11 29H10Q27 31 32 41L38 69Z','#243a51')}${shape('M-12 30L0 52L12 30Z','#fff9ee')}${shape('M-3 36H3L7 62L0 68L-7 62Z',tie)}${shape('M-15 5Q-17 18-12 27Q-7 34 1 34Q11 32 16 22L18 6Z','#d9ac8c','stroke="#b68a73" stroke-width="1"')}${shape('M2 7Q10 13 12 23L6 30Q14 28 17 20L18 6Z','#bd8a70','opacity=".35"')}${shape(top,hair)}${rule(-10,12,-4,12,'#594e4b',1.4)}${rule(6,12,12,12,'#594e4b',1.4)}${shape('M2 14L4 23H0','none','stroke="#a67967" stroke-width="1"')}${rule(-4,27,6,27,'#8d5b55',1.2)}${rule(-26,44,-17,60,'#516779',1.5)}${rule(26,44,18,60,'#102e44',1.5)}${box(-62,66,124,38,'#fffdf1','stroke="#293f50" stroke-width="1.4"')}${bold(0,95,name,34,'#183447','text-anchor="middle"')}</g>`;
}
function summit(){
  const city=skyline('summit',[[20,41,105],[78,34,137],[127,42,97],[186,33,162],[235,42,114],[532,35,134],[584,31,164],[632,43,118],[694,34,141],[747,32,105]],228);
  const windows=[19,268,530,779].map(x=>box(x,22,5,242,'#c5d5d4')+rule(x+5,22,x+5,264,'#668996',1.5)).join('');
  return hero('Summit',city+shape('M0 238Q150 195 311 228Q503 189 800 231V430H0Z','#79998d')+
    box(0,0,800,23,'#24414d')+rule(0,23,800,23,'#e7cd9b',2)+windows+
    flag(127,48,'US',1.5)+flag(360,48,'CN',1.5)+flag(593,48,'RU',1.5)+
    shape('M28 280Q400 197 772 280L723 405H76Z','#294956')+shape('M28 280Q400 216 772 280L744 310H56Z','#657f7f')+
    rule(77,354,724,354,'#b7c8bb',1.5)+floorGrain(800,378)+
    president(167,'TRUMP','#d9bd6e','#ad263b','trump')+president(400,'XI','#243238','#9e2538','xi')+president(633,'PUTIN','#b7a58d','#516c86','putin')+
    [283,516,750].map(x=>rule(x,272,x,226,'#203d4c',2)+dot(x,223,4,'#203d4c')).join('')+
    [256,485,706].map(x=>box(x,339,34,13,'#eee9d7')+rule(x+4,345,x+27,345,'#a8b9ae',1)).join(''));
}
function court(){
  let palace=shape('M204 130V75L232 63H290L306 43H448L466 63H554L578 81V130Z','#c2aa8e','stroke="#778b91" stroke-width="1.4"')+
    shape('M197 78L233 50L297 66L306 42H448L462 64L554 63L584 81Z','#476879')+
    box(350,36,49,94,'#d5c2a5')+shape('M341 39L373 18L407 39Z','#3c5c70')+box(361,60,24,41,'#e3d6b9')+
    dot(373,49,9,'#f5ead4','stroke="#879b9d" stroke-width="1.2"')+rule(373,49,373,43,'#3d5767',1.4)+rule(373,49,378,52,'#3d5767',1.4);
  for(let x=215;x<572;x+=18)palace+=shape(`M${x} 127V103Q${x+5} 93 ${x+10} 103V127Z`,'#557482');
  for(let x=223;x<563;x+=28)palace+=box(x,80,8,12,'#6e8b97');
  const scales=rule(690,46,690,121,'#a47c37',5)+rule(650,64,732,64,'#b58b45',4)+dot(690,43,6,'#cca961')+
    rule(652,66,640,101,'#9a793f',1.6)+rule(652,66,665,101,'#9a793f',1.6)+rule(729,66,716,101,'#9a793f',1.6)+rule(729,66,742,101,'#9a793f',1.6)+
    shape('M632 101Q652 127 673 101Z','#c9a458','stroke="#9b7836" stroke-width="1.4"')+shape('M708 101Q728 127 750 101Z','#c9a458','stroke="#9b7836" stroke-width="1.4"')+
    shape('M664 133L680 120H700L716 133Z','#a5803f');
  return hero('Court',dot(677,62,43,'#f1d29b')+shape('M0 246Q266 197 800 241V430H0Z','#78988a')+
    `<g transform="translate(-10 34) scale(1.3)">${palace}</g>`+
    shape('M313 225H669L795 430H176Z','#d8d0ba')+[257,282,313,352].map((y,i)=>rule(291-i*15,y,696+i*21,y,'#a5af9d',1.5)).join('')+
    `<g transform="translate(-520 110) scale(1.7)">${scales}</g>`+
    panel(24,82,270,250,'#17354b')+bold(159,235,'9–6',136,'#fff8e9','text-anchor="middle"')+
    bold(159,300,'ICJ RULING',34,'#f0d293','text-anchor="middle"')+
    bold(425,397,'THE HAGUE · ROHINGYA RULING',24,'#203b49','text-anchor="middle"'));
}
function climate(){
  let industry='';for(const [x,h] of [[23,112],[68,146],[115,97]])industry+=box(x,264-h,20,h,'#718c95')+box(x-3,257-h,26,7,'#526f7c');
  industry+=shape('M32 141Q4 110 26 94Q50 81 70 105Q101 99 145 131','none','stroke="#a2b9c0" stroke-width="20" opacity=".5"');
  let turbines='';for(const [x,y] of [[652,154],[721,130],[776,192]])turbines+=rule(x,y,x,294,'#507b7b',3)+rule(x,y,x-30,y-12,'#507b7b',3)+rule(x,y,x+23,y-20,'#507b7b',3)+rule(x,y,x+4,y+33,'#507b7b',3);
  return hero('Climate',dot(666,70,41,'#ebcb8c')+industry+shape('M0 280Q148 229 302 273Q552 211 800 259V430H0Z','#8ca98e')+
    shape('M0 347Q244 284 426 332Q609 278 800 319V430H0Z','#5e8673')+turbines+
    shape('M151 348L173 71L668 103L632 382Z','#203f4b','opacity=".18"')+
    shape('M136 335L159 59L655 91L619 369Z','url(#Climate-paper)','stroke="#abae9c" stroke-width="1.8"')+
    bold(195,127,'COP31 · DRAFT',36,'#274c50')+rule(186,146,600,168,'#b3bfaf',3)+
    bold(176,218,'FOSSIL FUELS',50,'#263f51')+rule(166,198,584,220,'#b12c3d',6)+
    rule(173,259,408,272,'#bdc5b5',3)+rule(166,287,366,299,'#bdc5b5',3)+rule(159,314,326,325,'#bdc5b5',3)+
    `<g transform="rotate(-10 535 306)">${box(443,262,184,88,'#a8263e','stroke="#f8e9ca" stroke-width="2"')}${bold(535,330,'CUT',66,'#fff7e7','text-anchor="middle"')}</g>`);
}
function ipo(){
  let windows='';for(let x=13;x<278;x+=19)for(let y=16;y<118;y+=14)windows+=box(x,y,10,7,(x+y)%3?'#6b91a8':'#c4d3ce','opacity=".8"');
  return scene('IPO',800,140,box(0,0,800,140,'#b9cfda')+box(0,0,284,140,'#3e5e77')+windows+
    shape('M275 0Q400-15 500 7V140H275Z','url(#IPO-glass)')+shape('M304 1Q376-8 439 0V140H304Z','#b4d0d9','opacity=".15"')+
    box(300,26,171,76,'#142f49')+bold(385,56,'NASDAQ',24,'#eef4ed','text-anchor="middle"')+bold(385,87,'ANT',28,'#f8d692','text-anchor="middle"')+
    panel(528,24,244,93,'#f8f8ed')+type(546,45,'OFFER',12,'#546c77')+type(666,45,'DEBUT',12,'#546c77')+
    bold(546,82,'$83',27,'#3c5969')+bold(660,82,'$111.50',23,'#185d4c')+rule(617,66,647,66,'#9f793b',2.5)+shape('M641 61L649 66L641 71Z','#9f793b')+
    rule(544,91,754,91,'#ccd3cb',1)+bold(546,108,'$81.3bn GROSS IPO',14,'#2b4d5b')+
    shape('M0 124H800V140H0Z','#718b91')+[39,89,165,224,515,783].map(x=>dot(x,117,4,'#3a5362')+shape(`M${x-5} 140V127Q${x} 121 ${x+5} 127V140Z`,'#3a5362')).join(''));
}
function gaming(){
  let buildings='';for(const [x,w,h] of [[30,55,54],[93,48,88],[156,70,69],[234,47,100],[298,69,75],[385,65,91],[467,75,51],[556,63,72],[636,58,93],[708,60,59]]){
    buildings+=box(x,120-h,w,h,'#506e8a')+shape(`M${x+w-9} ${120-h}H${x+w}V120H${x+w-9}Z`,'#354964');
    for(let y=128-h;y<113;y+=12)for(let wx=x+8;wx<x+w-9;wx+=14)buildings+=box(wx,y,6,5,'#efd1a0');
  }
  const palm=(x,h)=>shape(`M${x} 140Q${x-7} 87 ${x+3} ${h}Q${x-19} ${h-21} ${x-47} ${h-8}Q${x-23} ${h-37} ${x+5} ${h-14}Q${x+18} ${h-45} ${x+50} ${h-21}Q${x+25} ${h-24} ${x+9} ${h-9}Q${x+42} ${h-17} ${x+59} ${h+9}Q${x+28} ${h-3} ${x+8} ${h}Q${x+2} 93 ${x+8} 140Z`,'#284f60');
  return scene('Gaming',800,140,box(0,0,800,140,'#dfb0ab')+dot(401,61,51,'#f6d6a0')+buildings+
    box(0,120,800,20,'#4b6374')+rule(0,133,800,133,'#bda486',1.5)+palm(99,42)+palm(681,38)+
    shape('M288 130L308 113L374 111L400 127H426L437 136H276Z','#244552')+shape('M315 115H372L386 125H302Z','#accdd1')+
    dot(308,136,7,'#24384b')+dot(409,136,7,'#24384b')+rule(304,128,408,128,'#dfc290',1.4)+
    bold(402,32,'VICE CITY',28,'#fff4da','text-anchor="middle" stroke="#795975" stroke-width="1" paint-order="stroke"'));
}
function cyclone(){
  let spirals='';for(const angle of [0,72,144,216,288])spirals+=`<g transform="translate(468 72) rotate(${angle})">${shape('M-6-6C12-47 59-43 70-12C40-29 18-17 10 4C2 26-20 36-36 26C-10 28 2 12-6-6Z','#e8f2f2','opacity=".92"')}</g>`;
  let waves='';for(let i=0;i<14;i++)waves+=rule(311+i*37%470,107+i*9%24,323+i*37%470,107+i*9%24,'#a2c6d0',1);
  return scene('Cyclone',800,140,box(0,0,800,140,'#346b83')+waves+
    shape('M0 0H341L328 12L315 21L318 35L296 47L281 65L276 82L259 96L250 121L233 140H0Z','#b7c5ae','stroke="#e2e4c8" stroke-width="1.3"')+
    shape('M0 103Q132 74 263 102L233 140H0Z','#8eaa9d')+rule(297,46,270,91,'#5e867f',1)+
    dot(287,61,4,'#a82b3f','stroke="#fff" stroke-width="1"')+bold(169,57,'GOPALPUR',14,'#274a55')+bold(34,31,'INDIA · ODISHA',18,'#274a55')+
    shape('M442 75Q357 70 298 61','none','stroke="#efc271" stroke-width="2.2" stroke-dasharray="6 4"')+shape('M306 54L294 60L306 66Z','#efc271')+spirals+dot(468,72,7,'#2d627b')+
    panel(603,20,174,93,'#eaf1ee')+bold(690,48,'IMD · 19 NOV',22,'#264d63','text-anchor="middle"')+type(690,74,'20 NOV LANDFALL',17,'#264d63','text-anchor="middle" font-weight="700"')+
    type(690,98,'FORECAST',20,'#7e452c','text-anchor="middle" font-weight="700"')+
    shape('M60 117H133L122 128H70Z','#536e70')+rule(92,115,92,91,'#365766',1.5)+rule(48,130,154,130,'#bfd0c7',1.5));
}
function exportsScene(){
  let cranes='';for(const [x,h] of [[79,43],[275,24],[474,38]])cranes+=shape(`M${x} 111V${h}H${x+128}L${x+139} ${h+10}H${x+8}V111Z`,'#56798d')+rule(x+92,h+10,x+92,86,'#385c72',2)+box(x+83,85,19,5,'#775e4d');
  let containers='';const colors=['#aa4250','#d2ad69','#7a9b9c','#405d7e'];for(let row=0;row<3;row++)for(let i=0;i<9-row;i++){
    const x=187+i*43+row*21,y=109-row*16;containers+=box(x,y-15,41,15,colors[(i+row)%4],'stroke="#314c60" stroke-width=".8"');
    for(let k=6;k<40;k+=8)containers+=rule(x+k,y-13,x+k,y-2,'#233e52',.6);
  }
  return scene('Exports',800,140,box(0,0,800,140,'url(#Exports-sky)')+skyline('port',[[22,28,40],[60,45,32],[591,44,39],[647,27,49],[687,53,34]],111)+cranes+
    box(0,112,800,28,'url(#Exports-water)')+shape('M133 113H684L649 136H184Z','#1c3f55')+shape('M158 130H658L649 136H184Z','#ab3c46')+
    containers+box(594,83,35,30,'#e7eeea')+box(598,88,26,7,'#607e8e')+flag(683,20,'KR',.9)+
    bold(27,25,'BUSAN · EXPORT ECONOMY',14,'#284e60')+rule(121,139,701,139,'#afced1',1));
}
function tower(){
  let city=skyline('riyadh',[[15,49,42],[79,33,71],[126,56,51],[570,43,66],[626,45,39],[688,31,82],[734,48,49]],123);
  let glass='';for(let y=21;y<124;y+=9)glass+=rule(357,y,439,y+5,'#bfd8dc',1);for(let x=364;x<440;x+=12)glass+=rule(x,19,x+9,126,'#4b748a',1);
  return scene('Riyadh',800,140,box(0,0,800,140,'url(#Riyadh-sky)')+dot(111,31,23,'#efd5a2')+city+
    shape('M342 131L358 21L391 7L437 20L458 131Z','url(#Riyadh-glass)','stroke="#446479" stroke-width="1.5"')+glass+
    shape('M385 64L399 59L410 69L424 64L435 80L416 89L393 83Z','#263d50')+
    shape('M420 71Q436 48 460 49Q471 29 489 44Q512 36 515 56Q492 69 465 65L436 82Z','#93a6ac','opacity=".63"')+
    [[442,93],[460,104],[447,121],[477,117]].map(([x,y])=>shape(`M${x} ${y}l5-2l3 5l-4 3Z`,'#8c9da3')).join('')+
    shape('M56 67Q166 8 261 20','none','stroke="#e1b57c" stroke-width="2" stroke-dasharray="6 4"')+dot(260,20,5,'#e9bc76')+
    box(0,129,800,11,'#819b98')+bold(28,27,'RIYADH',17,'#344f5c')+type(532,119,'DEBRIS DAMAGE REPORTED',14,'#344f5c','font-weight="700"'));
}
function bridge(){
  let supports='';for(let x=89;x<723;x+=72)supports+=shape(`M${x} 91L${x-10} 126H${x+15}L${x+6} 91Z`,'#71919b')+rule(x-3,96,x+8,96,'#d3e3e1',1);
  let sea='';for(let i=0;i<29;i++){let x=(i*67)%800,y=111+i*13%28;sea+=rule(x,y,x+21,y,'#b0cdd0',1);}
  return scene('Kerch',800,140,box(0,0,800,140,'url(#Kerch-sky)')+shape('M0 46L76 36L136 61L168 90L111 109H0ZM800 39L737 35L691 65L668 88L745 112H800Z','#bac4ad')+
    box(0,96,800,44,'url(#Kerch-water)')+sea+supports+shape('M54 91L749 80L752 89L54 101Z','#405e75')+
    shape('M259 89Q393-39 529 84','none','stroke="#e7eeeb" stroke-width="8"')+
    [281,320,359,398,437,476,510].map((x,i)=>rule(x,83-Math.sin((i+1)/8*Math.PI)*61,x,87,'#e7eeeb',2)).join('')+
    box(536,64,129,14,'#a63848')+[544,568,592,616,640].map(x=>box(x,67,17,6,'#e8e7dc')).join('')+
    rule(708,82,708,40,'#344f63',3)+dot(708,38,8,'#b72e42','stroke="#f7dfb9" stroke-width="2"')+
    bold(28,26,'KERCH STRAIT',16,'#344f63')+type(560,28,'RAIL TRAFFIC HALTED',14,'#344f63','font-weight="700"'));
}
function arctic(){
  let sea='';for(let i=0;i<13;i++){const x=i*67%780,y=108+i*11%29;sea+=shape(`M${x} ${y}l25-5l18 4l-19 7Z`,'#d5e4e3');}
  return scene('Arctic',800,140,box(0,0,800,140,'url(#Arctic-sky)')+box(0,96,800,44,'#7198ac')+sea+
    shape('M0 100L58 41L103 80L144 22L209 87L249 66L298 103Z','#eaf0e9')+shape('M58 41L103 80L144 22L155 82L209 87L249 66L298 103H0Z','#c1d4d5')+
    shape('M302 31L336 9L382 21L404 52L384 72L368 106L344 118L334 91L312 66Z','#f1f4ec','stroke="#8ea8b2" stroke-width="1.5"')+
    rule(342,32,364,91,'#cadbdc',1)+rule(328,53,379,60,'#cadbdc',1)+
    panel(470,12,289,113,'#f8f5e8')+bold(493,39,'ARCTIC SECURITY PACT',16,'#284b5e')+
    bold(494,78,'RATIFIED',29,'#214c69')+flag(645,53,'DK',.58)+flag(688,53,'GL',.58)+flag(731,53,'US',.4)+
    rule(492,90,738,90,'#bac5bd',1)+type(493,111,'DANISH PARLIAMENT · 19 NOV',14,'#3d5b68','font-weight="700"'));
}
function jobs(){
  const city=skyline('sydney',[[16,24,44],[55,37,58],[105,30,77],[145,31,48],[191,40,65]],116);
  const sails=shape('M162 116Q186 69 249 110L218 114Q218 58 272 79Q250 85 248 115L285 116Q292 84 337 94L307 116Z','#f4f1df','stroke="#a7b6b4" stroke-width="1.2"');
  return scene('Jobs',800,140,box(0,0,800,140,'url(#Jobs-sky)')+city+box(0,112,800,28,'url(#Jobs-water)')+sails+
    shape('M20 106Q118 19 212 104','none','stroke="#667f88" stroke-width="3"')+[43,76,109,142,175].map((x,i)=>rule(x,70-Math.sin(i/4*Math.PI)*11,x,108,'#667f88',1.2)).join('')+
    panel(402,15,368,109,'#f8f7ee')+bold(423,42,'AUSTRALIA · OCTOBER LABOUR DATA',15,'#2a5366')+
    bold(424,91,'ABS',42,'#1e6781')+type(599,76,'753.7k',32,'#264d61','font-weight="700"')+type(599,99,'UNEMPLOYED',13,'#4a6370','font-weight="700"')+
    rule(423,102,750,102,'#c2cdc6',1)+type(423,118,'ABS RELEASE · 19 NOVEMBER',13,'#4a6370'));
}
function athletics(){
  let track='';for(let y=91;y<142;y+=10)track+=shape(`M0 ${y}Q557 ${y-35} 1120 ${y}`,'none','stroke="#e3c3a2" stroke-width="1.2"');
  const runner=`<g transform="translate(455 6)">${oval(16,123,77,6,'#654b4b','opacity=".17"')}${dot(11,20,10,'#654432')}${shape('M2 13Q8 0 19 8L22 19L13 12Z','#263d3c')}${shape('M2 33L21 30L36 62L11 77L-9 52Z','#b52c43')}${shape('M-2 38L20 35L27 48L3 54Z','#244c3d')}${rule(-3,57,27,50,'#f3e8ce',3)}${shape('M-2 38L-18 57L-41 48L-44 55L-17 66L8 47Z','#71503b')}${shape('M22 34L42 31L58 11L64 16L47 42L28 45Z','#71503b')}${shape('M15 74L33 67L54 91L83 100L81 108L49 101L23 83Z','#27473e')}${shape('M10 70L24 79L5 102L-23 117L-28 111L-5 93Z','#27473e')}${shape('M-26 110L-19 116L-26 126L-44 127L-44 123Z','#f7f0df')}${shape('M79 99L87 101L90 112L107 116L105 122L83 118L76 109Z','#f7f0df')}</g>`;
  return scene('Athletics',1120,140,box(0,0,1120,140,'url(#Athletics-sky)')+
    shape('M0 75Q204 34 377 66Q721 38 1120 72V140H0Z','#8da68e')+box(0,88,1120,52,'#a76255')+track+
    shape('M43 64H223L216 88H50Z','#334f47')+rule(43,62,222,62,'#e8dec2',4)+bold(132,82,'KENYA',20,'#f3eacb','text-anchor="middle"')+
    runner+panel(732,20,337,92,'#faf7ed')+bold(752,46,'ATHLETICS INTEGRITY UNIT',17,'#37524f')+
    bold(752,81,'EPO VIOLATION',30,'#a62b3e')+type(753,103,'PERES JEPCHIRCHIR',17,'#4e605e'));
}
function cricket(){
  let stadium='';for(let i=0;i<8;i++)stadium+=shape(`M${20+i*7} ${54+i*4}Q560 ${i*4-15} ${1100-i*7} ${54+i*4}`,'none','stroke="'+(i%2?'#839d98':'#bec9b7')+'" stroke-width="3"');
  const bowler=`<g transform="translate(451 7)">${dot(9,20,9,'#bc9674')}${shape('M1 14Q8 5 18 12L21 17Z','#2b6455')}${shape('M-1 32L21 30L34 67L8 78L-10 53Z','#f2f0dc')}${shape('M0 34L-15 18L-9-1L-2 1L-5 15L12 34Z','#c19b7a')}${shape('M21 34L37 47L57 30L62 35L39 58L27 53Z','#c19b7a')}${shape('M9 75L28 69L48 98L72 111L69 118L39 106L18 86Z','#e4e8d8')}${shape('M8 74L20 83L3 104L-22 122L-28 118L-7 95Z','#eff0db')}${rule(-31,123,-17,125,'#315f4d',4)}${rule(67,119,80,123,'#315f4d',4)}</g>`;
  return scene('Cricket',1120,140,box(0,0,1120,140,'url(#Cricket-sky)')+stadium+
    shape('M0 82Q560 33 1120 82V140H0Z','#7e9e74')+shape('M359 140L404 78H567L625 140Z','#d8c69b')+
    [532,540,548].map(x=>rule(x,96,x,123,'#f8f5e4',3)).join('')+rule(530,95,551,95,'#f8f5e4',2)+bowler+dot(568,27,4,'#ae3040')+
    shape('M569 28Q628 47 547 104','none','stroke="#dce9ce" stroke-width="1.4" stroke-dasharray="5 5"')+
    panel(745,23,328,94,'#153f3a')+bold(768,44,'SOUTH AFRICA',19,'#f6edce')+
    bold(768,79,'FIRST TEST',31,'#fff8e7')+type(769,110,'HARMER 6–51',20,'#d1dfcb')+
    bold(29,35,'JOHANNESBURG',16,'#31584b'));
}
function desert(){
  let flowers='';
  for(let i=0;i<180;i++){
    const x=(i*137+17)%1120,y=81+(i*31)%59,r=.7+(y-81)/45;
    flowers+=dot(x,y,r,['#a94873','#c67c96','#e3b8b8','#eee3cd'][i%4]);
  }
  for(const [x,y] of [[44,121],[129,131],[259,118],[388,130],[675,124],[1041,130]]){
    for(let a=0;a<5;a++)flowers+=oval(x+Math.cos(a*Math.PI*.4)*5,y+Math.sin(a*Math.PI*.4)*4,4,2.5,'#c66a93');
    flowers+=dot(x,y,2,'#efd89b');
  }
  const satellite=`<g transform="translate(886 20) rotate(12)">${box(-44,-5,36,27,'#386b84','stroke="#c2d6d7" stroke-width="1"')}${box(18,-5,36,27,'#386b84','stroke="#c2d6d7" stroke-width="1"')}${[-35,-26,-17,27,36,45].map(x=>rule(x,-4,x,21,'#a6c4cf',.8)).join('')}${rule(-43,8,-9,8,'#a6c4cf',.8)}${rule(19,8,54,8,'#a6c4cf',.8)}${shape('M-8-9L18-6L20 23L-6 26Z','#b3c5c9','stroke="#6c8998" stroke-width="1"')}${dot(5,8,8,'#476879')}${dot(5,8,4,'#233d53')}${rule(4,25,-28,58,'#e5e1ba',1.4,'stroke-dasharray="4 4"')}</g>`;
  return scene('Atacama',1120,140,box(0,0,1120,140,'url(#Atacama-sky)')+dot(1021,27,20,'#e5c692')+
    shape('M0 85L52 47L116 72L184 33L278 82L348 43L411 76L479 35L561 74L642 45L721 82L786 49L867 77L936 41L1012 80L1082 52L1120 69V140H0Z','#b79d86')+
    shape('M0 107Q140 67 284 96Q442 58 604 99Q800 63 1120 92V140H0Z','#a98183')+
    shape('M0 134Q198 83 345 115Q548 80 725 111Q920 81 1120 114V140H0Z','#8d6c7e')+flowers+satellite+
    panel(23,14,307,36,'#f4f0e1')+bold(39,38,'ATACAMA · LANDSAT 8 + 9',17,'#365364')+
    bold(560,29,'SEPTEMBER → OCTOBER IMAGERY',15,'#3b5561','text-anchor="middle"'));
}

export const featureScenes={summit,court,climate,ipo,gaming,cyclone,chips:exportsScene,tower,bridge,arctic,jobs,athletics,cricket,desert};
export const sceneBackgrounds={summit:'#dfeaf0',court:'#dfeaf0',climate:'#dfeaf0',ipo:'#b9cfda',gaming:'#dfb0ab',cyclone:'#346b83',chips:'#dfeaf0',tower:'#dfeaf0',bridge:'#dfeaf0',arctic:'#dfeaf0',jobs:'#dfeaf0',athletics:'#dfeaf0',cricket:'#dfeaf0',desert:'#dfeaf0'};
