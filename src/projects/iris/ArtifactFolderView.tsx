import React from 'react';
import {
  ArrowLeft,
  Download,
  File,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  MoreHorizontal,
} from 'lucide-react';
import { artifactUrl, type ArtifactFile, type ArtifactFolder } from './recordManifest';

type ArtifactFolderViewProps = {
  folder: ArtifactFolder;
  onBack: () => void;
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

const ArtifactFolderView: React.FC<ArtifactFolderViewProps> = ({ folder, onBack }) => (
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
            aria-label="Back to The Record"
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

      <div className="grid grid-cols-[minmax(0,1fr)_90px_44px] border-b border-[#c8c8c8] bg-[#efefef] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b6b6b] sm:grid-cols-[minmax(0,1fr)_120px_80px]">
        <span>Name</span>
        <span>Size</span>
        <span className="sr-only sm:not-sr-only">Get</span>
      </div>

      <ul className="divide-y divide-[#dddddd]">
        {folder.files.map((file) => {
          const sourceUrl = artifactUrl(`${folder.id}/${file.fileName}`);

          return (
            <li
              key={file.fileName}
              className="grid grid-cols-[minmax(0,1fr)_90px_44px] items-center px-4 py-3 text-sm hover:bg-[#e8f1fb] sm:grid-cols-[minmax(0,1fr)_120px_80px]"
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

      <div className="border-t border-[#c8c8c8] bg-[#efefef] px-4 py-2 text-xs text-[#666]">
        {folder.files.length} items
      </div>
    </div>
  </div>
);

export default ArtifactFolderView;
