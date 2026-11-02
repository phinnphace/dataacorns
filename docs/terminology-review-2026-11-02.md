# Iris terminology review

Date: November 2, 2026

## Website wording updated

| Location | Previous wording | Replacement |
| --- | --- | --- |
| Iris The Record card | data and receipts | data and supporting documentation |
| The Record caption | Receipts hold. Exhibits show. | Exhibits and supporting documentation. |
| Folder label | receipts | Supporting documentation |
| Study session note | exhibits, links, receipts, and folder contents | exhibits, links, supporting documentation, and folder contents |

## Word exhibits updated with owner authorization

Seventeen terminology replacements across all seven downloadable DOCX exhibits. Existing text-run formatting, tables, images, links and package members are preserved. Only word/document.xml changes inside each DOCX. Reader revision queries and the source-artifact hashes are updated intentionally. Original and revised renders have identical page counts (2, 1, 1, 1, 6, 2, 1).

| Exhibit | Replacements | Previous SHA-256 prefix | Revised SHA-256 prefix |
| --- | ---: | --- | --- |
| D.1 The manufactured triplet, and what deduplication deletes.docx | 2 | `2d94ad01dc78ca96` | `82a3c08b51c48293` |
| D.2 The mirrors disagree (full values).docx | 2 | `43cfb138ce34e190` | `5d5ca9c9b50497ee` |
| D.3 The legacy record, verbatim (iris.names, served unchanged since 1989).docx | 2 | `3ea554e3b9be5d96` | `f2cb113b6b90331d` |
| D.5 The intervention.docx | 2 | `a946b1977872029c` | `38d076a9fda20848` |
| D.6 pdf-mcp.docx | 5 | `f1e616acc5be80b9` | `34bc9d6d43574841` |
| D.6a The shape prior — the canonical geometry fails the primary.docx | 2 | `c003cac672322725` | `f35f2f1136edc339` |
| D4 layer by layer.docx | 2 | `734df8f173a6e053` | `251fd09cb3949b1b` |

Replacements:

- Receipts dated → Supporting documentation dated
- receipt file → supporting documentation file
- receipt folder / receipts folder → supporting documentation folder
- receipts already verified → source documentation already verified

## Source data and code flagged for separate review

### public/acorns=iris/data/bezdekIris.data

- nt = grid = extraction = bezdek/R = the primary's values. The deviants are named, bounded, and receipted. Line 2: duplicated printed 143 only — and that's a finding Expected 102 and 143. Got 143. Before anything else: confirm it's the cha
- e. Fisher's own duplicate (virginica rows 2 and 43) is present. Run the fromLast line for the receipt file's completeness, then D.6 slots and Appendix D is done. Compilation resumes: Section V in, citation pass, supplemental reknit, re-
- one duplicated row. That's the double-counted specimen, inside the primary's own third block, receipted in the extraction. ✓ which(duplicated(long, fromLast = TRUE)) = 102 — and combined with the earlier forward pass (143), the pair is f

### public/acorns=iris/receipts/600cellauditdiff.r

- # MCP-extracted table vs. the receipts already verified # spot cells: setosa 35 = 4.9, 3.1, 1.5, 0.2 · setosa 38 = 4.9, 3.6, 1.4, 0.1 # virginica 2 & 43 = 5.8, 2.7, 5.1, 1.9

## Figure caption updated with owner authorization

`public/acorns=iris/receipts/fisher.flowchart.png`: bottom caption reads "All values receipted (2026-09-13 / 09-29); mirrors differ from primary in exactly the erratum’s 3 cells — see D.2". Proposed terminology-only change: "All values documented". Caption-only change completed. Pixel comparison confirms every pixel outside the caption rectangle is identical to the original. The scientific diagram and numbers are unchanged.

## Existing technical references

The established /acorns=iris/receipts/ asset URLs and folder identifiers remain compatible with existing links and saved study sessions. The displayed folder label is Supporting documentation. No file renames or structural changes are included.

The source-artifact manifest retains historical originalPath strings. Repository maintenance prose and unpublished model-schmodel code also contain the old term; the helper uses receipt keys and MODEL_SHMODEL_RECEIPT as existing input/output contracts. These are flagged rather than refactored as part of the portfolio wording pass.

No text matches were found in the public PDF manuscripts by text extraction. The standalone flowchart and photograph were visually inspected. The montage video and text embedded inside other source-document screenshots are not comprehensively transcribed by this text scan.

## Remaining repository text references

This index records every remaining text-match line after the approved website and Word changes. The source data and code examples above retain their original wording; other entries are established asset paths, input schemas, historical manifest fields, or maintenance prose.

| File | Lines |
| --- | --- |
| `README.md` | 42 |
| `docs/architecture.md` | 19, 30, 47 |
| `docs/source-artifacts.json` | 138, 139, 143, 144, 148, 149, 153, 154, 158, 159, 163, 164, 168, 169, 173, 174, 178, 179, 183, 184, 188, 189, 193, 194 |
| `public/acorns=iris/data/bezdekIris.data` | 155, 176, 192 |
| `public/acorns=iris/receipts/600cellauditdiff.r` | 1 |
| `research/README.md` | 9 |
| `research/model-schmodel/README.md` | 15, 24, 50, 58, 65, 72 |
| `research/model-schmodel/reference_profiles.json` | 19, 40, 56 |
| `research/model-schmodel/summarize_runs.py` | 14, 25, 31, 41, 42, 43, 54, 55, 57, 77, 81, 82, 84, 86, 89, 90, 93, 94, 95, 98, 100, 114, 116, 118, 120, 121, 128 |
| `src/ecoverses/iris/record/IrisRecordStage.tsx` | 52 |
| `src/ecoverses/iris/record/StudyWorkspace.tsx` | 247, 250 |
| `src/ecoverses/iris/record/recordManifest.ts` | 20, 110 |
