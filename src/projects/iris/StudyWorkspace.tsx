import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ExternalLink,
  File,
  Folder,
  Grip,
  LayoutGrid,
  List,
  Maximize2,
  Minimize2,
  RotateCcw,
  Undo2,
  Workflow,
} from 'lucide-react';
import {
  artifactUrl,
  type ArtifactFolder,
  type RecordDocument,
} from './recordManifest';
import {
  FLOWCHART_ID,
  folderFileId,
  type StudyView,
  type WorkspacePosition,
  type useIrisStudySession,
} from './useIrisStudySession';

const DESK_WIDTH = 1060;
const DESK_HEIGHT = 980;

type StudySession = ReturnType<typeof useIrisStudySession>;

type StudyWorkspaceProps = {
  session: StudySession;
  folders: ArtifactFolder[];
  onOpenDocument: (document: RecordDocument) => void;
  onOpenFolder: (folder: ArtifactFolder) => void;
};

type MovableItemProps = {
  id: string;
  label: string;
  position: WorkspacePosition;
  width: number;
  height: number;
  onMove: (id: string, position: WorkspacePosition) => void;
  children: React.ReactNode;
  className?: string;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.max(minimum, Math.min(maximum, value));

const MovableItem: React.FC<MovableItemProps> = ({
  id,
  label,
  position,
  width,
  height,
  onMove,
  children,
  className = '',
}) => {
  const [draftPosition, setDraftPosition] = useState(position);
  const [dragging, setDragging] = useState(false);

  useEffect(() => setDraftPosition(position), [position]);

  const commitPosition = (nextPosition: WorkspacePosition) => {
    const clamped = {
      x: clamp(nextPosition.x, 0, DESK_WIDTH - width),
      y: clamp(nextPosition.y, 0, DESK_HEIGHT - height),
    };
    setDraftPosition(clamped);
    onMove(id, clamped);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const handle = event.currentTarget;
    const startPointer = { x: event.clientX, y: event.clientY };
    const startPosition = draftPosition;
    handle.setPointerCapture(event.pointerId);
    setDragging(true);

    const move = (moveEvent: PointerEvent) => {
      setDraftPosition({
        x: clamp(startPosition.x + moveEvent.clientX - startPointer.x, 0, DESK_WIDTH - width),
        y: clamp(startPosition.y + moveEvent.clientY - startPointer.y, 0, DESK_HEIGHT - height),
      });
    };

    const finish = (finishEvent: PointerEvent) => {
      if (handle.hasPointerCapture(finishEvent.pointerId)) {
        handle.releasePointerCapture(finishEvent.pointerId);
      }
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', finish);
      handle.removeEventListener('pointercancel', finish);
      setDragging(false);
      commitPosition({
        x: startPosition.x + finishEvent.clientX - startPointer.x,
        y: startPosition.y + finishEvent.clientY - startPointer.y,
      });
    };

    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', finish);
    handle.addEventListener('pointercancel', finish);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const amount = event.shiftKey ? 48 : 12;
    const offsets: Partial<Record<string, WorkspacePosition>> = {
      ArrowLeft: { x: -amount, y: 0 },
      ArrowRight: { x: amount, y: 0 },
      ArrowUp: { x: 0, y: -amount },
      ArrowDown: { x: 0, y: amount },
    };
    const offset = offsets[event.key];
    if (!offset) return;
    event.preventDefault();
    commitPosition({ x: draftPosition.x + offset.x, y: draftPosition.y + offset.y });
  };

  return (
    <article
      className={`absolute overflow-hidden border bg-white shadow-[0_8px_22px_rgba(60,45,25,0.12)] ${
        dragging ? 'z-30 border-[#6f7f46] shadow-[0_16px_38px_rgba(60,45,25,0.2)]' : 'z-10 border-[#d4c4a8]'
      } ${className}`}
      style={{ left: draftPosition.x, top: draftPosition.y, width }}
    >
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className="flex w-full touch-none cursor-grab items-center gap-2 border-b border-[#ddd1bb] bg-[#f7f3ea] px-3 py-2 text-left font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b5a43] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6f7f46] active:cursor-grabbing"
        aria-label={`Move ${label}. Use arrow keys for precise movement; hold Shift for larger steps.`}
      >
        <Grip className="h-3.5 w-3.5" aria-hidden="true" />
        Move
      </button>
      {children}
    </article>
  );
};

const ViewButton: React.FC<{
  view: StudyView;
  currentView: StudyView;
  onSelect: (view: StudyView) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ view, currentView, onSelect, icon, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={currentView === view}
    onClick={() => onSelect(view)}
    className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[11px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#6f7f46] ${
      currentView === view
        ? 'border-[#556b2f] bg-[#556b2f] text-white'
        : 'border-[#cfc2aa] bg-white text-[#5c4e3c] hover:bg-[#f2ede3]'
    }`}
  >
    {icon}
    {children}
  </button>
);

const FolderShelf: React.FC<{
  folders: ArtifactFolder[];
  checkedOutFileIds: string[];
  onOpenFolder: (folder: ArtifactFolder) => void;
}> = ({ folders, checkedOutFileIds, onOpenFolder }) => (
  <section aria-labelledby="source-folders-heading" className="mt-8">
    <div className="mb-3 flex items-end justify-between gap-4">
      <div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7355]">
          Canonical homes
        </div>
        <h3 id="source-folders-heading" className="font-serif text-xl font-semibold text-[#1a1510]">
          Supporting folders
        </h3>
      </div>
      <p className="max-w-md text-right font-mono text-[10px] leading-relaxed text-[#867660]">
        Files placed on the desk remain in—and always return to—their folder.
      </p>
    </div>

    <div className="overflow-hidden rounded-md border border-[#aaa8a3] bg-[#f1f1f1] font-sans shadow-sm">
      <div className="grid grid-cols-[minmax(0,1fr)_90px_100px] border-b border-[#c7c7c7] bg-[#e5e5e5] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#666]">
        <span>Name</span>
        <span>Items</span>
        <span>On desk</span>
      </div>
      {folders.map((folder) => {
        const onDesk = folder.files.filter((file) =>
          checkedOutFileIds.includes(folderFileId(folder.id, file.fileName)),
        ).length;

        return (
          <button
            key={folder.id}
            type="button"
            onClick={() => onOpenFolder(folder)}
            className="grid w-full grid-cols-[minmax(0,1fr)_90px_100px] items-center border-b border-[#d5d5d5] px-4 py-3 text-left text-sm last:border-b-0 hover:bg-[#e8f1fb] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#5577aa]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <Folder className="h-6 w-6 flex-shrink-0 fill-[#e2a83a] text-[#bb8121]" />
              <span className="truncate text-[#242424]">{folder.name}</span>
            </span>
            <span className="text-xs text-[#707070]">{folder.files.length}</span>
            <span className="text-xs text-[#707070]">{onDesk}</span>
          </button>
        );
      })}
    </div>
  </section>
);

const StudyWorkspace: React.FC<StudyWorkspaceProps> = ({
  session,
  folders,
  onOpenDocument,
  onOpenFolder,
}) => {
  const {
    state,
    orderedDocuments,
    checkedOutFiles,
    setView,
    setPosition,
    moveExhibit,
    returnFile,
    setFlowchartSize,
    setRememberOnDevice,
    reset,
  } = session;

  const chartUrl = artifactUrl('receipts/fisher.flowchart.png');
  const chartWidth = state.flowchartSize === 'wide' ? 560 : 440;
  const chartHeight = state.flowchartSize === 'wide' ? 650 : 590;
  const deskFileIds = [folderFileId('receipts', 'fisher.flowchart.png'), ...state.checkedOutFileIds];

  return (
    <section aria-labelledby="study-session-heading">
      <div className="mb-5 border-y border-[#d4c4a8] bg-[#f7f3ea] px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7355]">
              Your study session
            </div>
            <h2 id="study-session-heading" className="font-serif text-2xl font-semibold text-[#1a1510]">
              Start anywhere. Rearrange as your understanding changes.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Study views">
            <ViewButton
              view="desk"
              currentView={state.view}
              onSelect={setView}
              icon={<LayoutGrid className="h-4 w-4" />}
            >
              Arrange
            </ViewButton>
            <ViewButton
              view="list"
              currentView={state.view}
              onSelect={setView}
              icon={<List className="h-4 w-4" />}
            >
              Titles
            </ViewButton>
            <ViewButton
              view="chart"
              currentView={state.view}
              onSelect={setView}
              icon={<Workflow className="h-4 w-4" />}
            >
              Flowchart
            </ViewButton>
          </div>
        </div>

        <div className="mt-4 border-t border-[#ddd1bb] pt-4">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
            Why this works this way
          </div>
          <p className="mt-2 max-w-4xl font-serif text-[15px] leading-relaxed text-[#5c4e3c] sm:text-base">
            This information is not complex but it is convoluted. Trying to present this has caused me to reflect
            on how we all do better with different presentations of information. How it is ordered, in what
            format/medium, etc. This is one initial attempt at information autonomy. You get to mess with the order
            that makes the most sense to you. You don't need to clean up after yourself. The system will reset. I
            don't know if this is better. I hope it is moving in that direction.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-[#ddd1bb] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-[#665947]">
            These controls change only your view. The exhibits, links, receipts, and folder contents remain untouched.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] font-bold text-[#5c4e3c]">
              <input
                type="checkbox"
                checked={state.rememberOnDevice}
                onChange={(event) => setRememberOnDevice(event.target.checked)}
                className="h-4 w-4 accent-[#556b2f]"
              />
              Remember on this device
            </label>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 border border-[#cfc2aa] bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wide text-[#5c4e3c] hover:bg-[#eee8dc] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset session
            </button>
          </div>
        </div>
      </div>

      {state.view === 'desk' && (
        <div>
          <p className="mb-3 font-mono text-[10px] leading-relaxed text-[#7a694f]">
            Drag by the Move bar. With the Move bar focused, use arrow keys—or Shift plus an arrow key—for precise placement.
          </p>
          <div className="overflow-x-auto border border-[#c5b596] bg-[#eee9df] p-3 shadow-inner">
            <div
              className="relative mx-auto bg-[#fdfbf7] shadow-[inset_0_0_0_1px_rgba(197,181,150,0.7)]"
              style={{ width: DESK_WIDTH, height: DESK_HEIGHT }}
            >
              <MovableItem
                id={FLOWCHART_ID}
                label="Fisher flowchart"
                position={state.positions[FLOWCHART_ID] ?? { x: 24, y: 24 }}
                width={chartWidth}
                height={chartHeight}
                onMove={setPosition}
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
                      Visual exhibit
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#1a1510]">Fisher flowchart</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFlowchartSize(state.flowchartSize === 'wide' ? 'compact' : 'wide')}
                    className="rounded-sm border border-[#cfc2aa] p-2 text-[#5c4e3c] hover:bg-[#eee8dc] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
                    aria-label={state.flowchartSize === 'wide' ? 'Make flowchart compact' : 'Enlarge flowchart'}
                  >
                    {state.flowchartSize === 'wide' ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <a
                  href={chartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-y border-[#e2d8c5] bg-white p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6f7f46]"
                >
                  <img
                    src={chartUrl}
                    alt="Flowchart tracing the distinct branches of the Fisher iris dataset record"
                    className={`mx-auto w-full object-contain ${
                      state.flowchartSize === 'wide' ? 'max-h-[505px]' : 'max-h-[445px]'
                    }`}
                  />
                </a>
                <a
                  href={chartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wide text-[#556b2f] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6f7f46]"
                >
                  Open full size
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </MovableItem>

              {orderedDocuments.map((document) => (
                <MovableItem
                  key={document.id}
                  id={document.id}
                  label={document.title}
                  position={state.positions[document.id] ?? { x: 500, y: 24 }}
                  width={250}
                  height={180}
                  onMove={setPosition}
                >
                  <div className="flex h-[154px] flex-col p-4">
                    <h3 className="font-serif text-lg font-semibold leading-snug text-[#1a1510]">
                      {document.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-grow text-xs leading-relaxed text-[#665947]">
                      {document.preview}
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenDocument(document)}
                      className="mt-3 inline-flex items-center gap-2 self-start font-mono text-[10px] font-bold uppercase tracking-wide text-[#556b2f] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Read full text
                    </button>
                  </div>
                </MovableItem>
              ))}

              {checkedOutFiles.map(({ id, folder, file }) => (
                <MovableItem
                  key={id}
                  id={id}
                  label={file.fileName}
                  position={state.positions[id] ?? { x: 50, y: 690 }}
                  width={270}
                  height={145}
                  onMove={setPosition}
                  className="border-[#aaa8a3] font-sans"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <File className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#686868]" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[#242424]" title={file.fileName}>
                          {file.fileName}
                        </div>
                        <div className="mt-1 text-xs text-[#707070]">From {folder.name}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <a
                        href={artifactUrl(`${folder.id}/${file.fileName}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315f8c] focus:outline-none focus:ring-2 focus:ring-[#5577aa]"
                      >
                        Open
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => returnFile(folder, file)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#555] focus:outline-none focus:ring-2 focus:ring-[#5577aa]"
                      >
                        <Undo2 className="h-3.5 w-3.5" />
                        Return
                      </button>
                    </div>
                  </div>
                </MovableItem>
              ))}
            </div>
          </div>
        </div>
      )}

      {state.view === 'list' && (
        <div className="border border-[#d4c4a8] bg-white">
          <div className="grid grid-cols-[minmax(0,1fr)_92px] border-b border-[#ddd1bb] bg-[#f7f3ea] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a694f]">
            <span>Exhibit title</span>
            <span>Your order</span>
          </div>
          {orderedDocuments.map((document, index) => (
            <div
              key={document.id}
              className="grid grid-cols-[minmax(0,1fr)_92px] items-center gap-3 border-b border-[#e5ddcb] p-4 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => onOpenDocument(document)}
                className="min-w-0 text-left focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
              >
                <h3 className="font-serif text-xl font-semibold text-[#1a1510]">{document.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#665947]">{document.preview}</p>
                <span className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide text-[#556b2f]">
                  <BookOpen className="h-3.5 w-3.5" />
                  Read full text
                </span>
              </button>
              <div className="flex justify-end gap-1">
                <button
                  type="button"
                  onClick={() => moveExhibit(document.id, -1)}
                  disabled={index === 0}
                  className="rounded-sm border border-[#cfc2aa] p-2 text-[#5c4e3c] hover:bg-[#eee8dc] focus:outline-none focus:ring-2 focus:ring-[#6f7f46] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Move ${document.title} earlier`}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveExhibit(document.id, 1)}
                  disabled={index === orderedDocuments.length - 1}
                  className="rounded-sm border border-[#cfc2aa] p-2 text-[#5c4e3c] hover:bg-[#eee8dc] focus:outline-none focus:ring-2 focus:ring-[#6f7f46] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Move ${document.title} later`}
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {state.view === 'chart' && (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.75fr)]">
          <figure className="overflow-hidden border border-[#c5b596] bg-white shadow-[0_10px_30px_rgba(60,45,25,0.12)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#ddd1bb] bg-[#f7f3ea] px-4 py-3">
              <figcaption>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7355]">
                  Visual study view
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1a1510]">Fisher flowchart</h3>
              </figcaption>
              <a
                href={chartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-shrink-0 items-center gap-2 border border-[#cfc2aa] bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wide text-[#5c4e3c] hover:bg-[#eee8dc] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Open full size
              </a>
            </div>
            <a href={chartUrl} target="_blank" rel="noopener noreferrer" className="block bg-white p-3">
              <img
                src={chartUrl}
                alt="Flowchart tracing the distinct branches of the Fisher iris dataset record"
                className="mx-auto max-h-[880px] w-full object-contain"
              />
            </a>
          </figure>

          <div className="border border-[#d4c4a8] bg-white p-4">
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
              Open alongside the chart
            </div>
            <div className="space-y-2">
              {orderedDocuments.map((document) => (
                <button
                  key={document.id}
                  type="button"
                  onClick={() => onOpenDocument(document)}
                  className="flex w-full items-start gap-2 border-b border-[#e5ddcb] px-1 py-3 text-left font-serif text-base font-semibold leading-snug text-[#2c241b] last:border-b-0 hover:text-[#556b2f] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
                >
                  <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#556b2f]" />
                  {document.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <FolderShelf
        folders={folders}
        checkedOutFileIds={deskFileIds}
        onOpenFolder={onOpenFolder}
      />
    </section>
  );
};

export default StudyWorkspace;
