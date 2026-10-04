import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react';
import ArtifactFolderView from './ArtifactFolderView';
import DocxArtifactReader from './DocxArtifactReader';
import StudyWorkspace from './StudyWorkspace';
import {
  artifactFolders,
  recordDocuments,
  type ArtifactFolder,
  type RecordDocument,
} from './recordManifest';
import { folderFileId, useIrisStudySession } from './useIrisStudySession';

type IrisRecordStageProps = {
  onBack: () => void;
};

const IrisRecordStage: React.FC<IrisRecordStageProps> = ({ onBack }) => {
  const [activeDocument, setActiveDocument] = useState<RecordDocument | null>(null);
  const [activeFolder, setActiveFolder] = useState<ArtifactFolder | null>(null);
  const session = useIrisStudySession(recordDocuments, artifactFolders);
  const shapePrior = recordDocuments.find((document) => document.id === 'shape-prior');

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
        documents={session.orderedDocuments}
        onBack={() => setActiveDocument(null)}
        onSelectDocument={openDocument}
      />
    );
  }

  if (activeFolder) {
    return (
      <ArtifactFolderView
        folder={activeFolder}
        onBack={() => setActiveFolder(null)}
        checkedOutFileIds={session.state.checkedOutFileIds}
        pinnedFileIds={[folderFileId('receipts', 'fisher.flowchart.png')]}
        onPullOut={(file) => session.checkOutFile(activeFolder, file)}
        onReturn={(file) => session.returnFile(activeFolder, file)}
      />
    );
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
        <header className="mb-8 border-b-2 border-double border-[#d4c4a8] pb-8">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#7a694f]">
            <FileText className="h-4 w-4 text-[#556b2f]" />
            Evidence workspace
          </div>
          <h1 className="mb-4 font-serif text-4xl font-normal text-[#1a1510] sm:text-5xl">The Record</h1>
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-[#5c4e3c] sm:text-xl">
            Seven exhibits, a movable flowchart, and their supporting files—available in the form that helps you
            make sense of them now.
          </p>
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#556b2f]">
            Receipts hold. Exhibits show.
          </p>
        </header>

        <details className="group mb-8 border border-[#c9b95f] bg-[#fff1a8] text-[#332d20] shadow-[4px_6px_14px_rgba(75,58,22,0.16)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6f7f46]">
            <span>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f6228]">
                One possible approach
              </span>
              <span className="font-serif text-xl font-semibold">How to maybe approach this</span>
            </span>
            <span className="font-serif text-base italic text-[#675b28] group-open:hidden">Here be dragons…</span>
            <span className="hidden font-mono text-xs font-bold uppercase text-[#675b28] group-open:inline">Close</span>
          </summary>
          <div className="border-t border-[#c9b95f] px-5 pb-6 pt-5">
            <div className="max-w-4xl space-y-4 font-serif text-[15px] leading-relaxed">
              <p>
                This is convoluted, and I don’t want to pretend that it is not. It is not ‘hard’ because it is
                complex but it is convoluted. We all learn in different ways, and this is a motherf***er (when I
                write that Docs wants to autocorrect it and make it worse, funnily).
              </p>
              <p>
                I suggest giving a read-through of{' '}
                <em>{shapePrior?.title ?? 'The shape prior—the canonical geometry fails the primary'}</em> and the
                flowchart (I am not a flowchart person. Not at all). I made the chart to help, to help keep the
                ‘arms’ distinct.
              </p>
              <p>
                In my mind, you should just go run iris.data in R and from UCI yourself now that you know this, and
                see for yourself, but this has a million assumptions in it, of course and you should not have to do
                work that I am sharing. That is on me.
              </p>
            </div>
            {shapePrior && (
              <button
                type="button"
                onClick={() => openDocument(shapePrior)}
                className="mt-5 inline-flex items-center gap-2 border-b border-[#6f6228] pb-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#51481f] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
              >
                Read this exhibit
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </details>

        <StudyWorkspace
          session={session}
          folders={artifactFolders}
          onOpenDocument={openDocument}
          onOpenFolder={openFolder}
        />
      </main>
    </motion.div>
  );
};

export default IrisRecordStage;
