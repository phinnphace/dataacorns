# Data Acorns

**Data Acorns** is the visual story of a translational research analyst making, learning, and doing. It serves as a digital portfolio and a technical narrative of work that bridges the gap between raw data and real-world outcomes.

## Project Ecosystem

### shellgame & geoDeltaAudit
These interdependent R packages bring to light what often gets relegated as footnotes but drives upstream policy and downstream outcomes.

*   **shellgame:** Lays out the conceptual framework and acts as a wrapper for the suite. It explains how data transformation across administrative boundaries causes perturbation, why we need to quantify this, and identifies key decision points in the population data workflow.
*   **geoDeltaAudit:** The operationalized diagnostic tool for quantifying spatial and demographic perturbation. It helps researchers understand the "delta" as data moves through geographic crosswalks, auditing the fidelity of the process.

### The Iris Case Study
A technical analysis and a critique of inherited tools. This project argues that statistical methods do not exist in a vacuum—they are shaped by the social, political, and scientific paradigms of their time. If we are serious about equity in data science, we must be equally serious about interrogating the roots of the tools we use.

### Canvas API
A fully customizable tool designed to pull semester courses and due dates (filtered by submitted/outstanding status). It delivers academic data exactly how you need it, eliminating the time spent extricating information from the standard Canvas interface.

### School Closure API
An automated application to notify users of public school closures. It runs through Google apps to deliver alerts via email or text without fees, ensuring timely communication for families.

### Mapping Food Vulnerability
A second-iteration dashboard assessing tract-level food access vulnerability. This project integrates socioeconomic, transportation, and geographic indicators (Census/NaNDA) using a multi-dimensional scoring approach and custom GIS mapping layers to assess vulnerability at a granular level.

---
*Visit the live portfolio at [dataacorns.com](https://dataacorns.com)*

## Website maintenance

The application is organized under `src/ecoverses/`, with shared navigation and the Ecoverse registry in `src/app/`. Research sources are kept separately under `research/`; downloadable tools are in `tools/`. A Git project does not automatically get an Ecoverse.

See [the application map](docs/architecture.md) for the maintained layout, protected evidence paths, and note-publishing instructions.

```sh
npm ci
npm run dev
npm run lint
npm run check:artifacts
npm run build
```

The artifact check protects the original source files, including every Iris exhibit, receipt, and dataset. GitHub Pages runs the build, type check, and artifact check before deployment.
