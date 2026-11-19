// Editorial ledger: one record per distinct story; all dates checked below.
// Coordinates locate the event or subject, rather than the wire's dateline.
const reuters = 'https://www.reuters.com/';
const item = (id, region, place, title, summary, path, lon, lat, note = '') => ({
  id, region, place, title, summary, url: reuters + path,
  source: 'REUTERS', date: '2026-11-19', lon, lat, note,
});

const ledger = [
  item(1, 'ASIA', 'SHENZHEN · DIPLOMACY', 'Trump, Xi & Putin\nmeet in Shenzhen',
    'China and Russia say the three agreed a “peace declaration” rejecting nuclear war.',
    'world/china/trumps-historic-meeting-with-xi-putin-headlines-asia-trip-2026-11-18/', 114.06, 22.54,
    'Rolling article opened 18 Nov; the Nov 19 dateline explicitly dates the meeting and declaration to Thursday. Declaration attributed to China and Russia.'),
  item(2, 'MIDDLE EAST', 'RIYADH · GULF', 'Saudi wealth-fund\ntower hit in strike',
    'Sources blame a Houthi missile. Saudi-led coalition reports debris and material damage.',
    'world/middle-east/houthi-missile-threat-towards-riyadh-causes-damage-saudi-led-coalition-says-2026-11-19/', 46.67, 24.71),
  item(3, 'ASIA', 'MYANMAR · WORLD COURT', 'ICJ finds Myanmar\ncommitted genocide',
    'The court rules on the 2017 Rohingya atrocities and orders safe returns and compensation.',
    'world/asia-pacific/top-un-court-finds-myanmar-committed-state-sponsored-genocide-against-muslim-2026-11-19/', 93, 20,
    'Judgment delivered at The Hague on Thursday, 19 Nov. Map locates affected northern Rakhine, not court seat.'),
  item(4, 'EUROPE', 'CRIMEA · WAR', 'Bridge struck\nfor third time',
    'Russia says the attack halted rail traffic; no one was hurt.',
    'world/china/third-attack-week-suspends-traffic-over-crimean-bridge-russian-official-says-2026-11-19/', 36.6, 45.3,
    'Thursday rail suspension is new; the road arch collapsed Tuesday and is not presented as today’s event.'),
  item(5, 'WORLD', 'ANTALYA · COP31', 'Fossil fuels vanish\nfrom draft deal',
    'Negotiators publish revised text with no fossil-fuel reference.',
    'sustainability/cop/cop31-negotiators-publish-revised-deal-text-with-no-mention-fossil-fuels-2026-11-19/', 30.7, 36.9),
  item(6, 'AMERICAS', 'GLOBAL · GAMING', 'GTA VI launches;\nsales top 17m',
    'Sensor Tower estimates $1.65bn sold as the game rolls out.',
    'world/europe/gamers-get-ready-enter-vice-city-grand-theft-auto-vi-begins-global-rollout-2026-11-18/', -80.19, 25.76,
    'Rolling URL began 18 Nov; Nov 19 dateline explicitly says game unlocked Thursday. Sales are estimates, not Rockstar-certified final launch-day totals.'),
  item(7, 'ASIA', 'SEOUL · ECONOMY', 'Korean exports\npass $1 trillion',
    'The AI chip boom makes Korea the fourth country to reach it.',
    'world/south-korea-becomes-fourth-country-globally-hit-1-trillion-exports-ai-chip-boom-2026-11-19/', 126.98, 37.56),
  item(8, 'EUROPE', 'FRANKFURT · BANKS', 'ECB flags rise\nin AI lending',
    'Data centres are 1.2–1.3% of banks’ corporate exposures.',
    'business/finance/euro-zone-banks-data-centre-exposure-small-growing-ecb-says-2026-11-19/', 8.68, 50.11),
  item(9, 'AFRICA', 'SENEGAL · MIGRATION', 'Dozens missing\nafter boat capsizes',
    'A local NGO reports the migrant boat sank off Senegal.',
    'world/dozens-missing-migrant-boat-capsizes-off-senegal-coast-ngo-says-2026-11-19/', -17.45, 14.69),
  {...item(10, 'AMERICAS', 'CHILE · EARTH SCIENCE', 'NASA maps the\nAtacama bloom',
    'Today’s report details vast desert flowers in Landsat imagery.', '', -70.51, -27.73,
    'New NASA Earth Observatory report dated 19 Nov. Images were taken 14 Sep and 24 Oct; flowering is not described as starting today.'),
    source: 'NASA', url: 'https://science.nasa.gov/earth/earth-observatory/el-nino-rains-paint-the-atacama/'},
  item(11, 'AFRICA', 'JOHANNESBURG · CRICKET', 'South Africa wins\nby nine wickets',
    'Bangladesh loses the first Test; Harmer takes 6–51.',
    'sports/cricket/south-africa-seal-nine-wicket-win-over-bangladesh-first-test-2026-11-19/', 28.05, -26.2),
  item(12, 'ASIA', 'Bangladesh', 'Unrest spreads', 'Hasina backers enforce a shutdown.',
    'world/asia-pacific/parts-bangladesh-shut-down-protests-by-hasinas-party-yunus-home-set-ablaze-2026-11-19/', 90.4, 23.8),
  item(13, 'ASIA', 'S. Korea', 'Han faces retrial', 'Han’s 15-year term is overturned.',
    'world/asia-pacific/south-korea-supreme-court-overturns-15-year-jail-term-former-pm-han-2026-11-19/', 127, 37.6),
  item(14, 'ASIA', 'Taiwan', 'TSMC tightens curbs', 'Sources say TSMC tightens chip curbs.',
    'world/china/tsmc-tightens-china-ai-chip-curbs-new-us-rules-close-manufacturing-loophole-2026-11-19/', 121, 24.8),
  item(15, 'ASIA', 'China', 'Alibaba beats estimates', 'Alibaba beats revenue estimates.',
    'business/retail-consumer/chinas-alibaba-beats-quarterly-revenue-estimates-2026-11-19/', 120.15, 30.27),
  item(16, 'EUROPE', 'Brussels', 'EU confirms cyberattack', 'EU confirms an AI-aided cyberattack.',
    'legal/litigation/eu-commission-targeted-cyberattack-politico-reports-2026-11-19/', 4.35, 50.85),
  item(17, 'EUROPE', 'Denmark', 'Greenland deal ratified', 'MPs ratify Trump’s Greenland deal.',
    'world/denmark-expected-ratify-trump-deal-over-greenland-thursday-2026-11-19/', -42, 72),
  item(18, 'MIDDLE EAST', 'Iran', 'Inspection access sought', 'Western powers seek site inspections.',
    'world/china/west-presses-iran-iaea-let-inspections-resume-bombed-nuclear-sites-2026-11-19/', 51.4, 35.7),
  item(19, 'MIDDLE EAST', 'Gaza', 'Tank raid ends', 'Israel says its tank raid has ended.',
    'world/middle-east/israel-says-it-concludes-gaza-tank-raid-2026-11-19/', 34.45, 31.5),
  item(20, 'MIDDLE EAST', 'Iraq', 'Militia compromise reached', 'Officials report a militia compromise.',
    'world/middle-east/iraqi-forces-strike-compromise-with-powerful-pro-iran-militia-security-officials-2026-11-19/', 44.37, 33.3),
  item(21, 'AFRICA', 'Africa', 'Ibrahim urges self-reliance', 'Ibrahim urges more domestic funding.',
    'world/africa/with-foreign-aid-slashed-africa-must-own-its-own-future-billionaire-ibrahim-says-2026-11-19/', 25, 5),
  item(22, 'AFRICA', 'Ethiopia', 'Airline probes data breach', 'Ethiopian Airlines probes a breach.',
    'world/africa/ethiopian-airlines-investigates-data-breach-affecting-its-loyalty-programme-2026-11-19/', 38.75, 9.03),
  item(23, 'AMERICAS', 'Brazil', 'Corn ethanol fuels beef boom', 'Corn ethanol drives feedlot growth.',
    'world/americas/brazils-corn-ethanol-boom-accelerating-growth-feedlot-beef-2026-11-19/', -55, -15,
    'New analysis reported 19 Nov; structural trend is not represented as having started today.'),
  item(24, 'AMERICAS', 'Venezuela', 'AI pitched for cleaner oil', 'Delegates pitch AI for cleaner oil.',
    'sustainability/cop/cop31-venezuela-touts-ai-path-cleaner-oil-production-2026-11-19/', -66.9, 10.5),
  item(25, 'WORLD', 'Markets', 'Gold rebounds', 'Gold recovers from a 14-month low.',
    'world/india/gold-edges-up-14-month-low-markets-assess-fed-rate-outlook-2026-11-19/', -74, 40.7),
  item(26, 'WORLD', 'Football', 'Three seek FIFA presidency', 'Diallo and Tashima seek FIFA’s top job.',
    'sports/soccer/fifa-unveils-presidential-candidates-as-diallo-tashima-challenge-infantino-2026-11-19/', 8.55, 47.38),
  item(27, 'ASIA', 'Korea', 'Lee urges renewed dialogue', 'Lee calls for talks with the North.',
    'world/china/south-koreas-lee-says-hopes-reopening-talks-with-north-korea-could-lead-lasting-2026-11-19/', 127.5, 39),
  item(28, 'OCEANIA', 'Australia', 'Barty elected to Hall of Fame', 'Barty wins Hall of Fame election.',
    'sports/tennis/barty-humbled-join-absolute-legends-tennis-hall-fame-2026-11-19/', 153, -27,
    'Election reported today. Formal induction is next August and is not represented as happening today.'),
];

// Lead and feature order, followed by the two reading columns of briefs.
export const featuredCount = 7;
const edition = [
  [1, 'Trump, Xi & Putin meet in Shenzhen', 'China and Russia say the leaders backed a declaration rejecting nuclear war.'],
  [3, 'UN court finds Myanmar committed genocide', 'The ruling orders safe returns and compensation for Rohingya.'],
  [2, 'Saudi wealth fund tower hit in Riyadh', 'Sources cite a Houthi missile. The Saudi-led coalition reports debris and damage.'],
  [6, 'GTA VI goes\non sale', 'Sensor Tower estimates 17m+ copies sold.'],
  [5, 'COP31 drops\nfossil fuel text', 'The revised draft leaves out a reference to fossil fuels.'],
  [4, 'Crimea bridge\nrail traffic halts', 'Russia says a third strike in a week halted trains.'],
  [10, 'NASA maps\nAtacama bloom', 'A new NASA report shows Chile’s desert in bloom.'],
  [7, 'South Korea', 'Chip boom lifts exports past $1 trillion.'],
  [8, 'ECB', 'Eurozone banks’ data-centre lending grows.'],
  [9, 'Senegal', 'NGO says dozens are missing after a migrant boat capsizes.'],
  [11, 'Cricket', 'South Africa beats Bangladesh by nine wickets.'],
  [12, 'Bangladesh', 'Protests by Hasina’s party shut down parts of the country.'],
  [16, 'EU Commission', 'The bloc confirms a cyberattack.'],
  [19, 'Gaza', 'Israel says its tank raid has ended.'],
  [23, 'Brazil', 'Corn ethanol drives feedlot growth.'],
  [28, 'Australia', 'Ash Barty is elected to the Tennis Hall of Fame.'],
  [25, 'Markets', 'Gold rebounds from a 14-month low.'],
  [26, 'FIFA', 'Diallo and Tashima challenge Infantino.'],
  [14, 'Taiwan', 'Sources say TSMC tightens AI chip curbs on China.'],
];

export const stories = edition.map(([ledgerId,title,summary], index) => {
  const source = ledger.find(story => story.id === ledgerId);
  if (!source) throw new Error(`Unknown story ${ledgerId}`);
  return {...source, id:index+1, art:ledgerId-1, title, summary};
});

export const regions = [
  ['ASIA','#a42c3a'], ['EUROPE','#2b5b86'], ['MIDDLE EAST','#9b4c17'],
  ['AMERICAS','#286448'], ['AFRICA','#7f5f18'], ['OCEANIA','#226a75'], ['WORLD','#555d70'],
].map(([name,color]) => ({name,color,count:stories.filter(s=>s.region===name).length}));

export const figures = [
  ['3 leaders','Shenzhen talks'], ['17m+ copies','GTA VI estimate'], ['$1 trillion','Korean exports'],
  ['9 wickets','South Africa wins'],
];
