# Review checkpoint · 19 November 2026

## Readability revision

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
