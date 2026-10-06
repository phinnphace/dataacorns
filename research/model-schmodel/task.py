# %%
"""Single-call Kaggle pilot: the completed notebook is the sole record."""

import hashlib
import importlib.util
import json
import subprocess
import sys
from pathlib import Path

import kaggle_benchmarks as kbench


TASK_NAME = "model-shmodel-iris"
PROTOCOL_VERSION = "notebook-only-0.1"

NOTEBOOK_CELLS = [
    ("markdown", "# Model Shmodel: CRISP-DM Iris Workflow\n\nComplete a conventional introductory machine-learning analysis of the Iris dataset using the CRISP-DM framework.\n\nGo to Kaggle and run this notebook using the Iris dataset. Record all decisions, code, outputs, and interpretations in this notebook."),
    ("markdown", "## Assignment objectives\n\n1. Apply the six CRISP-DM phases to a small classification problem.\n2. Examine and prepare the Iris dataset.\n3. Train and evaluate a conventional classifier.\n4. Explain the analytical decisions and resulting conclusions."),
    ("markdown", "## 0. Setup\n\nImport the libraries needed for data handling, visualization, preprocessing, modeling, and evaluation. Set any options or random seeds needed for reproducibility."),
    ("code", "# Import libraries and configure reproducibility here."),
    ("markdown", "# 1. Business Understanding\n\nFrame the Iris data as a classification problem. Address the intended outcome, likely users or stakeholders, scope, exclusions, success criteria, constraints, and expected deliverables."),
    ("markdown", "### 1.1 Context and objective\n\nDescribe the classification objective and why it may be useful."),
    ("markdown", "_Response:_"),
    ("markdown", "### 1.2 Scope, stakeholders, constraints, and success\n\nState what is and is not being attempted, who may use the result, important limitations, and how success will be evaluated."),
    ("markdown", "_Response:_"),
    ("markdown", "# 2. Data Understanding\n\nLoad the Iris dataset and examine its structure, contents, quality, distributions, and relevant relationships. Discuss the findings rather than presenting unexplained output."),
    ("markdown", "### 2.1 Load the data\n\nLoad the Iris dataset in the Kaggle notebook."),
    ("code", "# Load the Iris dataset here."),
    ("markdown", "### 2.2 Describe the dataset\n\nReport its dimensions, column names, data types, representative rows, and the meaning and analytical role of each attribute."),
    ("code", "# Inspect dataset structure and representative records here."),
    ("markdown", "_Discussion:_"),
    ("markdown", "### 2.3 Basic statistics and distributions\n\nCalculate appropriate descriptive statistics and class frequencies. Visualize the most useful distributions and explain what they show."),
    ("code", "# Calculate descriptive statistics and class frequencies here."),
    ("code", "# Create and display relevant univariate visualizations here."),
    ("markdown", "_Discussion:_"),
    ("markdown", "### 2.4 Data quality\n\nExamine missing values, duplicate records, inconsistent values, and potential outliers. State whether any action is needed and justify the decision."),
    ("code", "# Examine missing values here."),
    ("code", "# Examine duplicate records here."),
    ("code", "# Examine inconsistent values and potential outliers here."),
    ("markdown", "_Discussion:_"),
    ("markdown", "### 2.5 Relationships among attributes\n\nExplore useful relationships among predictors and between predictors and the target. Use appropriate plots or statistics and interpret them."),
    ("code", "# Explore relationships among attributes here."),
    ("markdown", "_Discussion:_"),
    ("markdown", "# 3. Data Preparation\n\nCreate a working copy of the supplied data. Implement and justify any cleaning, attribute selection, encoding, transformation, or scaling identified during Data Understanding. Show the effect of material changes."),
    ("code", "# Create a working copy and perform justified cleaning here."),
    ("markdown", "_Cleaning decisions and justification:_"),
    ("code", "# Select predictors and target, then encode or transform attributes as needed."),
    ("markdown", "_Attribute-selection and transformation decisions:_"),
    ("markdown", "# 4. Modeling\n\nSplit the prepared data into training and test sets using a stated, reproducible method. Scale predictors when appropriate. Train a K-nearest-neighbors classifier, examine a reasonable range of `k`, and select a final configuration."),
    ("code", "# Create a reproducible training/test split and perform any needed scaling here."),
    ("code", "# Train and compare KNN models over a reasonable range of k here."),
    ("markdown", "_Modeling decisions and justification:_"),
    ("markdown", "# 5. Evaluation\n\nEvaluate the selected model on held-out data. At minimum, report accuracy, a confusion matrix, and class-level precision, recall, and F1 scores. Compare training and test behavior, identify important limitations, and relate the result to the success criteria."),
    ("code", "# Evaluate the selected model and display all required metrics here."),
    ("markdown", "_Evaluation and interpretation:_"),
    ("markdown", "# 6. Deployment\n\nDescribe how the analysis and model could be communicated, reproduced, monitored, or used. Identify what additional evidence or work would be required before any real-world use."),
    ("markdown", "_Response:_"),
    ("markdown", "# Conclusions\n\nSummarize the workflow, principal findings, modeling result, data-quality conclusions, and limitations."),
    ("markdown", "_Response:_"),
]


def ensure_notebook_runtime() -> None:
    required = {
        "nbformat": "nbformat",
        "nbclient": "nbclient",
        "sklearn": "scikit-learn",
        "matplotlib": "matplotlib",
        "seaborn": "seaborn",
        "json_repair": "json-repair",
    }
    missing = [package for module, package in required.items() if importlib.util.find_spec(module) is None]
    if missing:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet", *missing])


def build_template_notebook():
    import nbformat

    cells = []
    for cell_type, source in NOTEBOOK_CELLS:
        if cell_type == "code":
            cells.append(nbformat.v4.new_code_cell(source))
        else:
            cells.append(nbformat.v4.new_markdown_cell(source))
    return nbformat.v4.new_notebook(
        cells=cells,
        metadata={
            "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
            "language_info": {"name": "python", "version": "3"},
            "model_shmodel": {
                "protocol": "notebook-only-iris",
                "protocol_version": PROTOCOL_VERSION,
                "status": "unexecuted-template",
            },
        },
    )


def parse_notebook_response(response: str):
    import nbformat

    text = response.strip()
    if text.startswith("```"):
        first_newline = text.find("\n")
        text = text[first_newline + 1 :] if first_newline >= 0 else text
        if text.rstrip().endswith("```"):
            text = text.rstrip()[:-3]
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end < start:
        raise ValueError("The model did not return a Jupyter notebook JSON object.")
    notebook_text = text[start : end + 1]
    try:
        payload = json.loads(notebook_text)
    except json.JSONDecodeError:
        from json_repair import repair_json

        payload = repair_json(notebook_text, return_objects=True)
    return nbformat.reads(json.dumps(payload), as_version=4)


# %%
@kbench.task(
    name=TASK_NAME,
    description="Fill out and execute the CRISP-DM Iris student notebook.",
)
def model_shmodel_iris(llm) -> dict:
    ensure_notebook_runtime()
    import nbformat
    from nbclient import NotebookClient

    template = build_template_notebook()
    template_json = nbformat.writes(template)
    protocol_sha256 = hashlib.sha256(template_json.encode("utf-8")).hexdigest()

    response = llm.prompt("Fill out this Jupyter notebook.\n\n" + template_json)
    completed = parse_notebook_response(response)

    kbench.assertions.assert_equal(
        len(template.cells),
        len(completed.cells),
        expectation="The completed notebook should preserve the template's cell count.",
    )
    kbench.assertions.assert_true(
        any(
            cell.cell_type == "code"
            and cell.source.strip()
            and not cell.source.lstrip().startswith("#")
            for cell in completed.cells
        ),
        expectation="The completed notebook should contain executable analysis code.",
    )

    for cell in completed.cells:
        if cell.cell_type == "code":
            cell.execution_count = None
            cell.outputs = []

    completed.metadata.setdefault("model_shmodel", {})
    completed.metadata["model_shmodel"].update(
        {
            "protocol": "notebook-only-iris",
            "protocol_version": PROTOCOL_VERSION,
            "template_sha256": protocol_sha256,
            "status": "executing",
        }
    )

    client = NotebookClient(
        completed,
        timeout=900,
        kernel_name="python3",
        resources={"metadata": {"path": "/kaggle/working"}},
    )
    executed = client.execute()
    executed.metadata["model_shmodel"]["status"] = "executed"
    executed_json = nbformat.writes(executed)
    executed_sha256 = hashlib.sha256(executed_json.encode("utf-8")).hexdigest()

    output_path = Path("/kaggle/working/model-shmodel-completed.ipynb")
    output_path.write_text(executed_json, encoding="utf-8")

    print("MODEL_SHMODEL_EXECUTED_NOTEBOOK_BEGIN")
    print(executed_json)
    print("MODEL_SHMODEL_EXECUTED_NOTEBOOK_END")

    return {
        "task": TASK_NAME,
        "protocol_version": PROTOCOL_VERSION,
        "template_sha256": protocol_sha256,
        "executed_notebook_sha256": executed_sha256,
        "completed_notebook_json": executed_json,
        "model_facing_call_count": 1,
        "record_type": "executed_jupyter_notebook",
    }


# %%
if __name__ == "__main__":
    model_shmodel_iris.run(kbench.llm)
