import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  File,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  MoreHorizontal,
  Undo2,
} from 'lucide-react';
import { artifactUrl, type ArtifactFile, type ArtifactFolder } from './recordManifest';
import { folderFileId } from './useIrisStudySession';

type ArtifactFolderViewProps = {
  folder: ArtifactFolder;
  onBack: () => void;
  checkedOutFileIds: string[];
  pinnedFileIds?: string[];
  onPullOut: (file: ArtifactFile) => void;
  onReturn: (file: ArtifactFile) => void;
};

const iconForFile = (file: ArtifactFile) => {
  const className = 'h-5 w-5 flex-shrink-0 text-[#686868]';

  switch (file.kind) {
    case 'image':
      return <FileImage className={className} />;
    case 'pdf':
    case 'text':
      return <FileText className={className} />;
    case 'data':
      return <FileSpreadsheet className={className} />;
    case 'code':
      return <FileCode2 className={className} />;
    default:
      return <File className={className} />;
  }
};

const ArtifactFolderView: React.FC<ArtifactFolderViewProps> = ({
  folder,
  onBack,
  checkedOutFileIds,
  pinnedFileIds = [],
  onPullOut,
  onReturn,
}) => (
  <div className="min-h-screen bg-[#d8d8d8] px-3 py-5 font-sans text-[#202020] sm:px-6 sm:py-9">
    <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-[#a9a9a9] bg-[#f7f7f7] shadow-xl">
      <div className="flex items-center justify-between border-b border-[#b9b9b9] bg-[#e9e9e9] px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="hidden gap-1.5 sm:flex" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded border border-[#bcbcbc] bg-[#f7f7f7] p-1.5 text-[#555] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#5577aa]"
            aria-label="Back to the study session"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold">
          <Folder className="h-5 w-5 flex-shrink-0 fill-[#e2a83a] text-[#bb8121]" />
          <span className="truncate">{folder.name}</span>
        </div>

        <MoreHorizontal className="h-5 w-5 text-[#777]" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_72px_84px_40px] border-b border-[#c8c8c8] bg-[#efefef] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b6b6b] sm:grid-cols-[minmax(0,1fr)_110px_120px_64px]">
        <span>Name</span>
        <span>Size</span>
        <span>Study desk</span>
        <span className="sr-only sm:not-sr-only">Get</span>
      </div>

      <ul className="divide-y divide-[#dddddd]">
        {folder.files.map((file) => {
          const sourceUrl = artifactUrl(`${folder.id}/${file.fileName}`);
          const fileId = folderFileId(folder.id, file.fileName);
          const isPinned = pinnedFileIds.includes(fileId);
          const isOnDesk = isPinned || checkedOutFileIds.includes(fileId);

          return (
            <li
              key={file.fileName}
              className="grid grid-cols-[minmax(0,1fr)_72px_84px_40px] items-center px-4 py-3 text-sm hover:bg-[#e8f1fb] sm:grid-cols-[minmax(0,1fr)_110px_120px_64px]"
            >
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-center gap-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5577aa]"
              >
                {iconForFile(file)}
                <span className="truncate" title={file.fileName}>
                  {file.fileName}
                </span>
              </a>
              <span className="text-xs text-[#707070]">{file.size}</span>
              {isPinned ? (
                <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-[#556b2f]">
                  Exhibit
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => (isOnDesk ? onReturn(file) : onPullOut(file))}
                  className="inline-flex items-center gap-1.5 justify-self-start rounded border border-[#bcbcbc] bg-[#f7f7f7] px-2 py-1.5 text-[11px] font-semibold text-[#555] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#5577aa]"
                  aria-label={isOnDesk ? `Return ${file.fileName} to ${folder.name}` : `Put ${file.fileName} on the study desk`}
                >
                  {isOnDesk ? <Undo2 className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{isOnDesk ? 'Return' : 'Pull out'}</span>
                </button>
              )}
              <a
                href={sourceUrl}
                download={file.fileName}
                className="justify-self-end rounded p-1.5 text-[#666] hover:bg-white hover:text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#5577aa] sm:justify-self-start"
                aria-label={`Download ${file.fileName}`}
              >
                <Download className="h-4 w-4" />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-[#c8c8c8] bg-[#efefef] px-4 py-2 text-xs text-[#666]">
        <span>{folder.files.length} items</span>
        <span>
          {folder.files.filter((file) => {
            const id = folderFileId(folder.id, file.fileName);
            return checkedOutFileIds.includes(id) || pinnedFileIds.includes(id);
          }).length}{' '}
          on the study desk
        </span>
      </div>
    </div>
  </div>
);

export default ArtifactFolderView;
