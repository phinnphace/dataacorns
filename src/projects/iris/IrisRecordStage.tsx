import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, FileText, Folder, Maximize2 } from 'lucide-react';
import ArtifactFolderView from './ArtifactFolderView';
import DocxArtifactReader from './DocxArtifactReader';
import {
  artifactUrl,
  artifactFolders,
  recordDocuments,
  type ArtifactFolder,
  type RecordDocument,
} from './recordManifest';

type IrisRecordStageProps = {
  onBack: () => void;
};

const IrisRecordStage: React.FC<IrisRecordStageProps> = ({ onBack }) => {
  const [activeDocument, setActiveDocument] = useState<RecordDocument | null>(null);
  const [activeFolder, setActiveFolder] = useState<ArtifactFolder | null>(null);

  const openDocument = (document: RecordDocument) => {
    setActiveDocument(document);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openFolder = (folder: ArtifactFolder) => {
    setActiveFolder(folder);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (activeDocument) {
    return (
      <DocxArtifactReader
        document={activeDocument}
        documents={recordDocuments}
        onBack={() => setActiveDocument(null)}
        onSelectDocument={openDocument}
      />
    );
  }

  if (activeFolder) {
    return <ArtifactFolderView folder={activeFolder} onBack={() => setActiveFolder(null)} />;
  }

  return (
    <motion.div
      initial={{ rotateY: -8, opacity: 0, transformOrigin: 'left center' }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: 8, opacity: 0, transformOrigin: 'left center' }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#fdfbf7] text-[#2c241b]"
    >
      <div className="sticky top-14 z-30 border-b border-[#d4c4a8] bg-[#fdfbf7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 font-mono text-xs sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-sm px-2 py-1.5 font-bold text-[#556b2f] transition-colors hover:bg-[#eee8dc] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
          >
            <ArrowLeft className="h-4 w-4" />
            The Iris Dataset
          </button>
          <span className="text-[#b5a68f]">/</span>
          <span className="font-bold text-[#5c4e3c]">The Record</span>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header className="mb-10 border-b-2 border-double border-[#d4c4a8] pb-9">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#7a694f]">
            <FileText className="h-4 w-4 text-[#556b2f]" />
            D.1–D.6a
          </div>
          <h1 className="mb-4 font-serif text-4xl font-normal text-[#1a1510] sm:text-5xl">The Record</h1>
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-[#5c4e3c] sm:text-xl">
            Seven documents, with their supporting data and receipts retained for direct inspection.
          </p>
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#556b2f]">
            Receipts hold. Exhibits show.
          </p>
        </header>

        <section
          aria-labelledby="orientation-heading"
          className="mb-12 grid items-start gap-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]"
        >
          <figure className="overflow-hidden border border-[#c5b596] bg-white shadow-[0_10px_30px_rgba(60,45,25,0.12)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#ddd1bb] bg-[#f7f3ea] px-4 py-3">
              <figcaption>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7355]">
                  Visual route
                </div>
                <h2 id="orientation-heading" className="font-serif text-xl font-semibold text-[#1a1510]">
                  Fisher flowchart
                </h2>
              </figcaption>
              <a
                href={artifactUrl('receipts/fisher.flowchart.png')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-sm border border-[#cfc2aa] bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wide text-[#5c4e3c] transition-colors hover:bg-[#eee8dc] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Open full size
              </a>
            </div>
            <a
              href={artifactUrl('receipts/fisher.flowchart.png')}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6f7f46] sm:p-4"
              aria-label="Open the Fisher flowchart at full size"
            >
              <img
                src={artifactUrl('receipts/fisher.flowchart.png')}
                alt="Flowchart tracing the distinct branches of the Fisher iris dataset record"
                className="mx-auto max-h-[720px] w-full object-contain"
              />
            </a>
          </figure>

          <aside
            aria-label="How to maybe approach this"
            className="relative mx-2 mt-3 bg-[#fff1a8] px-6 pb-7 pt-9 text-[#332d20] shadow-[5px_8px_18px_rgba(75,58,22,0.20)] before:absolute before:left-1/2 before:top-0 before:h-7 before:w-28 before:-translate-x-1/2 before:-translate-y-2 before:-rotate-2 before:bg-[#e8ddbd]/80 lg:rotate-[0.7deg]"
          >
            <div className="mb-5 border-b border-[#c9b95f] pb-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f6228]">
                A reading note
              </div>
              <h2 className="font-serif text-2xl font-semibold">How to maybe approach this</h2>
            </div>
            <div className="space-y-4 font-serif text-[15px] leading-relaxed">
              <p>
                This is convoluted, and I don’t want to pretend that it is not. It is not ‘hard’ because it is
                complex but it is convoluted. We all learn in different ways, and this is a motherf***er (when I
                write that Docs wants to autocorrect it and make it worse, funnily).
              </p>
              <p>
                I suggest giving a read-through of D6a and the flowchart (I am not a flowchart person. Not at all).
                I made the chart to help, to help keep the ‘arms’ distinct.
              </p>
              <p>
                In my mind, you should just go run iris.data in R and from UCI yourself now that you know this, and
                see for yourself, but this has a million assumptions in it, of course and you should not have to do
                work that I am sharing. That is on me.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDocument(recordDocuments[recordDocuments.length - 1])}
              className="mt-6 inline-flex items-center gap-2 border-b border-[#6f6228] pb-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#51481f] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
            >
              Read D6a first
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <p className="mt-8 -rotate-1 text-right font-serif text-xl italic text-[#675b28]">Here be dragons…</p>
          </aside>
        </section>

        <section aria-labelledby="documents-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7355]">
                Exhibits
              </div>
              <h2 id="documents-heading" className="font-serif text-2xl font-semibold text-[#1a1510]">
                Documents
              </h2>
            </div>
            <p className="hidden max-w-sm text-right font-mono text-[10px] leading-relaxed text-[#867660] sm:block">
              Preview text is quoted verbatim. Open a card to render the untouched DOCX.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recordDocuments.map((document, index) => (
              <motion.button
                key={document.id}
                type="button"
                onClick={() => openDocument(document)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.045 }}
                whileHover={{ y: -3 }}
                className="group flex min-h-[220px] flex-col border border-[#d4c4a8] bg-white p-5 text-left shadow-[0_6px_18px_rgba(60,45,25,0.08)] transition-shadow hover:shadow-[0_10px_28px_rgba(60,45,25,0.13)] focus:outline-none focus:ring-2 focus:ring-[#6f7f46] focus:ring-offset-2"
              >
                <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#e5ddcb] pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#556b2f]">
                    {document.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#9a886e] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold leading-snug text-[#1a1510]">
                  {document.title}
                </h3>
                <blockquote className="mb-5 flex-grow border-l-2 border-[#c7b58f] pl-3 text-sm leading-relaxed text-[#5c4e3c]">
                  {document.preview}
                </blockquote>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-[#8b7a62]">
                  <span>Original DOCX</span>
                  <span>{document.size}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section aria-labelledby="folders-heading" className="mt-12">
          <div className="mb-5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7355]">
              Supporting files
            </div>
            <h2 id="folders-heading" className="font-serif text-2xl font-semibold text-[#1a1510]">
              Folders
            </h2>
          </div>

          <div className="overflow-hidden rounded-md border border-[#aaa8a3] bg-[#f1f1f1] font-sans shadow-sm">
            <div className="grid grid-cols-[minmax(0,1fr)_90px] border-b border-[#c7c7c7] bg-[#e5e5e5] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#666] sm:grid-cols-[minmax(0,1fr)_120px]">
              <span>Name</span>
              <span>Items</span>
            </div>
            {artifactFolders.map((folder) => (
              <button
                key={folder.id}
                type="button"
                onClick={() => openFolder(folder)}
                className="grid w-full grid-cols-[minmax(0,1fr)_90px] items-center border-b border-[#d5d5d5] px-4 py-3 text-left text-sm last:border-b-0 hover:bg-[#e8f1fb] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#5577aa] sm:grid-cols-[minmax(0,1fr)_120px]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Folder className="h-6 w-6 flex-shrink-0 fill-[#e2a83a] text-[#bb8121]" />
                  <span className="truncate text-[#242424]">{folder.name}</span>
                </span>
                <span className="text-xs text-[#707070]">{folder.files.length} items</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default IrisRecordStage;
