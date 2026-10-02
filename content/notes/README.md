# Research Hub notes

Every published Markdown file in this folder becomes a post in the **Notes** section of the Research Hub on the next site build.

## Add a note

1. Copy `_template.md` to a new file in this folder.
2. Give the file a short URL-friendly name, such as `why-i-audit-the-join.md`.
3. Fill in the title, date, summary, tags, and body.
4. Commit the file to `main`. The existing GitHub Pages workflow will rebuild the site.

Files beginning with `_` and this README are never published.

The front matter must stay at the very top of the file. `title`, `date`, and `summary` are required. Tags are comma-separated inside square brackets.
