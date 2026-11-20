// Original vector drawings. All internal labels start at least 14 units below
// the viewBox top. Scene geometry is descriptive, never a quantitative chart.
const path = (d, fill, extra='') => `<path d="${d}" fill="${fill}" ${extra}/>`;
const line = (x1,y1,x2,y2,color='#68828d',width=1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"/>`;
const rect = (x,y,w,h,fill,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const circle = (x,y,r,fill,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const text = (x,y,t,size=10,color='#274152',extra='') => `<text x="${x}" y="${y}" fill="${color}" font-family="Arial" font-size="${size}" ${extra}>${t}</text>`;
const svg = (id, content, height=100) => `<svg role="img" aria-label="${id}" viewBox="0 0 320 ${height}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky${id}" x2="0" y2="1"><stop stop-color="#c6e4ef"/><stop offset="1" stop-color="#f8e6b9"/></linearGradient><linearGradient id="glass${id}" x2="1" y2=".3"><stop stop-color="#345d78"/><stop offset=".5" stop-color="#a8cad7"/><stop offset="1" stop-color="#466a80"/></linearGradient><linearGradient id="sea${id}" x2="0" y2="1"><stop stop-color="#91c9d5"/><stop offset="1" stop-color="#477f9b"/></linearGradient></defs>${rect(0,0,320,height,`url(#sky${id})`)}${content}</svg>`;

function flag(x,y,country) {
  let cloth = '';
  if(country==='US') {
    cloth=rect(x,y,33,20,'#fff');
    for(let i=0;i<7;i++) cloth+=rect(x,y+i*3,33,1.5,'#b52539');
    cloth+=rect(x,y,14,10,'#203d68');
    for(let i=0;i<6;i++) cloth+=circle(x+3+(i%3)*4,y+3+Math.floor(i/3)*4,.65,'white');
  } else if(country==='CN') {
    cloth=rect(x,y,33,20,'#bd2735')+text(x+5,y+14,'★',14,'#ffe087');
  } else if(country==='RU') {
    cloth=rect(x,y,33,20,'#fff')+rect(x,y+6.7,33,6.7,'#355c94')+rect(x,y+13.4,33,6.7,'#ba303e');
  }
  return line(x-1,y-2,x-1,y+42,'#73858d',1.4)+cloth;
}

function summit() {
  let windows='';
  const buildings=[[12,42,18,42],[36,33,14,51],[54,47,23,37],[83,21,17,63],[104,39,20,45],[193,34,24,50],[222,44,14,40],[240,25,18,59],[264,48,22,36],[291,38,18,46]];
  for(const [x,y,w,h] of buildings) {
    windows+=rect(x,y,w,h,'#698a9c', 'opacity=".3"');
    for(let wy=y+5;wy<y+h;wy+=6) windows+=line(x+3,wy,x+w-3,wy,'#d4e4e9',.7);
  }
  const person=(x,hair,tie,shape) => `<g transform="translate(${x} 40)">${path('M-22 50L-19 34Q-17 28 -7 26L7 26Q17 28 19 34L22 50Z','#22364e')}${path('M-8 27L0 41L8 27Z','#fff')}${path('M-2 32L2 32L4 46L0 49L-4 46Z',tie)}${path('M-7 6Q-10 11 -8 20Q-6 27 0 28Q7 27 9 20L10 9Z','#d9a886')}${path(shape,hair)}${line(-5,15,-2,15,'#624d48',.8)}${line(3,15,6,15,'#624d48',.8)}${path('M-3 22Q1 24 4 21','none','stroke="#aa725f" stroke-width=".8"')}</g>`;
  const nameplates=[[77,'TRUMP'],[161,'XI'],[246,'PUTIN']].map(([x,name])=>
    rect(x-25,80,50,18,'#152e40','stroke="#e3c699" stroke-width=".8"')+
    text(x,93,name,13,'#fff7e4','text-anchor="middle" font-weight="bold"')).join('');
  return svg('Shenzhen',windows+path('M0 84Q45 70 79 81Q111 72 142 81Q211 69 255 78L320 76V100H0Z','#8cb3ab')+
    flag(60,15,'US')+flag(145,15,'CN')+flag(233,15,'RU')+
    person(77,'#d7bc6d','#bc2f40','M-10 13Q-14 0 0 0Q10 -3 13 7L5 8L-3 5L-9 14Z')+
    person(161,'#29343a','#af3040','M-10 13Q-11 -1 0 0Q12 -1 11 13L7 7L-6 5Z')+
    person(246,'#ad9d87','#596f91','M-10 14Q-13 4 -5 2L-3 6L-7 9L-7 15ZM9 15L8 6L4 3Q14 4 11 15Z')+
    path('M30 92Q160 72 290 92L280 100H40Z','#415b65')+line(40,94,280,94,'#c1cfce',1)+nameplates);
}

function tower() {
  let detail='';
  for(let y=21;y<91;y+=4) detail+=line(168,y,211,y,'#d1e5eb',.7);
  for(let x=173;x<211;x+=6) detail+=line(x,18,x+5,92,'#3c5d76',.7);
  return svg('Riyadh',circle(67,30,18,'#f3d8a5')+path('M0 91Q45 72 91 82Q129 69 167 82L320 73V100H0Z','#d8c8b1')+
    path('M25 91V58L43 48L59 57V91Z','#91a5aa')+path('M68 91L74 40L92 33L111 45V91Z','#9aafb4')+
    path('M228 92L233 50L252 38L269 51L276 92Z','#91a8af')+
    path('M163 93L169 24L184 12L208 19L218 93Z','url(#glassRiyadh)')+detail+
    path('M178 51L186 48L190 54L197 51L202 60L195 65L183 63Z','#465365')+
    path('M196 55Q213 45 218 35Q225 31 232 34Q237 27 245 29Q249 38 237 43Q231 52 215 51L203 60Z','#9cabb0','opacity=".65"')+
    line(12,94,307,94,'#778f97',1.5)+text(15,25,'RIYADH',10)+text(239,84,'PIF TOWER',9));
}

function court() {
  let architecture='';
  for(let x=45;x<273;x+=13) architecture+=path(`M${x} 80V63Q${x+4} 56 ${x+8} 63V80Z`,'#617e88');
  for(let x=53;x<270;x+=24) architecture+=rect(x,46,7,10,'#a5b8bb');
  return svg('WorldCourt',path('M0 91Q70 80 150 88Q240 78 320 89V100H0Z','#bdd0b8')+
    path('M36 84V53L50 40H127L139 29H184L199 40H276L288 53V84Z','#e6d7ba','stroke="#9c9f91" stroke-width="1"')+
    path('M48 40L69 28H118L130 40ZM191 40L209 29H258L275 40Z','#708c92')+
    path('M139 82V30H181V82Z','#d2c2a3')+path('M132 31L160 14L188 31Z','#657d86')+architecture+
    circle(160,39,8,'#fbf4de','stroke="#a48b5b" stroke-width="1"')+line(160,39,160,34,'#766247')+line(160,39,165,41,'#766247')+
    rect(147,62,26,22,'#506e7b')+path('M147 64Q160 46 173 64Z','#506e7b')+
    text(16,25,'THE HAGUE',10)+line(17,29,17,55,'#677d8a',1.2)+rect(17,31,18,12,'#4f8aa6')+
    circle(26,37,4,'none','stroke="white" stroke-width=".8"')+line(25,89,296,89,'#8e9d94',1)+
    rect(199,10,91,27,'#243e53','stroke="#eddcc1" stroke-width="1"')+
    text(212,29,'ICJ',12,'#fff3d7','font-weight="bold"')+text(254,30,'9–6',19,'#fff','text-anchor="middle" font-weight="bold"'));
}

function bridge() {
  let supports='';for(let x=35;x<310;x+=35) supports+=path(`M${x} 62L${x-5} 85H${x+7}L${x+3} 62Z`,'#547684');
  let ripples='';
  for(let i=0;i<34;i++){
    const x=i*47%307, y=70+i*11%29;
    ripples+=line(x,y,x+10,y,i%2?'#d2eef0':'#45778f',.7);
  }
  let truss='';
  for(let x=105;x<198;x+=12) truss+=line(x,60,x+12,33+Math.abs(x-148)*.25,'#cbd6d5',.9);
  return svg('Crimea',rect(0,55,320,45,'url(#seaCrimea)')+ripples+
    path('M0 15H77L105 22L84 35L76 53L47 61L0 58Z','#dfd6b8')+
    path('M269 15H320V69L285 58L262 42L250 28Z','#dfd6b8')+
    supports+path('M20 62L295 58L297 63L20 67Z','#526d7d')+
    path('M92 60Q150 0 211 59','none','stroke="#f4f5ed" stroke-width="4"')+
    line(105,48,105,61,'#f4f5ed')+line(127,29,127,61,'#f4f5ed')+line(151,22,151,59,'#f4f5ed')+line(177,31,177,59,'#f4f5ed')+line(199,46,199,58,'#f4f5ed')+
    truss+text(10,29,'CRIMEA',11)+text(268,29,'RUSSIA',11)+text(98,94,'KERCH STRAIT',11)+
    rect(224,43,74,15,'#9e1831')+text(232,54,'RAIL HALTED',9,'white','font-weight="bold"'));
}

function climate() {
  let turbines='';for(const [x,y] of [[42,45],[83,37],[119,50]]) turbines+=line(x,y,x,84,'#496e70',2)+line(x,y,x-14,y-7,'#496e70',2)+line(x,y,x+12,y-10,'#496e70',2)+line(x,y,x+3,y+16,'#496e70',2);
  return svg('COP31',circle(260,30,19,'#eac570')+path('M0 76Q70 40 149 69Q240 45 320 69V100H0Z','#91b49d')+
    path('M0 89Q95 70 170 84Q255 66 320 82V100H0Z','#638b71')+turbines+
    rect(174,14,110,73,'#fffef4','stroke="#7f9b8f" stroke-width="1"')+
    text(184,34,'COP31 DRAFT',13,'#2d5d4e','font-weight="bold"')+
    text(184,54,'FOSSIL FUELS',12,'#526763','font-weight="bold"')+line(182,49,272,49,'#9e1831',1.6)+
    `<g transform="rotate(-11 254 69)">${rect(229,57,50,23,'#fffef4','stroke="#9e1831" stroke-width="2.2"')}${text(254,74,'CUT',17,'#9e1831','text-anchor="middle" font-weight="bold"')}</g>`);
}

function gaming() {
  let city='';for(let i=0;i<13;i++){
    const x=i*26,h=[18,29,42,20,35,47,28,38,25,50,31,36,19][i];
    city+=rect(x,91-h,20,h,i%2?'#45446a':'#355571')+rect(x+15,91-h,5,h,'#27384f');
    for(let y=96-h;y<85;y+=8) for(let col=0;col<3;col++) city+=rect(x+3+col*4,y,2,3,(col+i)%2?'#ffc88b':'#91c8e3');
  }
  const palm=x=>path(`M${x} 95Q${x-6} 65 ${x+3} 31Q${x-12} 25 ${x-24} 34Q${x-15} 16 ${x+4} 25Q${x+10} 9 ${x+28} 20Q${x+13} 20 ${x+7} 29Q${x+28} 24 ${x+37} 43Q${x+16} 31 ${x+6} 33Q${x} 67 ${x+5} 96Z`,'#214d59');
  return svg('Gaming',`<defs><linearGradient id="viceSky" x2="0" y2="1"><stop stop-color="#563f77"/><stop offset="1" stop-color="#e6826e"/></linearGradient></defs>`+
    rect(0,0,320,100,'url(#viceSky)')+circle(162,56,36,'#ffbd80')+city+palm(40)+palm(272)+
    rect(0,91,320,9,'#263d54')+text(160,48,'GTA VI',27,'#fff3df','text-anchor="middle" font-weight="bold" stroke="#452f54" stroke-width="1" paint-order="stroke"'));
}

function chips() {
  const container=(x,y,fill)=>rect(x,y,29,11,fill,'stroke="#273747" stroke-width=".6"')+
    [4,9,14,19,24].map(offset=>line(x+offset,y+2,x+offset,y+9,'#26394a',.55)).join('');
  const cargo=[['#e6ba63','#b64b48','#7f9bae','#e6ba63','#6b9e93'],['#6b9e93','#ac474c','#e6ba63','#7f9bae']]
    .map((row,index)=>row.map((fill,i)=>container(65+i*29+(index?29:0),61-index*11,fill)).join('')).join('');
  let cranes='';
  for(const x of [48,132,228]) cranes+=path(`M${x} 68V21H${x+47}L${x+54} 28H${x+6}V68Z`,'#557283')+
    line(x+36,28,x+36,43,'#52636e',1.1)+rect(x+28,43,16,4,'#8c5849');
  const flag=rect(268,19,29,19,'#fff')+circle(282.5,28.5,5,'#af283d')+
    path('M277.5 28.5A5 5 0 0 0 287.5 28.5Q285 32 282.5 28.5Q280 25 277.5 28.5Z','#28608b');
  return svg('Korea',rect(0,69,320,31,'#6d9eac')+cranes+
    path('M37 72H260L244 88H61Z','#18354b')+path('M55 86H246L240 91H62Z','#9d3742')+
    rect(212,55,19,17,'#eaf2f2')+rect(215,58,13,3,'#587d91')+cargo+flag);
}

function bank() {
  let details='';for(let x=44;x<133;x+=12) details+=line(x,43,x,83,'#91acb9',2);
  for(let y=30;y<83;y+=16) details+=rect(210,y,74,12,'#53778e','rx="2"')+circle(219,y+6,2,'#a8dac2')+line(229,y+6,275,y+6,'#a8bac6',1);
  return svg('ECB',path('M29 40L88 17L146 40Z','#496880')+rect(35,43,106,42,'#e2e8e8')+details+rect(28,84,120,6,'#496880')+
    text(87,36,'ECB',11,'white','text-anchor="middle" font-weight="bold"')+
    line(159,52,196,52,'#a32d3c',3)+path('M190 46L201 52L190 58Z','#a32d3c')+text(175,76,'AI CREDIT',9,'#344b60','text-anchor="middle"'));
}

function boat() {
  let waves='';for(let y=61;y<98;y+=11) waves+=path(`M0 ${y}Q18 ${y-7} 36 ${y}T72 ${y}T108 ${y}T144 ${y}T180 ${y}T216 ${y}T252 ${y}T288 ${y}T324 ${y}`,'none','stroke="#b6d8df" stroke-width="2"');
  let people='';for(let i=0;i<7;i++) people+=circle(117+i*13,45,4,'#364f5a')+path(`M${111+i*13} 59L${113+i*13} 50Q${117+i*13} 46 ${121+i*13} 50L${124+i*13} 59Z`,'#3f5962');
  return svg('Senegal',rect(0,53,320,47,'url(#seaSenegal)')+path('M0 15H47L63 25L46 37L56 47L33 59L0 60Z','#d9d1b5')+
    text(69,25,'ATLANTIC OCEAN',11)+people+path('M96 58L219 58L204 73H113Z','#745447')+path('M103 61L213 61','none','stroke="#f1cda2" stroke-width="2"')+waves+text(8,81,'SENEGAL',9,'#f9ffff'));
}

function desert() {
  let blooms='';for(let i=0;i<70;i++){const x=(i*47+13)%320,y=65+(i*17)%34;blooms+=circle(x,y,1.1+(i%3)*.3,['#b33b62','#e5a2b0','#f4e8dd'][i%3]);}
  return svg('Atacama',circle(263,27,15,'#e8c27a')+path('M0 67L36 44L66 57L91 36L133 64L185 39L220 57L257 37L320 65V100H0Z','#b9a08a')+
    path('M0 80Q60 54 113 75Q188 61 250 73L320 68V100H0Z','#b89b8b')+path('M0 91Q70 65 133 84Q230 67 320 86V100H0Z','#876e73')+blooms+
    text(12,27,'LANDSAT · CHILE',11)+path('M284 30L292 23L300 30L292 37Z','#617c89')+line(292,30,266,62,'#c8d9da',1));
}

function cricket() {
  return svg('Cricket',path('M0 62Q160 40 320 62V100H0Z','#7ca47e')+
    path('M120 100L141 52H180L205 100Z','#daca9f')+
    line(159,58,159,77,'#f9f8ed',2)+line(165,58,165,77,'#f9f8ed',2)+line(171,58,171,77,'#f9f8ed',2)+line(158,57,172,57,'#f9f8ed',2)+
    circle(138,27,7,'#c69f81')+path('M129 25Q133 14 144 21L147 26Z','#2a6757')+
    path('M131 35L144 33L155 50L145 59L130 52Z','#f8f6e9')+
    path('M132 49L145 54L139 73L130 89L124 87L131 68Z','#f8f6e9')+
    path('M143 53L149 54L157 73L172 84L169 90L151 80L140 65Z','#e3e7d7')+
    path('M144 38L159 43L169 32L173 37L162 50L147 46Z','#f8f6e9')+
    path('M171 36L180 18L185 20L176 41Z','#d9b778','stroke="#9f855d" stroke-width="1"')+
    circle(196,29,3,'#ac293c')+text(20,27,'SOUTH AFRICA',12,'#285744','font-weight="bold"')+text(238,76,'9 WKT',19,'#173c34','font-weight="bold"'));
}

function ipo() {
  let facade='';
  for(let x=23;x<137;x+=9) for(let y=15;y<83;y+=9) facade+=rect(x,y,5,5,(x+y)%3?'#51728c':'#a6c7d7');
  return svg('Nasdaq',rect(0,0,320,100,'#152b46')+rect(16,7,130,88,'#293f5c')+facade+
    rect(151,13,156,71,'#0a2037','stroke="#648d9d" stroke-width="1"')+
    text(163,30,'NASDAQ  ·  ANT',12,'#d4e4ee','font-weight="bold"')+
    text(163,59,'$111',29,'#a4e4c1','font-weight="bold"')+text(163,75,'TRADING DEBUT',9,'#e5f0f5')+
    rect(232,41,63,32,'#304c64')+text(263,55,'$83',15,'#fff','text-anchor="middle" font-weight="bold"')+
    text(263,67,'IPO PRICE',8,'#d9e5eb','text-anchor="middle"')+
    rect(0,86,320,14,'#20364c')+text(23,97,'19 NOV 2026     $81.3bn GROSS OFFERING',10,'#f6ddb0','font-weight="bold"'));
}

function cyclone() {
  let rain='';
  for(let i=0;i<25;i++) {const x=14+i*43%300,y=19+i*13%66;rain+=line(x,y,x-3,y+8,'#92c9db',.8);}
  const swirl='<g transform="translate(216 53)">'+[0,90,180,270].map(a=>
    `<g transform="rotate(${a})">${path('M-2-6C14-28 36-19 31 2C23-9 10-9 4-1Z','#e5f3f7')}</g>`).join('')+circle(0,0,4,'#214f71')+'</g>';
  return svg('Akvan',rect(0,0,320,100,'#235a79')+rain+
    path('M0 0H145L134 19L147 33L127 52L119 78L88 100H0Z','#c7d3b6','stroke="#91a798" stroke-width="1"')+
    path('M113 90Q152 52 190 52','none','stroke="#ffd487" stroke-width="2" stroke-dasharray="4 3"')+
    path('M131 63L121 69L127 57Z','#ffd487')+swirl+
    text(15,28,'ODISHA',12,'#244b52','font-weight="bold"')+text(15,47,'INDIA',11,'#244b52')+
    text(167,24,'AKVAN',15,'#fff','font-weight="bold"')+text(170,91,'20 NOV · FORECAST',10,'#fff','font-weight="bold"'));
}

function arctic() {
  return svg('Greenland',rect(0,0,320,100,'#183e5a')+
    path('M90 12L116 6L147 18L156 41L140 54L130 76L112 88L105 66L90 49L78 29Z','#dceaf0','stroke="#9fb7c8" stroke-width="1"')+
    path('M0 77L43 61L70 74L90 96H0ZM169 87L198 61L226 71L240 100H167Z','#7b9fae')+
    rect(184,16,107,34,'#f5f8f6')+text(237,42,'109–0',25,'#143449','text-anchor="middle" font-weight="bold"')+
    text(181,66,'SECURITY PACT',12,'#fff','font-weight="bold"')+
    rect(187,76,27,16,'#aa243c')+rect(194,76,4,16,'#fff')+rect(187,82,27,4,'#fff')+
    rect(225,76,27,16,'#fff')+path('M225 84A8 8 0 0 1 241 84Z','#c63445')+
    rect(263,76,27,16,'#fff')+[0,1,2,3,4].map(i=>rect(263,76+i*3.2,27,1.6,'#b52a40')).join('')+
    rect(263,76,11,8,'#30466f'));
}

function jobs() {
  let offices='';
  for(const [x,h] of [[15,37],[42,58],[70,44],[98,66],[127,34]]) {
    offices+=rect(x,91-h,21,h,'#6e8c9d');
    for(let y=97-h;y<88;y+=8)offices+=line(x+4,y,x+17,y,'#d3e4e7',2);
  }
  return svg('AustraliaJobs',rect(0,76,320,24,'#82b5c2')+offices+
    path('M88 88Q113 61 153 85L138 87Q134 55 160 60Q150 72 158 87Z','#f4f1de')+
    rect(174,15,130,69,'#eef3f4','stroke="#a4b7be" stroke-width="1"')+
    text(239,43,'4.9%',29,'#1a5f7b','text-anchor="middle" font-weight="bold"')+
    text(239,61,'UNEMPLOYMENT',10,'#2a4f62','text-anchor="middle" font-weight="bold"')+
    text(239,75,'OCTOBER 2026 · ABS',9,'#2a4f62','text-anchor="middle"'));
}

function athletics() {
  let track='';for(let y=70;y<100;y+=8)track+=path(`M0 ${y}Q160 ${y-13} 320 ${y}`,'none','stroke="#efc6ad" stroke-width="1"');
  return svg('Jepchirchir',rect(0,0,320,100,'#dbece5')+rect(0,66,320,34,'#a96155')+track+
    circle(126,24,7,'#654a3c')+path('M118 32L132 31L140 51L125 57L112 43Z','#a4263b')+
    path('M127 53L140 52L154 67L170 68L171 73L149 73L132 61Z','#263e38')+
    path('M121 53L132 57L122 74L103 85L100 81L114 67Z','#263e38')+
    path('M119 35L111 46L96 43L95 48L114 52L126 42Z','#654a3c')+
    path('M132 35L143 34L154 22L158 26L145 42L137 44Z','#654a3c')+
    text(17,28,'KENYA',13,'#274c3d','font-weight="bold"')+
    rect(185,22,111,46,'#fff9f5','stroke="#a4273d" stroke-width="2"')+
    text(240,42,'3 YEARS',19,'#a4273d','text-anchor="middle" font-weight="bold"')+
    text(240,59,'DOPING BAN',11,'#a4273d','text-anchor="middle" font-weight="bold"'));
}

export const illustrations = [summit,tower,court,bridge,climate,gaming,chips,bank,boat,desert,cricket];
export const featureScenes={summit,tower,court,bridge,climate,gaming,chips,bank,boat,desert,cricket,ipo,cyclone,arctic,jobs,athletics};

// Coastline silhouettes independently drawn in geographic coordinates.
const land = [
  [[-168,70],[-145,71],[-129,62],[-112,69],[-93,73],[-74,65],[-55,52],[-61,45],[-72,44],[-81,25],[-90,20],[-99,17],[-111,29],[-123,42],[-130,53],[-151,59],[-168,63]],
  [[-82,12],[-70,10],[-60,6],[-50,0],[-36,-7],[-40,-22],[-50,-29],[-57,-40],[-68,-55],[-73,-49],[-76,-30],[-80,-6]],
  [[-52,60],[-43,60],[-24,75],[-40,83],[-60,80]],
  [[-10,36],[-9,44],[-2,48],[9,54],[15,61],[25,71],[40,68],[45,58],[59,58],[70,70],[100,77],[131,71],[160,68],[179,65],[174,53],[156,50],[144,44],[139,35],[130,31],[122,21],[114,23],[108,12],[104,1],[99,9],[94,17],[87,22],[80,8],[74,18],[64,25],[54,27],[48,30],[40,37],[33,41],[26,39],[18,40],[14,36],[9,43],[1,42]],
  [[-17,15],[-13,28],[-1,36],[14,33],[26,32],[34,26],[43,12],[51,11],[42,0],[38,-13],[30,-30],[19,-35],[12,-20],[9,-2],[-1,5],[-12,7]],
  [[112,-21],[114,-34],[130,-36],[141,-39],[153,-28],[149,-19],[136,-12],[130,-14],[121,-17]],
  [[46,-13],[50,-16],[47,-25],[44,-23]], [[130,33],[135,35],[141,42],[143,45],[140,34]],
  [[95,5],[106,-6],[116,-8],[128,-4],[138,-5],[142,-8],[124,-10],[110,-9],[100,-4]],
  [[166,-35],[175,-39],[171,-46],[166,-45]], [[145,-41],[149,-42],[147,-44]],
];

export function worldMap(stories, featuredCount) {
  const project=(lon,lat)=>[8+(lon+180)/360*584,17+(82-lat)/140*195];
  const coast=land.map(points=>path(points.map(([lon,lat],i)=>`${i?'L':'M'}${project(lon,lat).map(n=>n.toFixed(1)).join(' ')}`).join('')+'Z','#d9c7a1','stroke="#7d9196" stroke-width=".9"')).join('');
  let grid='';for(let lat=-40;lat<=60;lat+=20){const [,y]=project(0,lat);grid+=line(8,y,592,y,'#d4e2e9',.7);}
  const labels={summit:[507,104.6],court:[474,125],climate:[346,88.4],ipo:[153,78.2],gaming:[150,110.5],cyclone:[433,132.6],chips:[529,71.4],tower:[394,106.3],bridge:[378,56.1],arctic:[236,28.1],jobs:[552,200.6],athletics:[361,154.7],cricket:[331,190.4],desert:[166,183.6]};
  const colors={ASIA:'#ac263f',EUROPE:'#315d94','MIDDLE EAST':'#98521c',AMERICAS:'#12634d',AFRICA:'#8b6411',OCEANIA:'#176c86',WORLD:'#535f72'};
  const leadPins=stories.slice(0,featuredCount).map(story=>{
    const [x,y]=project(story.lon,story.lat);
    const [lx,ly]=labels[story.art];
    const color=colors[story.region];
    return line(x,y,lx,ly,'#fff',2.6)+line(x,y,lx,ly,color,.8)+circle(x,y,3,color,'stroke="#fff" stroke-width="1"')+
      circle(lx,ly,15,color,'stroke="#fff" stroke-width="2.6"')+
      text(lx,ly+5.8,String(story.id),17,'#fff','text-anchor="middle" font-weight="bold"');
  }).join('');
  const mappedBriefs=stories.slice(featuredCount).filter(story=>story.lon!==null);
  const dots=mappedBriefs.map(story=>{
    const [x,y]=project(story.lon,story.lat);
    return circle(x,y,3.2,colors[story.region],'stroke="#fff" stroke-width=".9"');
  }).join('');
  return `<svg role="img" viewBox="0 0 600 236" xmlns="http://www.w3.org/2000/svg" aria-label="World map with ${featuredCount} numbered feature pins and ${mappedBriefs.length} brief locations">${grid}${coast}${text(46,53,'NORTH AMERICA',10,'#506573')}${text(137,162,'S. AMERICA',10,'#506573')}${text(284,30,'EUROPE',10,'#506573')}${text(287,148,'AFRICA',10,'#506573')}${text(456,43,'ASIA',10,'#506573')}${text(496,225,'OCEANIA',10,'#506573')}${dots}${leadPins}</svg>`;
}
