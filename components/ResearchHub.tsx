import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Copy,
  Download,
  FileText,
  Github,
  MapPin,
  NotebookPen,
  Search,
  Share2,
  Tag,
} from 'lucide-react';
import { ABSTRACTS, type Abstract } from './AbstractGallery';
import { RESEARCH_NOTES, type ResearchNote } from '../src/content/researchNotes';

const FILTERS = ['All', 'SACNAS', 'ABRCMS'];
const GITHUB_NOTES_URL = 'https://github.com/phinnphace/dataacorns/tree/main/content/notes';
const GITHUB_NEW_NOTE_URL = 'https://github.com/phinnphace/dataacorns/new/main/content/notes';

type HubSection = 'all' | 'notes' | 'abstracts';

const NoteArticle = ({ note, onBack }: { note: ResearchNote; onBack: () => void }) => (
  <div className="min-h-screen bg-[#fbfaf7] text-stone-900">
    <div className="sticky top-14 z-30 border-b border-stone-200 bg-[#fbfaf7]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-stone-600 hover:bg-stone-100 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Research Hub
        </button>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">Note</span>
      </div>
    </div>

    <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
      <header className="mb-10 border-b border-stone-200 pb-9">
        <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wide text-amber-700">
          <NotebookPen className="h-4 w-4" />
          <span>Research note</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-500">{note.date}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-stone-950 sm:text-5xl">
          {note.title}
        </h1>
        <p className="mt-6 font-serif text-xl leading-relaxed text-stone-600">{note.summary}</p>
      </header>

      <div className="font-serif text-lg leading-[1.82] text-stone-700">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => <h2 className="mb-4 mt-11 font-serif text-3xl font-bold text-stone-950">{children}</h2>,
            h3: ({ children }) => <h3 className="mb-3 mt-9 font-serif text-2xl font-bold text-stone-950">{children}</h3>,
            p: ({ children }) => <p className="mb-6">{children}</p>,
            a: ({ children, href }) => (
              <a href={href} className="text-amber-800 underline decoration-amber-300 underline-offset-4 hover:text-amber-950">
                {children}
              </a>
            ),
            ul: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>,
            ol: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>,
            blockquote: ({ children }) => (
              <blockquote className="my-8 border-l-4 border-amber-500 bg-[#f5f1e8] px-6 py-4 italic text-stone-600">
                {children}
              </blockquote>
            ),
            pre: ({ children }) => (
              <pre className="mb-7 overflow-x-auto border border-stone-800 bg-stone-950 p-5 font-mono text-sm leading-relaxed text-stone-200">
                {children}
              </pre>
            ),
            code: ({ children }) => <code className="font-mono text-[0.88em]">{children}</code>,
            table: ({ children }) => (
              <div className="mb-7 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">{children}</table>
              </div>
            ),
            th: ({ children }) => <th className="border border-stone-300 bg-stone-100 px-3 py-2 font-bold">{children}</th>,
            td: ({ children }) => <td className="border border-stone-300 px-3 py-2">{children}</td>,
          }}
        >
          {note.body}
        </ReactMarkdown>
      </div>

      {note.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-stone-200 pt-8">
          {note.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-stone-500">
              <Tag className="h-3 w-3" /> {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  </div>
);

const ResearchArticle = ({ post, onBack }: { post: Abstract; onBack: () => void }) => {
  const [copiedCitation, setCopiedCitation] = useState<'chicago' | 'bibtex' | null>(null);

  const copyCitation = async (value: string, type: 'chicago' | 'bibtex') => {
    await navigator.clipboard.writeText(value);
    setCopiedCitation(type);
    window.setTimeout(() => setCopiedCitation(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-stone-900">
      <div className="sticky top-14 z-30 border-b border-stone-200 bg-[#fbfaf7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-stone-600 hover:bg-stone-100 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Research Hub
          </button>
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 sm:inline">
            {post.conference}
          </span>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <header className="mb-10 border-b border-stone-200 pb-9">
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] font-bold uppercase tracking-wide text-amber-700">
            <span>{post.type}</span>
            <span className="text-stone-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-stone-500">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-stone-950 sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 font-serif text-xl leading-relaxed text-stone-600">{post.summary}</p>

          <div className="mt-7 grid gap-3 border-l-2 border-amber-500 pl-4 text-sm text-stone-600 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="font-semibold text-stone-900">{post.authors}</div>
              <div className="mt-1 text-xs leading-relaxed text-stone-500">{post.institutions}</div>
            </div>
            <div className="flex items-start gap-1.5 font-mono text-xs text-stone-500 sm:justify-self-end">
              <MapPin className="mt-0.5 h-3.5 w-3.5" />
              {post.location}
            </div>
          </div>
        </header>

        <div className="space-y-7 font-serif text-lg leading-[1.82] text-stone-700">
          {post.fullText.map((paragraph, index) => (
            <p
              key={`${post.id}-paragraph-${index}`}
              className={index === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-stone-950' : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section className="my-12 border-y border-stone-200 bg-white px-5 py-7 sm:px-7" aria-labelledby="findings-heading">
          <h2 id="findings-heading" className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-stone-800">
            Key findings
          </h2>
          <ol className="space-y-5">
            {post.keyFindings.map((finding, index) => (
              <li key={`${post.id}-finding-${index}`} className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-relaxed text-stone-600">
                <span className="font-mono text-xs font-bold text-amber-700">0{index + 1}</span>
                <span>{finding}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-stone-500">
              <Tag className="h-3 w-3" /> {tag}
            </span>
          ))}
        </div>

        <section className="space-y-4 border-t border-stone-200 pt-9" aria-labelledby="citation-heading">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-stone-400" />
            <h2 id="citation-heading" className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-stone-700">
              Cite this work
            </h2>
          </div>

          {post.pdfName && (
            <a
              href={`/${post.pdfName}`}
              download={post.pdfName}
              className="flex items-center justify-between border border-stone-800 bg-stone-900 px-4 py-3 text-white hover:bg-stone-800"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Download className="h-4 w-4 flex-shrink-0" />
                <span className="truncate font-mono text-xs">{post.pdfName}</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-stone-300">PDF</span>
            </a>
          )}

          <div className="border border-stone-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-stone-400">Chicago</span>
              <button
                type="button"
                onClick={() => copyCitation(post.citeChicago, 'chicago')}
                className="inline-flex items-center gap-1.5 rounded-sm border border-stone-200 px-2 py-1 font-mono text-[10px] text-stone-500 hover:bg-stone-50"
              >
                {copiedCitation === 'chicago' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                {copiedCitation === 'chicago' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-sm leading-relaxed text-stone-600">{post.citeChicago}</p>
          </div>

          <div className="border border-stone-800 bg-stone-950 p-4 text-stone-200">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-stone-500">BibTeX</span>
              <button
                type="button"
                onClick={() => copyCitation(post.citeBibtex, 'bibtex')}
                className="inline-flex items-center gap-1.5 rounded-sm border border-stone-700 px-2 py-1 font-mono text-[10px] text-stone-400 hover:bg-stone-900 hover:text-white"
              >
                {copiedCitation === 'bibtex' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copiedCitation === 'bibtex' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-stone-300">{post.citeBibtex}</pre>
          </div>
        </section>
      </article>
    </div>
  );
};

const ResearchHub: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Abstract | null>(null);
  const [selectedNote, setSelectedNote] = useState<ResearchNote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSection, setActiveSection] = useState<HubSection>('all');

  const abstractPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return ABSTRACTS.filter((post) => {
      const matchesFilter = activeFilter === 'All' || post.type === activeFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.summary.toLowerCase().includes(normalizedSearch) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const notes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (activeSection === 'abstracts') return [];

    return RESEARCH_NOTES.filter(
      (note) =>
        normalizedSearch.length === 0 ||
        note.title.toLowerCase().includes(normalizedSearch) ||
        note.summary.toLowerCase().includes(normalizedSearch) ||
        note.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch)),
    );
  }, [activeSection, searchTerm]);

  const visibleAbstracts = activeSection === 'notes' ? [] : abstractPosts;

  if (selectedNote) {
    return <NoteArticle note={selectedNote} onBack={() => setSelectedNote(null)} />;
  }

  if (selectedPost) {
    return <ResearchArticle post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-stone-900">
      <header className="border-b border-stone-300 bg-[#eee7d8]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-amber-800">
            <BookOpen className="h-4 w-4" />
            Notes, abstracts, and papers
          </div>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-stone-950 sm:text-6xl">Research Hub</h1>
          <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-stone-600">
            Conference work and research writing, organized as a readable publication stream.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <nav aria-label="Research Hub sections" className="mb-8 flex border-b border-stone-300">
          {([
            ['all', 'All writing', RESEARCH_NOTES.length + ABSTRACTS.length],
            ['notes', 'Notes', RESEARCH_NOTES.length],
            ['abstracts', 'Abstracts & papers', ABSTRACTS.length],
          ] as const).map(([section, label, count]) => (
            <button
              key={section}
              type="button"
              onClick={() => {
                setActiveSection(section);
                setActiveFilter('All');
              }}
              className={`border-b-2 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wide transition-colors sm:px-5 ${
                activeSection === section
                  ? 'border-amber-700 text-stone-950'
                  : 'border-transparent text-stone-500 hover:border-stone-400 hover:text-stone-800'
              }`}
            >
              {label} <span className="ml-1 text-stone-400">{count}</span>
            </button>
          ))}
        </nav>

        <div className="mb-9 flex flex-col gap-4 border-b border-stone-300 pb-6 sm:flex-row sm:items-center sm:justify-between">
          {activeSection !== 'notes' ? (
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide transition-colors ${
                    activeFilter === filter
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-300 bg-[#fbfaf7] text-stone-600 hover:border-stone-500'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          ) : (
            <a
              href={GITHUB_NEW_NOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start border border-stone-900 bg-stone-900 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wide text-white hover:bg-stone-700"
            >
              <Github className="h-4 w-4" />
              Add a note in GitHub
            </a>
          )}

          <label className="relative block w-full sm:w-72">
            <span className="sr-only">Search research posts</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search the research hub"
              className="w-full rounded-sm border border-stone-300 bg-[#fbfaf7] py-2.5 pl-9 pr-3 text-sm text-stone-800 outline-none placeholder:text-stone-400 focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
            />
          </label>
        </div>

        <div className="grid gap-5">
          {notes.map((note, index) => (
            <article key={note.slug} className="group border border-stone-300 bg-[#fbfaf7] shadow-[0_4px_14px_rgba(57,45,29,0.06)] transition-all hover:-translate-y-0.5 hover:border-amber-700 hover:shadow-[0_8px_24px_rgba(57,45,29,0.1)]">
              <button
                type="button"
                onClick={() => {
                  setSelectedNote(note);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="grid w-full gap-6 p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-700 sm:grid-cols-[130px_1fr_auto] sm:items-start sm:p-8"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800">
                    {index === 0 ? 'Latest note' : 'Note'}
                  </div>
                  <div className="mt-2 font-mono text-[10px] leading-relaxed text-stone-400">{note.date}</div>
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold leading-tight text-stone-950 transition-colors group-hover:text-amber-800 sm:text-3xl">
                    {note.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">{note.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-wide text-stone-400">
                        #{tag.replace(/\s+/g, '-')}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 self-end whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-wide text-stone-700 sm:self-center">
                  Read note <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </article>
          ))}

          {visibleAbstracts.map((post, index) => (
            <article key={post.id} className="group border border-stone-300 bg-[#fbfaf7] shadow-[0_4px_14px_rgba(57,45,29,0.06)] transition-all hover:-translate-y-0.5 hover:border-amber-700 hover:shadow-[0_8px_24px_rgba(57,45,29,0.1)]">
              <button
                type="button"
                onClick={() => {
                  setSelectedPost(post);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="grid w-full gap-6 p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-700 sm:grid-cols-[130px_1fr_auto] sm:items-start sm:p-8"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800">
                    {index === 0 && notes.length === 0 ? 'Latest abstract' : 'Abstract'}
                  </div>
                  <div className="mt-2 font-mono text-xs font-bold text-stone-700">{post.conference}</div>
                  <div className="mt-1 font-mono text-[10px] leading-relaxed text-stone-400">{post.date}</div>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold leading-tight text-stone-950 transition-colors group-hover:text-amber-800 sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">{post.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-wide text-stone-400">
                        #{tag.replace(/\s+/g, '-')}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 self-end whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-wide text-stone-700 sm:self-center">
                  Read post <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </article>
          ))}

          {notes.length === 0 && visibleAbstracts.length === 0 && activeSection === 'notes' && searchTerm.trim().length === 0 && (
            <div className="border border-dashed border-stone-300 bg-[#fbfaf7] px-6 py-14 text-center">
              <NotebookPen className="mx-auto mb-4 h-7 w-7 text-amber-700" />
              <h2 className="font-serif text-2xl font-bold text-stone-900">The Notes shelf is ready.</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-600">
                Add a Markdown file to <code className="font-mono text-xs">content/notes</code> in GitHub. It will appear here automatically after the site rebuilds.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={GITHUB_NEW_NOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-stone-900 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wide text-white hover:bg-stone-700"
                >
                  <Github className="h-4 w-4" /> Add the first note
                </a>
                <a
                  href={GITHUB_NOTES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-stone-300 bg-white px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wide text-stone-700 hover:border-stone-500"
                >
                  Open Notes folder
                </a>
              </div>
            </div>
          )}

          {notes.length === 0 && visibleAbstracts.length === 0 && (activeSection !== 'notes' || searchTerm.trim().length > 0) && (
            <div className="border border-dashed border-stone-300 bg-[#fbfaf7] px-6 py-14 text-center">
              <FileText className="mx-auto mb-3 h-6 w-6 text-stone-400" />
              <p className="font-serif text-lg text-stone-600">No posts match that search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResearchHub;
