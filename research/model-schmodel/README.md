# Model Shmodel: Iris deduplication field test

This benchmark observes what a conventional student CRISP-DM workflow does with the public Kaggle `uciml/iris` dataset. It does not disclose the Appendix D findings to the tested model and does not grade the model against those findings.

The model writes and runs the ordinary analysis. The benchmark preserves:

- the exact task protocol and its hash;
- the attached `Iris.csv` and its hash;
- generated code;
- stdout and stderr;
- one model-facing call only;
- raw generated code and execution output for independent post-run review;
- train/test split and modeling details.

The downloaded run receipts can then be compared with the reference fingerprints in `reference_profiles.json`.

## Pinned input

- Kaggle dataset: `uciml/iris`
- Displayed Kaggle version when pinned: Version 2
- File: `Iris.csv`
- SHA-256: `600ac44f23c2e6e0ae37daac8ceb2baba4df963efa580eb31b3b576b28e34c55`

The task records an assertion if the attached file changes. The workflow still runs so that a changed upstream artifact is itself visible in the receipt.

The benchmark task installs `scikit-learn`, `matplotlib`, and `seaborn` when they are absent from Kaggle's isolated Python script runner. This is runtime plumbing only; the tested model still chooses and writes the analysis.

## Kaggle workflow

Install and authenticate the current official Kaggle CLI, then run these commands from this directory:

```bash
kaggle auth login
kaggle b t push model-shmodel-iris -f task.py -d uciml/iris --wait
kaggle b t models
kaggle b t run model-shmodel-iris -m MODEL_SLUG --wait
kaggle b t download model-shmodel-iris -m MODEL_SLUG -o results --include-source
```

Run only one model at a time. Download and inspect that run before starting the next one. Model selection is intentionally deferred to the interactive Kaggle model list. Model identity is recorded, but it is not the central variable.

Inspect all runs before publication. When the benchmark and its backing notebook are ready to be public:

```bash
kaggle b t publish model-shmodel-iris
```

Publishing cannot currently be reversed through the CLI.

## Receipt extraction

After downloading runs:

```bash
python summarize_runs.py results --csv model-shmodel-runs.csv
```

The raw downloaded runs remain the receipts. The CSV is only an index for comparing deduplication fingerprints and downstream fan-out.

Protocol version 0.3 frames the run as a complete student demonstration. The
model is instructed to follow the notebook accurately so a student can see what
is done, where, how and why. The notebook's existing Data Quality instruction
therefore remains authoritative without adding a deduplication-specific hint.

The observed model receives no receipt schema and no second prompt. After its
single notebook run, the benchmark freezes the generated code, stdout and
stderr. Deduplication keys, identifier use, row removals and other comparison
fields are documented independently from those frozen artifacts. Observer
annotations must be labeled as post-run findings and are never sent back to the
model.

The initial private pilot notes and raw run receipts remain local and are not published with this site. The local notes distinguish model-generated observations from runner or provider failures.
