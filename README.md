# news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/argaromit-lab/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/argaromit-lab/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

An original square infographic of Thursday 19 November 2026: 33 attributed stories across seven regions, 14 illustrated features in a **3 + 4 + 4 + 3** grid, 19 numbered briefs, seven key figures, and a map keyed to the features. Built for the make.fun bounty **Sum up 19 November's world news in one image**.

![The World in One Day: Thursday 19 November 2026](world-in-one-day-2026-11-19.png)

The source render is `world-in-one-day-2026-11-19.png` at **2048 × 2048**. `entry.png` is the **1024 × 1024** runtime version, below 900 KB.

## Run it

```sh
node main.ts
```

Node 22 runs the standard-library-only entrypoint without installing packages. It writes the repository's immutable PNG bytes to `/output/entry.png`. For a local output folder:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Rebuild the image

```sh
npm install
npx playwright install chromium
npm run build
npm run verify
```

On Windows the builder uses installed Edge; on Linux it uses Playwright Chromium. `NEWS_BROWSER_PATH` overrides the executable. `NEWS_TOOLING_DIR` optionally points to an external directory containing the build dependencies.

The authored `render.html` uses CSS Grid on an 1800 × 1800 canvas with an explicit Chromium scale of 2048/1800. The builder asserts the screenshot is exactly 2048 × 2048, then Sharp downsamples with Lanczos3 to 1024 × 1024. Two fresh browser contexts must produce byte-identical master and entry PNGs before either image is published. Fonts are local Georgia and Arial; rebuilds on a different operating system can substitute fonts. Submission runtime bytes are identical across operating systems because runtime copies the committed image.

All 14 illustrations are composed in `editorial-art.mjs` for their card proportions, using a shared palette and material gradients. They retain their SVG aspect ratios and carry large factual image labels. The first row uses white president nameplates, an enlarged 9–6 ICJ panel, and a crossed-out fossil-fuel document with a CUT stamp. Supporting scenes use high-contrast numerical labels and contextual qualifiers.

The builder writes a full-size capture, a 300px preview, the rendered HTML, source ledger, and browser geometry audit under the ignored `.makefun-kit/` directory. Its geometry checks cover text blocks, individual text runs, containers, and SVG-label boundaries. The verification script checks complete PNG chunks and checksums, dimensions, byte limits, two fresh runtime executions, and SHA-256 equality.

## Editorial sourcing

The edition in [`stories.mjs`](stories.mjs) lists each story's source URL, applicable map coordinates, and date or attribution notes. The footer credits Reuters, AP, AFP, Al Jazeera, Australia's ABS, India's IMD, NASA, Infobae, and ANTARA from that ledger.

[`SOURCES.md`](SOURCES.md) gives all 33 numbered source links and their qualifying date bases. Featured cards show the credited outlet together with a dated event, ruling, draft, debut, bulletin, release, result, or report label. A credited wire agency may be linked through the outlet hosting its report.

The updated November 19 Nasdaq report gives Anthropic's first trading quote as $111.50. The image distinguishes that debut from the $83 offer price set on November 18 and the $81.3bn gross IPO. Han's sentence being overturned is described together with the retrial order, not as an acquittal. The Myanmar ruling is explicitly distinguished from the 2017 Rohingya atrocities.

The Shenzhen and GTA VI articles have rolling URLs beginning on 18 November; their text explicitly dates the summit and game rollout to Thursday 19 November. The declaration is attributed to China and Russia, the Riyadh attribution to sources and the Saudi-led coalition, the bridge interruption to Russian authorities, and the boat report to a local NGO. GTA VI's 17m-plus copies and $1.65bn are Sensor Tower estimates at report time, not final audited daily sales.

NASA's new Atacama report is dated 19 November. Its September and October satellite imagery is described as imagery in a report published today. Barty's reported Hall of Fame election is included; her formal induction next August is excluded.

The date banner excludes the 18 November Voyager milestone, EU €45bn loan proposal, and Fed minutes. Fiji's drought declaration is also excluded because the article dates the address to Wednesday. The IMD bulletin dated November 19 places Akvan offshore and forecasts a Friday landfall; the image labels that distinction. Australia's unemployment figure is October data released November 19, not a single-day unemployment measure.

The three lead stories are followed by two rows of four cards and a final row of three, with 19 additional briefs in two columns. The date uses 100 px type, lead headlines 42 px, and supporting headlines 28 px. Brief text is 18.5 px, with inline italic source credits; each credit stays with the final word of its report. This increases the effective line width and avoids isolated source-only lines. The brief list includes the Han retrial order, Bogota's national strike, Jakarta's asset-forfeiture law and Somalia's expulsion order. Numbers, card labels and map pins share region colours. Forecast winds, October unemployment, earlier imagery and estimates remain labelled. The 300 px preview primarily conveys the date, key figures, illustrated labels and headline hierarchy; full supporting copy is intended for the larger image.

The COP31 illustration does not assert the requested $120bn aid deletion: that exact figure was not substantiated in the accessible November 19 reports checked. The Riyadh label states **0 injuries reported**, following the source, rather than broadening it to zero casualties.

## License

MIT. All illustrations and source code were authored for this entry. No competitor art or source is included.

---

<sub>Built for [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
