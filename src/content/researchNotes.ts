export type ResearchNote = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
};

const noteFiles = import.meta.glob('../../content/notes/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const unquote = (value: string) => value.trim().replace(/^(?:"(.*)"|'(.*)')$/, '$1$2');

const parseTags = (value: string) => {
  const trimmed = value.trim();
  const tagList = trimmed.startsWith('[') && trimmed.endsWith(']') ? trimmed.slice(1, -1) : trimmed;

  return tagList
    .split(',')
    .map((tag) => unquote(tag).trim())
    .filter(Boolean);
};

const parseNote = (path: string, raw: string): ResearchNote | null => {
  const fileName = path.split('/').pop() ?? '';
  if (fileName.startsWith('_') || fileName.toLowerCase() === 'readme.md') return null;

  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return null;

  const metadata = Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => {
        const separator = line.indexOf(':');
        return separator === -1 ? null : [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      })
      .filter((entry): entry is [string, string] => entry !== null),
  );

  const title = unquote(metadata.title ?? '');
  const date = unquote(metadata.date ?? '');
  const summary = unquote(metadata.summary ?? '');
  if (!title || !date || !summary) return null;

  return {
    slug: fileName.replace(/\.md$/i, ''),
    title,
    date,
    summary,
    tags: parseTags(metadata.tags ?? ''),
    body: match[2].trim(),
  };
};

export const RESEARCH_NOTES = Object.entries(noteFiles)
  .map(([path, raw]) => parseNote(path, raw))
  .filter((note): note is ResearchNote => note !== null)
  .sort((a, b) => b.date.localeCompare(a.date));
