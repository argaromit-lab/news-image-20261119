# Review checkpoint · 19 November 2026

## Illustration and editorial rebuild

The current master is 3600 × 2680 and 2,061,274 bytes. The 1024 × 762 runtime image is 657,701 bytes, with SHA-256 `0bfa820dad4e683edbe29970d74c8e48b9072565defba1b68f986dfd5f90e9b9`. All 14 features, 19 briefs, and 33 distinct source records remain present. This revision has not been submitted.

The new `editorial-art.mjs` composes all fourteen images for their card proportions. Each SVG preserves its aspect ratio. Shared material and sky gradients, architectural detail, human poses, paper documents, and geographic context replace the stretched strip drawings. The lead scenes depict the Shenzhen table and named presidents, the Peace Palace with the 9–6 verdict and scales, and a COP31 negotiating document with a solid red CUT stamp. The remaining scenes cover Nasdaq, Vice City, the offshore cyclone forecast, Busan exports, Riyadh debris, the Kerch rail bridge, the Arctic agreement, Australian labour data, the AIU ban, the Johannesburg Test, and Landsat imagery of the Atacama.

The dark navy masthead restores a strong date frame and explicit day-only promise. The seven figures use a 46 px display scale and include forecast landfall wind speeds, October Australian unemployment, and NASA's approximate million-fold search-method speed-up, alongside the summit, verdict, IPO and game-launch estimates. The IMD bulletin, ABS release and NASA report were rechecked directly. The first three cards now use 148 px scenes and a dark editorial copy panel; their headlines use 37 px type. The brief text is 13.5 px with 1.38 leading and a consistent source column.

Final checks: zero detected geometry problems across 208 HTML text runs; 14 aspect-preserving illustrations; zero duplicate SVG IDs; all badge heights 18 px. HTML contrast was checked on 201 text nodes, with a minimum ratio of 4.72:1 and no failures. The high-resolution PNG fully decodes, every runtime PNG chunk CRC passes, and two local Node runs plus two fresh offline Linux Node 22 containers produce identical bytes. Anti-slop reports PASS, severity 0, zero gating issues, 39 editorial advisories and zero external stylesheets.

The Wednesday reference was inspected directly from `G:\bounties\news-image-20261118\entry.png`. Four focused comparisons addressed the illustration rebuild, stronger lead hierarchy, map and brief integration, and the final dark lead panels. Groq returned 52/100 on those comparisons; Mistral rose from 68/100 on the first to 88/100 on the final; Gemini gave an intermediate comparison 58/100. Feedback on hierarchy and small-type reading remained mixed, and some remarks misdescribed visible details. These local reviews do not establish that this edition beats Wednesday or predict an official jury score. The November 19 public top three were also fetched outside the repository; the leader was `@hazel-harbor-63` at 99.2344% provisional win rate during the check.

The earlier landscape image is preserved under ignored `.makefun-kit/pre-upgrade-master.png`. The following sections record earlier versions.

## Polished landscape edition

The structure and coverage remain unchanged: 14 featured stories, 19 briefs, seven numerical callouts, and all 33 source records. The three lead summaries now contain 11, 12, and 9 words, down from 14, 15, and 12: a 21.95% reduction overall. The lead headlines use 35 px type. Card badges have a measured uniform height of 18 px with 11 px type, and the sports/science headlines use 25 px. Card gutters grew from 10 to 12 px. The three brief columns align their sources exactly, while retaining the full source attributions.

Map badges grew from radius 11 to 15, with white 17 px numerals and a 2.6-unit white outline. Their connecting lines are shorter and finer; the underlying geographical anchors are unchanged. The date-check and source rows occupy 46 px together, down from 54 px, using a quieter grey background. The original landscape image is preserved under ignored `.makefun-kit/pre-polish-master.png` for comparison.

The earlier polished 3600 × 2480 master was 1,223,311 bytes. Its 1024 × 705 runtime version was 559,015 bytes, with SHA-256 `5f835963853f0c7fbb157eb030534d7533e8e8e3ba29dcfbb9f1a47c343f880d`. The Chromium audit checked 213 text runs and reported zero geometry problems. Separate browser checks confirmed all 14 badge heights were identical and the source-column alignment deviation was zero. PNG completeness, CRCs, two local executions, and two fresh offline Linux Node 22 executions passed. Anti-slop reported PASS, severity 0, zero gating issues, and 39 editorial advisories with no external stylesheets.

Three focused passes addressed copy and hierarchy; brief alignment and map readability; and map connectors and brief leading. Local visual comparisons used the preserved pre-polish image. Mistral scored the polish 88/100; Groq scored the later comparisons 52/100, and Gemini gave an intermediate comparison a neutral 50/100. These reviews praised clearer copy and alignment but did not establish a 92/100 result. No new submission was made.

## Landscape edition before polish

The earlier landscape master was 3600 × 2480 (1,212,777 bytes). Its matching runtime image was 1024 × 705 and 574,917 bytes, with SHA-256 `c5a9d148d8d5b589ff1c433167832f6c5f2a19d29e2dab1a1343a63efa699cdc`. The canvas contained 14 illustrated features, 19 numbered briefs, seven figures, and seven regional counts. The first three cards covered the Shenzhen summit, ICJ ruling, and COP31 draft. All 33 records had distinct source URLs and were included exactly once in reading order.

Source verification added the official IMD bulletin based on 1200 UTC November 19, locating Akvan at 16.1°N, 85.2°E and forecasting a November 20 landfall. The official ABS October labour release is dated November 19 and reports a 4.9% seasonally adjusted unemployment rate. AP supports the Jepchirchir doping ban, AFP and Reuters the 109–0 Greenland vote, and NASA the newly published pulsar report. Forecasts, earlier imagery, and the October reporting period are labelled explicitly.

The layout audit checks 209 text runs and reports zero clipping, container overflow, text overlap, or map-label collision. PNG CRCs and complete scanlines pass. Two local Node processes and two fresh offline Linux Node 22 containers reproduce the runtime image. The master fully decodes to 3600 × 2480 RGB pixels. Anti-slop passes with severity 0, zero gating issues, 39 editorial advisories (18 `row-kicker-eyebrow`, 21 `overstuffed-row`), and zero external stylesheets.

The current public leader inspected was `@hazel-harbor-63`, submission `01a1f47b-f598-7486-a05e-a2a03bc361ab`, at 99.2344% provisional win rate. The three public leading images were retained outside the repository. Local comparisons of the landscape drafts returned Groq scores of 94, 58, and 58; the final Mistral comparison returned 88. The first result favoured the new hierarchy, while later reviews still preferred aspects of the reference's illustrations. These inconsistent local scores do not establish an official win-rate improvement. The final version keeps the larger full-width scenes, source labels, compact numerical copy, and checked geometry.

The earlier sections below describe the square editions. This landscape revision has not been submitted.

## Attribution and illustration polish

The footer is derived from the edition's source ledger. Al Jazeera supports the 9–6 ICJ vote and the Nasdaq trading debut. AP and AFP support the Bangladesh brief. The Riyadh brief follows Reuters reporting published by Al Jazeera. The Anthropic brief distinguishes the $83 offer price from the $111 trading debut, with an $81.3bn gross offering that includes shares sold by existing holders.

The summit art adds three nameplates, the court art displays the 9–6 vote, and the COP31 draft has a red CUT stamp. The numbered Shenzhen and Seoul badges moved closer to their geographic anchors. The revised PNG is 714,704 bytes at 1024 × 1024. Chromium checked 131 text runs with zero geometry problems. Two local Node runs and an offline Linux Node 22 run matched the PNG (`82f020e373d5b63ee2c6592e3d5fe75cc0ccfadcd792eff79e47beeba43285e1`). Anti-slop passed with zero gating issues and 29 editorial advisories. The local vision reviews scored 52/100 on Groq and 78/100 on Mistral against the leaderboard reference.

## Expanded coverage revision

Hale Apex scored 98.4446% provisionally against the house images, compared with 98.6947% for Marine Helix. Both won 12 of 12 matches and their 90% intervals overlap. The official API reported `heat_closed: before_deadline`, so individual verdicts did not inform this revision. The published judging criteria give breadth priority over visual craft.

This revision restores 28 stories and 11 illustrations, retains 27 px lead headlines, and adds the November 19 NASA report about a method for finding pulsars. COP31 becomes a lead story, while the secondary rows restore migration, science, exports, and cricket to the illustrated coverage. The map has 11 numbered pins and 16 terrestrial brief locations. Three visual passes addressed coverage, the figures strip and export illustration, and card hierarchy.

The PNG is 1024 × 1024 and 697,068 bytes. Chromium checked 130 text runs and reported zero geometry problems. Two local Node processes and two offline Node 22 Linux containers produced identical bytes (`1b91d171514c711d907ca02149ac52b15337f15a06e6d5293e18106a765bb7de`). Anti-slop passed with zero gating issues and 28 advisories. Against `@hazel-harbor-63`'s leaderboard-leading image, the final local reviews scored 58/100 on Groq and 78/100 on Mistral. Map numbers and narrative detail remained weaker in those comparisons.

## Hale Apex readability revision

The current image covers 19 stories across seven regions with seven illustrated cards and 12 briefs. It uses 28 px lead headlines, 25 px secondary headlines, and 15 px brief type. Seven numbered pins link directly to the featured cards. The final map review corrected the positions of the GTA VI and Crimea pin labels. The revision uses the EU Commission cyberattack brief in place of the Greenland ratification brief, whose outcome could not be rechecked.

| Check | Current result |
| --- | --- |
| PNG | 1024 × 1024, 631,820 bytes, complete chunks and valid CRCs |
| SHA-256 | `ea8211c7b9a035c6cf6ba7c14274f7290960959c3d3f2f45d4d20c76cfe2bb96` |
| Browser geometry | 110 text runs, zero problems |
| Runtime | Two local Node processes and two fresh offline Linux Node 22 containers produced identical bytes |
| Anti-slop | PASS, severity 0, gating 0, 17 editorial advisories, no external stylesheets |

The comparison used `@izayoi-20`'s **Precise Lemma**, whose public leaderboard rate was 99.2290% at review time. Three focused passes addressed typography and clipping, illustration detail, and map and brief hierarchy. The final vision audits scored the revision 58/100 on Groq and 78/100 on Mistral. Both critics favored the reference's wider coverage and found the revision's hierarchy easier to scan. These are local critic scores. The revision is held for review before submission.

## Previous 28-story checkpoint

The following records describe the previous build, whose PNG had the SHA-256 shown below.

| Check | Result |
| --- | --- |
| Image dimensions | 1024 × 1024 |
| Build raster | 2048 × 2048, headless Edge, Lanczos3 downsample |
| PNG bytes | 632,269; below 900,000 |
| SHA-256 | `03b599caaee95507d4e69fcc9fa5a03451892746a82def22e3cf37c6a48a10b0` |
| PNG completeness | All chunk CRCs, terminal IEND, inflated scanline count pass |
| Runtime determinism | Two fresh Node processes produce identical PNG bytes |
| Story records | 28, with distinct numbered records and source URLs |
| Regional accounting | Asia 8, Europe 4, Middle East 4, Americas 4, Africa 4, Oceania 1, World 3 |
| Browser text geometry | 0 clipped/overlapping text blocks; 155 text runs checked |
| Anti-slop detector | PASS; severity 0, gating 0, advisory 0, external stylesheets 0 |
| Official kit preflight | 0 non-transcript failures; transcripts absent in checkpoint check |

The HTML audit checks bounding rectangles for prose and SVG labels, element scroll overflow, containment within story panels, pairwise text-block overlaps, and individual text runs escaping the canvas. The image contains no ellipsis truncation or pending labels. All code and vectors were authored in this repository after initialization; build dependencies are external.

## Competitive comparison

The public leader inspected before construction was `@quick-finch-51`, entry `01a1f1a6-3029-716b-bcb1-3fd14b5730e3`: 99.2113% provisional win rate, interval 99.0005–99.4221%, 312,966 bytes. Second and third entries inspected were `@lomfi` and `@lively-condor-51`. Their sources are withheld by the platform until the deadline; no architecture claims are inferred from that unavailable source.

The leader's published image was downloaded outside the repository to `G:\kits\top1-news19.png`. It contains 36 stories. Our image contains the requested 28, larger story headlines, explicit per-card Reuters/NASA attribution, an actual Thursday ICJ outcome, the attributed Shenzhen declaration, and a date-check banner.

Three focused visual passes were completed. The critic's scores describe comparison with that reference, not official make.fun win rates:

| Pass | Changes | Groq score |
| --- | --- | --- |
| 1 | Fixed brief overflow; enlarged copy and source labels | 52/100 |
| 2 | Dark numerical strip, 24px figures, 19px medium headlines, stronger illustration colours | 52/100 |
| 3 | Improved headline leading, SVG label insets, numerical-label contrast | 52/100 |

A second provider audit used Mistral's `ministral-14b-2512` after `mistral-medium-latest` returned HTTP 429, and scored the final candidate **88/100**. Both providers returned `UPGRADE_REQUIRED`, below the 92 target. Visual superiority is **not established**. Some comments misidentify illustrations, so the critic is retained as design feedback rather than factual verification.

Local full-size and thumbnail images, complete critic logs, source ledger, and machine-readable layout/runtime audits are under ignored `.makefun-kit/`. The top competitor's image is not included in this repository.

## Editorial and layout limits

The lead headlines are 21.2px and medium headlines 19px at final image scale. Briefs are 12px, supporting stories at full size; the hierarchy and main story headlines carry the 300px view. Twenty-eight complete stories cannot all have large thumbnail-readable prose inside one 1024px square. Card heights were compacted to preserve all required sections.

Sources actually used are Reuters and NASA. The footer credits those sources rather than implying consultation of other agencies. Claims and live estimates remain attributed. NASA's Atacama item is the report published today, with earlier imagery explicitly described as imagery. See the date notes in `stories.mjs`.

## Submission status

The existing make.fun credentials identify `@argaromit`. The owner claim names the active account's connected wallet; it is an ownership claim, not a payout operation. No login or submission was performed. A valid transcript bundle and its full transcript preflight are still required before any eventual submission. The image is being pushed for visual review first, as requested.

After review, the owner's requested submit command is:

```powershell
..\auto-submit.ps1 news-image-20261119
```

That command has not been run.
