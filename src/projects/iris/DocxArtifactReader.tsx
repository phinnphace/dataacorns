import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  LoaderCircle,
} from 'lucide-react';
import { artifactUrl, type RecordDocument } from './recordManifest';

type DocxArtifactReaderProps = {
  document: RecordDocument;
  documents: RecordDocument[];
  onBack: () => void;
  onSelectDocument: (document: RecordDocument) => void;
};

const DocxArtifactReader: React.FC<DocxArtifactReaderProps> = ({
  document,
  documents,
  onBack,
  onSelectDocument,
}) => {
  const documentRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const sourceUrl = artifactUrl(document.fileName);
  const documentIndex = documents.findIndex((item) => item.id === document.id);
  const previousDocument = documentIndex > 0 ? documents[documentIndex - 1] : null;
  const nextDocument = documentIndex < documents.length - 1 ? documents[documentIndex + 1] : null;

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;

    const renderDocument = async () => {
      setStatus('loading');

      try {
        const [response, { renderAsync }, { default: JSZip }] = await Promise.all([
          fetch(sourceUrl, { signal: controller.signal }),
          import('docx-preview'),
          import('jszip'),
        ]);
        if (!response.ok) {
          throw new Error(`Unable to load ${document.fileName}`);
        }

        const sourceBytes = await response.arrayBuffer();
        if (disposed || !documentRef.current || !styleRef.current) return;

        // Some Google Docs exports wrap visible content in locked OOXML content
        // controls (<w:sdt>). Browser DOCX renderers commonly skip those nodes.
        // Expand the wrappers in an in-memory copy used only for display; the
        // stored and downloadable DOCX remains byte-for-byte untouched.
        const sourceArchive = await JSZip.loadAsync(sourceBytes);
        const documentXmlFile = sourceArchive.file('word/document.xml');
        let viewerBytes: ArrayBuffer | Uint8Array = sourceBytes;

        if (documentXmlFile) {
          const sourceXml = await documentXmlFile.async('string');
          let expandedXml = sourceXml;
          const structuredDocumentTag = /<w:sdt(?:\s[^>]*)?>\s*<w:sdtPr(?:\s[^>]*)?>[\s\S]*?<\/w:sdtPr>\s*(?:<w:sdtEndPr(?:\s[^>]*)?>[\s\S]*?<\/w:sdtEndPr>\s*)?<w:sdtContent>([\s\S]*?)<\/w:sdtContent>\s*<\/w:sdt>/g;

          while (structuredDocumentTag.test(expandedXml)) {
            structuredDocumentTag.lastIndex = 0;
            expandedXml = expandedXml.replace(structuredDocumentTag, '$1');
            structuredDocumentTag.lastIndex = 0;
          }

          if (expandedXml !== sourceXml) {
            sourceArchive.file('word/document.xml', expandedXml);
            viewerBytes = await sourceArchive.generateAsync({
              type: 'uint8array',
              compression: 'DEFLATE',
            });
          }
        }

        documentRef.current.replaceChildren();
        styleRef.current.replaceChildren();

        await renderAsync(viewerBytes, documentRef.current, styleRef.current, {
          inWrapper: true,
          breakPages: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
          useBase64URL: true,
          renderAltChunks: false,
          experimental: true,
        });

        if (!disposed) setStatus('ready');
      } catch (error) {
        if (!disposed && !(error instanceof DOMException && error.name === 'AbortError')) {
          setStatus('error');
        }
      }
    };

    renderDocument();

    return () => {
      disposed = true;
      controller.abort();
      documentRef.current?.replaceChildren();
      styleRef.current?.replaceChildren();
    };
  }, [document.fileName, sourceUrl]);

  return (
    <div className="min-h-screen bg-[#e9e5dc] text-[#1a1510]">
      <div className="sticky top-14 z-40 border-b border-[#b9ae9a] bg-[#fdfbf7]/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex flex-shrink-0 items-center gap-2 rounded-sm border border-[#cfc2aa] bg-white px-3 py-2 font-mono text-xs font-bold uppercase tracking-wide text-[#5c4e3c] transition-colors hover:bg-[#f2ede3] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
              >
                <ArrowLeft className="h-4 w-4" />
                The Record
              </button>
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b6b55]">
                  {document.label} · Original DOCX
                </div>
                <h1 className="truncate font-serif text-lg font-semibold text-[#1a1510] sm:text-xl">
                  {document.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-11 lg:pl-0">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-[#cfc2aa] bg-white px-3 py-2 font-mono text-xs font-bold text-[#5c4e3c] transition-colors hover:bg-[#f2ede3] focus:outline-none focus:ring-2 focus:ring-[#6f7f46]"
              >
                <ExternalLink className="h-4 w-4" />
                Open original
              </a>
              <a
                href={sourceUrl}
                download={document.fileName}
                className="inline-flex items-center gap-2 rounded-sm bg-[#556b2f] px-3 py-2 font-mono text-xs font-bold text-white transition-colors hover:bg-[#435524] focus:outline-none focus:ring-2 focus:ring-[#6f7f46] focus:ring-offset-2"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-[#ddd1bb] pt-3">
            <button
              type="button"
              onClick={() => previousDocument && onSelectDocument(previousDocument)}
              disabled={!previousDocument}
              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#cfc2aa] bg-white text-[#5c4e3c] transition-colors hover:bg-[#f2ede3] focus:outline-none focus:ring-2 focus:ring-[#6f7f46] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label={previousDocument ? `Previous exhibit: ${previousDocument.label}` : 'No previous exhibit'}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              role="radiogroup"
              aria-label="Document exhibits"
              className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1"
            >
              {documents.map((item) => {
                const isActive = item.id === document.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    aria-label={`${item.label}: ${item.title}`}
                    onClick={() => onSelectDocument(item)}
                    className={`inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#6f7f46] ${
                      isActive
                        ? 'border-[#556b2f] bg-[#556b2f] text-white'
                        : 'border-[#cfc2aa] bg-white text-[#5c4e3c] hover:bg-[#f2ede3]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full border ${
                        isActive ? 'border-white bg-white' : 'border-[#8d7c63] bg-transparent'
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => nextDocument && onSelectDocument(nextDocument)}
              disabled={!nextDocument}
              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#cfc2aa] bg-white text-[#5c4e3c] transition-colors hover:bg-[#f2ede3] focus:outline-none focus:ring-2 focus:ring-[#6f7f46] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label={nextDocument ? `Next exhibit: ${nextDocument.label}` : 'No next exhibit'}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 py-5 sm:px-6 sm:py-8">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-sm border border-[#cfc2aa] bg-[#f8f5ee] px-4 py-3 font-mono text-[11px] text-[#665947]">
          <span>Rendered from the original file. Viewer-only compatibility handling does not rewrite the downloadable DOCX.</span>
          <span className="hidden flex-shrink-0 sm:inline">{document.size}</span>
        </div>

        <div className="docx-reader-shell relative min-h-[70vh] overflow-auto rounded-sm border border-[#b9ae9a] bg-[#d7d2c8] shadow-inner">
          <div ref={styleRef} aria-hidden="true" />

          {status === 'loading' && (
            <div className="absolute inset-0 z-10 flex min-h-[60vh] items-center justify-center bg-[#f4f0e8] text-[#665947]">
              <div className="flex items-center gap-3 font-mono text-sm">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Opening the original document…
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="absolute inset-0 z-10 flex min-h-[60vh] items-center justify-center bg-[#f4f0e8] p-6 text-center">
              <div className="max-w-md">
                <FileText className="mx-auto mb-4 h-10 w-10 text-[#7b6b55]" />
                <h2 className="mb-2 font-serif text-2xl font-semibold">The inline reader could not open this file.</h2>
                <p className="mb-5 text-sm text-[#665947]">
                  The untouched DOCX is still available through the original-file controls above.
                </p>
                <a
                  href={sourceUrl}
                  download={document.fileName}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#556b2f] px-4 py-2 font-mono text-xs font-bold text-white"
                >
                  <Download className="h-4 w-4" />
                  Download original
                </a>
              </div>
            </div>
          )}

          <div ref={documentRef} className="docx-reader-document min-w-fit" />
        </div>
      </div>
    </div>
  );
};

export default DocxArtifactReader;
