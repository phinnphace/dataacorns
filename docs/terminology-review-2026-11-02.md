# Iris terminology review

Date: November 2, 2026

## Terminology by research function

| Material | Term used | Reason |
| --- | --- | --- |
| The Record as a whole | Appendix D | It is the paper’s single numbered appendix. |
| D.1 through D.6a | Appendix D exhibits | These are sections within that appendix, rather than seven independent appendices. |
| Fisher (1936) PDF | Primary-source documentation | This is the original published paper. |
| Unwin and Kleinman (2021) PDF | Primary research article | This is an original research article used as a source for the historical analysis. |
| Extracted Table I CSV and spreadsheet | Supplementary data | These are structured extractions derived from the printed table. |
| R comparison script | Supplementary analysis code | It supports the comparison of extracted values and repository files. |
| Validation logs, transcripts and physical-grid photograph | Supporting documentation | These document the extraction and verification process. |
| Extraction-tool metadata | Software provenance documentation | This identifies the tool and version used. |
| Fisher flowchart | Supplementary figure | This presents the relationships and comparison results visually. |
| Publisher-exported BibTeX and plain-text citation metadata | Citation metadata in the data folder | The metadata files are actually stored there; D6 now points to that folder accurately. |
| Model-run JSON, generated code, stdout and stderr | Execution records | These record what ran and what it produced. |

## Completed wording changes

- Updated the Iris card, Appendix D heading, study-session note, and displayed supporting-documentation folder label.
- Updated the seven Word exhibits and flowchart caption in the first pass.
- Preserved the annotated source-data file and its archived model transcript byte-for-byte. Historical terminology in that primary record is documented rather than rewritten.
- Updated the R-script comment to refer to supplementary data.
- Updated repository maintenance documentation and model reference-profile descriptions.
- Renamed the model-run indexing function and variables; current exports use source_file and the new run-record naming.
- Corrected D6’s description of the comparison inputs and the actual location of citation metadata. Its six-page rendering is preserved.
- Relocated the 12 supporting files to the supporting-documentation directory and updated active links, file identifiers, revision queries, and the source manifest.
- Added build-time copies at the established URLs so previously shared links keep returning the current file bytes.
- Added saved-session identifier migration so selected files, positions and study view persist through the folder change.

## Current source versions

| File | SHA-256 prefix |
| --- | --- |
| `public/acorns=iris/D.1 The manufactured triplet, and what deduplication deletes.docx` | `82a3c08b51c48293` |
| `public/acorns=iris/D.2 The mirrors disagree (full values).docx` | `5d5ca9c9b50497ee` |
| `public/acorns=iris/D.3 The legacy record, verbatim (iris.names, served unchanged since 1989).docx` | `f2cb113b6b90331d` |
| `public/acorns=iris/D.5 The intervention.docx` | `38d076a9fda20848` |
| `public/acorns=iris/D.6 pdf-mcp.docx` | `eaf17ca79f3cbace` |
| `public/acorns=iris/D.6a The shape prior — the canonical geometry fails the primary.docx` | `f35f2f1136edc339` |
| `public/acorns=iris/D4 layer by layer.docx` | `251fd09cb3949b1b` |
| `public/acorns=iris/data/bezdekIris.data` | `090c1bda81056edf` |
| `public/acorns=iris/supporting-documentation/600cellauditdiff.r` | `51ff5548db74613f` |
| `public/acorns=iris/supporting-documentation/fisher.flowchart.png` | `5cace691d928172b` |

## Historical compatibility references

The former folder identifier and URLs are retained only as input migration rules and build-time download aliases. Historical originalPath fields and relocation records retain actual former paths, rather than rewriting their provenance. The execution-record parser accepts the former JSON field and printed marker when reading already-downloaded runs. Current labels, active paths, documentation and newly indexed outputs use the revised terminology.

## Montage and screenshot review

The montage was scanned at one-second intervals: 421 frames decoded successfully, with no decoding failures. Four matching stretches were found: 00:30–00:42 and 02:41–02:52 (authored console labels), 06:09–06:18 (the historical GitHub screenshot), and 06:52–07:00 (authored credit text). The authored console labels and credits are revised. The historical GitHub screenshot remains verbatim in both D5 and the montage, as explicitly directed by the owner. The original comment and screenshot were never cropped or rewritten.

## Validation

- Type checking and production build pass. The author note’s rendered text is checked against the supplied DOCX, and its downloaded bytes match the attachment.
- All 119 source artifacts and the exact 25-file Iris source-material inventory pass the artifact checks.
- The 12 legacy download aliases are built from the same verified bytes as their current destinations.
- The seven document readers render the revised text and use revision queries.
- Existing saved study-session selections, file positions and view migrate correctly.
- Current and older execution-record JSON and text formats, plus raw generated-output indexing, pass compatibility checks.

## Verbatim author note

The owner supplied `Authors Epistemic Note Regarding Language Inconsistencies.docx` for verbatim publication. Its source SHA-256 is `5ffc4ad14ffdc4ae0458203eb0cba865d9bc80136a86461b01d0e459a8737b6c`. It is available from the top of The Record and a site-wide footer link. Both open the same unchanged DOCX in the existing reader. Its deliberate discussion of the former term remains verbatim.
