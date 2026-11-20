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
const hero=(id,content)=>scene(id,800,205,box(0,0,800,205,`url(#${id}-sky)`)+content,'#173647');
function scene(id,w,h,content,bg='#dfeaf0'){
  const finish=`<linearGradient id="${id}-finish" x2=".18" y2="1"><stop stop-color="#fff0cd" stop-opacity=".12"/><stop offset=".5" stop-color="#cde4df" stop-opacity="0"/><stop offset="1" stop-color="#142d42" stop-opacity=".19"/></linearGradient>`;
  return `<svg role="img" aria-label="${esc(id)}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><defs>${finish}<linearGradient id="${id}-sky" x2=".2" y2="1"><stop stop-color="#9dbdcb"/><stop offset=".76" stop-color="#e7dcc1"/><stop offset="1" stop-color="#edcb94"/></linearGradient><linearGradient id="${id}-glass" x2="1" y2=".4"><stop stop-color="#35566e"/><stop offset=".42" stop-color="#a9cbd5"/><stop offset=".55" stop-color="#527b91"/><stop offset="1" stop-color="#1b3c57"/></linearGradient><linearGradient id="${id}-water" x2="0" y2="1"><stop stop-color="#7eafba"/><stop offset="1" stop-color="#37677d"/></linearGradient><linearGradient id="${id}-paper" x2=".6" y2="1"><stop stop-color="#fffef5"/><stop offset="1" stop-color="#e5dfce"/></linearGradient></defs>${box(0,0,w,h,bg)}${content}${box(0,0,w,h,`url(#${id}-finish)`)}</svg>`;
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
  return `<g transform="translate(${x} 66)">${oval(1,63,45,6,'#163447','opacity=".15"')}${shape('M-37 69L-31 39Q-27 30-11 29H10Q27 31 32 41L38 69Z','#243a51')}${shape('M-12 30L0 52L12 30Z','#fff9ee')}${shape('M-3 36H3L7 62L0 68L-7 62Z',tie)}${shape('M-15 5Q-17 18-12 27Q-7 34 1 34Q11 32 16 22L18 6Z','#d9ac8c','stroke="#b68a73" stroke-width="1"')}${shape('M2 7Q10 13 12 23L6 30Q14 28 17 20L18 6Z','#bd8a70','opacity=".35"')}${shape(top,hair)}${rule(-10,12,-4,12,'#594e4b',1.4)}${rule(6,12,12,12,'#594e4b',1.4)}${shape('M2 14L4 23H0','none','stroke="#a67967" stroke-width="1"')}${rule(-4,27,6,27,'#8d5b55',1.2)}${rule(-26,44,-17,60,'#516779',1.5)}${rule(26,44,18,60,'#102e44',1.5)}${box(-43,68,86,19,'#163347','stroke="#b7c9cb" stroke-width="1"')}${bold(0,82,name,14,'#fff4da','text-anchor="middle"')}</g>`;
}
function summit(){
  const city=skyline('summit',[[23,33,53],[70,27,73],[111,41,45],[166,31,88],[213,37,58],[558,35,65],[604,26,84],[644,42,52],[700,28,70],[742,35,44]],113);
  let windows='';for(const x of [8,267,532,791])windows+=box(x,0,5,116,'#dce5e2')+rule(x+5,0,x+5,116,'#9db3ba',1);
  const architecture=box(0,0,800,17,'#243e4c')+rule(0,17,800,17,'#e5c992',2)+
    shape('M0 18H35L66 155H0ZM800 18H765L734 155H800Z','#456573')+
    [74,281,519,726].map(x=>rule(x,17,x,153,'#7798a0',2)).join('');
  return hero('Summit',architecture+`<g transform="translate(0 24)">`+city+shape('M0 116Q127 95 236 114Q385 98 509 113Q661 96 800 113V180H0Z','#73968c')+windows+
    flag(148,18,'US',1.15)+flag(370,18,'CN',1.15)+flag(590,18,'RU',1.15)+
    shape('M38 147Q399 99 762 147L711 180H89Z','#2c4c59')+shape('M38 147Q399 112 762 147L725 160H75Z','#607e82')+rule(89,165,712,165,'#c0cec1',1)+floorGrain(800,172)+
    president(177,'TRUMP','#d9bd6e','#ad263b','trump')+president(400,'XI','#243238','#9e2538','xi')+president(623,'PUTIN','#b7a58d','#516c86','putin')+
    [250,468,690].map(x=>box(x,139,27,9,'#f4ecda')+rule(x,144,x+20,144,'#a5b9b9',1)+rule(x+10,138,x+13,121,'#263f51',1.4)+dot(x+13,120,2,'#233b4b')).join('')+
    oval(400,152,27,5,'#1b3648','opacity=".25"')+shape('M376 149Q400 131 424 149Z','#567b68')+[386,396,405,415].map((x,i)=>dot(x,143-i%2*4,4,['#d9b87f','#a33849'][i%2])).join('')+'</g>');
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
  return hero('Court',dot(564,45,32,'#f4d6a0')+shape('M0 148Q210 113 800 146V205H0Z','#75978c')+
    '<g transform="translate(0 29)">'+palace+
    panel(28,24,151,109,'#17354b')+bold(103,84,'9–6',55,'#fff8e9','text-anchor="middle"')+type(103,110,'ICJ VERDICT',15,'#f0d293','text-anchor="middle" font-weight="700"')+
    scales+shape('M206 133H571L666 176H123Z','#d9d3bd')+[140,147,156,167].map((y,i)=>rule(184-i*13,y,595+i*18,y,'#a1ad9f',1)).join('')+
    bold(385,160,'THE HAGUE · ROHINGYA RULING',15,'#203b49','text-anchor="middle"')+'</g>');
}
function climate(){
  let industry='';for(const [x,h] of [[23,55],[64,70],[104,44]])industry+=box(x,99-h,17,h,'#7b949d')+box(x-3,94-h,23,5,'#5d7986');
  industry+=shape('M26 34Q3 18 19 9Q37-3 59 10Q79 12 91 22Q110 17 134 35','none','stroke="#a2b9c0" stroke-width="12" opacity=".5"');
  let turbines='';for(const [x,y] of [[602,49],[680,34],[744,62]])turbines+=rule(x,y,x,107,'#567f80',2.5)+rule(x,y,x-24,y-9,'#567f80',2.5)+rule(x,y,x+19,y-15,'#567f80',2.5)+rule(x,y,x+3,y+25,'#567f80',2.5);
  return hero('Climate',dot(699,34,26,'#ebcb8c')+'<g transform="translate(0 23)">'+industry+
    shape('M0 111Q136 86 266 111Q509 73 800 99V182H0Z','#9bb49c')+shape('M0 133Q185 98 367 130Q578 100 800 123V182H0Z','#648a77')+turbines+floorGrain(800,163)+
    '<g transform="translate(-30 -6) scale(1.12)">'+
    shape('M211 152L238 22L527 34L509 157Z','#1a3849','opacity=".15"')+
    shape('M205 146L232 15L518 29L500 153Z','url(#Climate-paper)','stroke="#b8b6a5" stroke-width="1.2"')+
    bold(263,48,'COP31 · DRAFT',21,'#274c50')+rule(258,59,470,69,'#b3bfaf',2)+
    bold(251,91,'FOSSIL FUELS',26,'#394f54')+rule(247,79,477,101,'#b12c3d',3.5)+
    rule(248,108,399,115,'#bdc5b5',2)+rule(245,120,361,125,'#bdc5b5',2)+
    `<g transform="rotate(-10 469 127)">${box(422,107,95,37,'#a8263e','stroke="#f8e9ca" stroke-width="1.5"')}${bold(469,135,'CUT',27,'#fff7e7','text-anchor="middle"')}</g></g></g>`);
}
function ipo(){
  let windows='';for(let x=13;x<278;x+=19)for(let y=16;y<118;y+=14)windows+=box(x,y,10,7,(x+y)%3?'#6b91a8':'#c4d3ce','opacity=".8"');
  return scene('IPO',800,140,box(0,0,800,140,'#b9cfda')+box(0,0,284,140,'#3e5e77')+windows+
    shape('M275 0Q400-15 500 7V140H275Z','url(#IPO-glass)')+shape('M304 1Q376-8 439 0V140H304Z','#b4d0d9','opacity=".15"')+
    box(300,26,171,76,'#142f49')+bold(385,56,'NASDAQ',24,'#eef4ed','text-anchor="middle"')+bold(385,87,'ANT',28,'#f8d692','text-anchor="middle"')+
    panel(528,24,244,93,'#f8f8ed')+type(546,45,'OFFER',12,'#546c77')+type(666,45,'DEBUT',12,'#546c77')+
    bold(546,82,'$83',27,'#3c5969')+bold(666,82,'$111',30,'#185d4c')+rule(617,66,647,66,'#9f793b',2.5)+shape('M641 61L649 66L641 71Z','#9f793b')+
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
    bold(402,40,'GTA VI',36,'#fff4da','text-anchor="middle" stroke="#795975" stroke-width="1.5" paint-order="stroke"')+
    type(401,59,'VICE CITY · WORLDWIDE LAUNCH',13,'#2c485c','text-anchor="middle" font-weight="700"'));
}
function cyclone(){
  let spirals='';for(const angle of [0,72,144,216,288])spirals+=`<g transform="translate(468 72) rotate(${angle})">${shape('M-6-6C12-47 59-43 70-12C40-29 18-17 10 4C2 26-20 36-36 26C-10 28 2 12-6-6Z','#e8f2f2','opacity=".92"')}</g>`;
  let waves='';for(let i=0;i<14;i++)waves+=rule(311+i*37%470,107+i*9%24,323+i*37%470,107+i*9%24,'#a2c6d0',1);
  return scene('Cyclone',800,140,box(0,0,800,140,'#346b83')+waves+
    shape('M0 0H341L328 12L315 21L318 35L296 47L281 65L276 82L259 96L250 121L233 140H0Z','#b7c5ae','stroke="#e2e4c8" stroke-width="1.3"')+
    shape('M0 103Q132 74 263 102L233 140H0Z','#8eaa9d')+rule(297,46,270,91,'#5e867f',1)+
    dot(287,61,4,'#a82b3f','stroke="#fff" stroke-width="1"')+bold(169,57,'GOPALPUR',14,'#274a55')+bold(34,31,'INDIA · ODISHA',18,'#274a55')+
    shape('M442 75Q357 70 298 61','none','stroke="#efc271" stroke-width="2.2" stroke-dasharray="6 4"')+shape('M306 54L294 60L306 66Z','#efc271')+spirals+dot(468,72,7,'#2d627b')+
    panel(603,20,174,93,'#eaf1ee')+bold(690,49,'AKVAN',25,'#264d63','text-anchor="middle"')+type(690,72,'90–100 km/h',20,'#264d63','text-anchor="middle" font-weight="700"')+
    type(690,95,'FRIDAY · FORECAST',13,'#7e452c','text-anchor="middle" font-weight="700"')+
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
    bold(494,78,'109–0',35,'#214c69')+flag(645,53,'DK',.58)+flag(688,53,'GL',.58)+flag(731,53,'US',.4)+
    rule(492,90,738,90,'#bac5bd',1)+type(493,111,'DANISH PARLIAMENT · 19 NOV',14,'#3d5b68','font-weight="700"')+
    bold(286,132,'GREENLAND',14,'#25495c'));
}
function jobs(){
  const city=skyline('sydney',[[16,24,44],[55,37,58],[105,30,77],[145,31,48],[191,40,65]],116);
  const sails=shape('M162 116Q186 69 249 110L218 114Q218 58 272 79Q250 85 248 115L285 116Q292 84 337 94L307 116Z','#f4f1df','stroke="#a7b6b4" stroke-width="1.2"');
  return scene('Jobs',800,140,box(0,0,800,140,'url(#Jobs-sky)')+city+box(0,112,800,28,'url(#Jobs-water)')+sails+
    shape('M20 106Q118 19 212 104','none','stroke="#667f88" stroke-width="3"')+[43,76,109,142,175].map((x,i)=>rule(x,70-Math.sin(i/4*Math.PI)*11,x,108,'#667f88',1.2)).join('')+
    panel(402,15,368,109,'#f8f7ee')+bold(423,42,'AUSTRALIA · OCTOBER LABOUR DATA',15,'#2a5366')+
    bold(424,91,'4.9%',47,'#1e6781')+type(599,71,'753.7k',26,'#264d61','font-weight="700"')+type(599,93,'UNEMPLOYED',13,'#4a6370','font-weight="700"')+
    rule(423,102,750,102,'#c2cdc6',1)+type(423,118,'ABS RELEASE · 19 NOVEMBER',13,'#4a6370'));
}
function athletics(){
  let track='';for(let y=91;y<142;y+=10)track+=shape(`M0 ${y}Q557 ${y-35} 1120 ${y}`,'none','stroke="#e3c3a2" stroke-width="1.2"');
  const runner=`<g transform="translate(455 6)">${oval(16,123,77,6,'#654b4b','opacity=".17"')}${dot(11,20,10,'#654432')}${shape('M2 13Q8 0 19 8L22 19L13 12Z','#263d3c')}${shape('M2 33L21 30L36 62L11 77L-9 52Z','#b52c43')}${shape('M-2 38L20 35L27 48L3 54Z','#244c3d')}${rule(-3,57,27,50,'#f3e8ce',3)}${shape('M-2 38L-18 57L-41 48L-44 55L-17 66L8 47Z','#71503b')}${shape('M22 34L42 31L58 11L64 16L47 42L28 45Z','#71503b')}${shape('M15 74L33 67L54 91L83 100L81 108L49 101L23 83Z','#27473e')}${shape('M10 70L24 79L5 102L-23 117L-28 111L-5 93Z','#27473e')}${shape('M-26 110L-19 116L-26 126L-44 127L-44 123Z','#f7f0df')}${shape('M79 99L87 101L90 112L107 116L105 122L83 118L76 109Z','#f7f0df')}</g>`;
  return scene('Athletics',1120,140,box(0,0,1120,140,'url(#Athletics-sky)')+
    shape('M0 75Q204 34 377 66Q721 38 1120 72V140H0Z','#8da68e')+box(0,88,1120,52,'#a76255')+track+
    shape('M43 64H223L216 88H50Z','#334f47')+rule(43,62,222,62,'#e8dec2',4)+bold(132,82,'KENYA',20,'#f3eacb','text-anchor="middle"')+
    runner+panel(732,20,337,92,'#faf7ed')+bold(752,46,'ATHLETICS INTEGRITY UNIT',17,'#37524f')+
    bold(752,81,'3-YEAR BAN',32,'#a62b3e')+type(753,103,'PERES JEPCHIRCHIR · EPO VIOLATION',14,'#4e605e'));
}
function cricket(){
  let stadium='';for(let i=0;i<8;i++)stadium+=shape(`M${20+i*7} ${54+i*4}Q560 ${i*4-15} ${1100-i*7} ${54+i*4}`,'none','stroke="'+(i%2?'#839d98':'#bec9b7')+'" stroke-width="3"');
  const bowler=`<g transform="translate(451 7)">${dot(9,20,9,'#bc9674')}${shape('M1 14Q8 5 18 12L21 17Z','#2b6455')}${shape('M-1 32L21 30L34 67L8 78L-10 53Z','#f2f0dc')}${shape('M0 34L-15 18L-9-1L-2 1L-5 15L12 34Z','#c19b7a')}${shape('M21 34L37 47L57 30L62 35L39 58L27 53Z','#c19b7a')}${shape('M9 75L28 69L48 98L72 111L69 118L39 106L18 86Z','#e4e8d8')}${shape('M8 74L20 83L3 104L-22 122L-28 118L-7 95Z','#eff0db')}${rule(-31,123,-17,125,'#315f4d',4)}${rule(67,119,80,123,'#315f4d',4)}</g>`;
  return scene('Cricket',1120,140,box(0,0,1120,140,'url(#Cricket-sky)')+stadium+
    shape('M0 82Q560 33 1120 82V140H0Z','#7e9e74')+shape('M359 140L404 78H567L625 140Z','#d8c69b')+
    [532,540,548].map(x=>rule(x,96,x,123,'#f8f5e4',3)).join('')+rule(530,95,551,95,'#f8f5e4',2)+bowler+dot(568,27,4,'#ae3040')+
    shape('M569 28Q628 47 547 104','none','stroke="#dce9ce" stroke-width="1.4" stroke-dasharray="5 5"')+
    panel(745,23,328,90,'#153f3a')+bold(768,49,'SOUTH AFRICA',19,'#f6edce')+
    bold(768,84,'WIN BY 9 WICKETS',28,'#fff8e7')+type(769,104,'FIRST TEST · HARMER 6–51',15,'#d1dfcb')+
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
