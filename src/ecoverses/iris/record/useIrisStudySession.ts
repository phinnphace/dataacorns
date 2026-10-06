import { useEffect, useMemo, useState } from 'react';
import type { ArtifactFile, ArtifactFolder, RecordDocument } from './recordManifest';

export type StudyView = 'desk' | 'list' | 'chart';
export type FlowchartSize = 'compact' | 'wide';

export type WorkspacePosition = {
  x: number;
  y: number;
};

type StudySessionState = {
  version: 1;
  view: StudyView;
  exhibitOrder: string[];
  positions: Record<string, WorkspacePosition>;
  checkedOutFileIds: string[];
  flowchartSize: FlowchartSize;
  rememberOnDevice: boolean;
};

const SESSION_KEY = 'iris-study-session-v1';
const DEVICE_KEY = 'iris-study-layout-v1';
const REMEMBER_KEY = 'iris-study-remember-v1';

export const FLOWCHART_ID = 'fisher-flowchart';

export const folderFileId = (folderId: ArtifactFolder['id'], fileName: string) =>
  `folder:${folderId}:${fileName}`;

const defaultPositionForDocument = (index: number): WorkspacePosition => ({
  x: index % 2 === 0 ? 500 : 772,
  y: 24 + Math.floor(index / 2) * 205,
});

const createDefaultState = (documents: RecordDocument[]): StudySessionState => ({
  version: 1,
  view: 'desk',
  exhibitOrder: documents.map((document) => document.id),
  positions: {
    [FLOWCHART_ID]: { x: 24, y: 24 },
    ...Object.fromEntries(
      documents.map((document, index) => [document.id, defaultPositionForDocument(index)]),
    ),
  },
  checkedOutFileIds: [],
  flowchartSize: 'compact',
  rememberOnDevice: false,
});

const isPosition = (value: unknown): value is WorkspacePosition => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<WorkspacePosition>;
  return Number.isFinite(candidate.x) && Number.isFinite(candidate.y);
};

const readStoredState = (key: string): unknown => {
  if (typeof window === 'undefined') return null;

  try {
    const storage = key === SESSION_KEY ? window.sessionStorage : window.localStorage;
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const normalizeState = (
  candidate: unknown,
  documents: RecordDocument[],
  folders: ArtifactFolder[],
  rememberOnDevice: boolean,
): StudySessionState => {
  const defaults = createDefaultState(documents);
  if (!candidate || typeof candidate !== 'object') {
    return { ...defaults, rememberOnDevice };
  }

  const stored = candidate as Partial<StudySessionState>;
  const documentIds = new Set(documents.map((document) => document.id));
  const storedOrder = Array.isArray(stored.exhibitOrder)
    ? stored.exhibitOrder.filter((id): id is string => typeof id === 'string' && documentIds.has(id))
    : [];
  const missingIds = defaults.exhibitOrder.filter((id) => !storedOrder.includes(id));

  const validFileIds = new Set(
    folders.flatMap((folder) => folder.files.map((file) => folderFileId(folder.id, file.fileName))),
  );
  const checkedOutFileIds = Array.isArray(stored.checkedOutFileIds)
    ? stored.checkedOutFileIds.filter(
        (id): id is string => typeof id === 'string' && validFileIds.has(id),
      )
    : [];

  const positions = { ...defaults.positions };
  if (stored.positions && typeof stored.positions === 'object') {
    for (const [id, position] of Object.entries(stored.positions)) {
      if ((documentIds.has(id) || id === FLOWCHART_ID || validFileIds.has(id)) && isPosition(position)) {
        positions[id] = position;
      }
    }
  }

  return {
    version: 1,
    view: stored.view === 'list' || stored.view === 'chart' ? stored.view : 'desk',
    exhibitOrder: [...storedOrder, ...missingIds],
    positions,
    checkedOutFileIds,
    flowchartSize: stored.flowchartSize === 'wide' ? 'wide' : 'compact',
    rememberOnDevice,
  };
};

const findFile = (folders: ArtifactFolder[], id: string) => {
  for (const folder of folders) {
    const file = folder.files.find((candidate) => folderFileId(folder.id, candidate.fileName) === id);
    if (file) return { folder, file };
  }
  return null;
};

export const useIrisStudySession = (
  documents: RecordDocument[],
  folders: ArtifactFolder[],
) => {
  const [state, setState] = useState<StudySessionState>(() => {
    if (typeof window === 'undefined') return createDefaultState(documents);

    let rememberOnDevice = false;
    try {
      rememberOnDevice = window.localStorage.getItem(REMEMBER_KEY) === 'true';
    } catch {
      // Browser storage is optional; the in-memory session remains available.
    }
    const stored = rememberOnDevice
      ? readStoredState(DEVICE_KEY) ?? readStoredState(SESSION_KEY)
      : readStoredState(SESSION_KEY);
    return normalizeState(stored, documents, folders, rememberOnDevice);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
      window.localStorage.setItem(REMEMBER_KEY, String(state.rememberOnDevice));

      if (state.rememberOnDevice) {
        window.localStorage.setItem(DEVICE_KEY, JSON.stringify(state));
      } else {
        window.localStorage.removeItem(DEVICE_KEY);
      }
    } catch {
      // The study session still works in memory when browser storage is unavailable.
    }
  }, [state]);

  const orderedDocuments = useMemo(() => {
    const byId = new Map(documents.map((document) => [document.id, document]));
    return state.exhibitOrder.flatMap((id) => {
      const document = byId.get(id);
      return document ? [document] : [];
    });
  }, [documents, state.exhibitOrder]);

  const checkedOutFiles = useMemo(
    () =>
      state.checkedOutFileIds.flatMap((id) => {
        const match = findFile(folders, id);
        return match ? [{ id, ...match }] : [];
      }),
    [folders, state.checkedOutFileIds],
  );

  const setView = (view: StudyView) => setState((current) => ({ ...current, view }));

  const setPosition = (id: string, position: WorkspacePosition) =>
    setState((current) => ({
      ...current,
      positions: { ...current.positions, [id]: position },
    }));

  const moveExhibit = (id: string, direction: -1 | 1) =>
    setState((current) => {
      const from = current.exhibitOrder.indexOf(id);
      const to = Math.max(0, Math.min(current.exhibitOrder.length - 1, from + direction));
      if (from < 0 || from === to) return current;

      const exhibitOrder = [...current.exhibitOrder];
      const [moved] = exhibitOrder.splice(from, 1);
      exhibitOrder.splice(to, 0, moved);
      return { ...current, exhibitOrder };
    });

  const checkOutFile = (folder: ArtifactFolder, file: ArtifactFile) => {
    const id = folderFileId(folder.id, file.fileName);
    setState((current) => {
      if (current.checkedOutFileIds.includes(id)) return current;
      const checkoutIndex = current.checkedOutFileIds.length;
      return {
        ...current,
        checkedOutFileIds: [...current.checkedOutFileIds, id],
        positions: {
          ...current.positions,
          [id]: current.positions[id] ?? {
            x: 50 + (checkoutIndex % 3) * 300,
            y: 760 + (Math.floor(checkoutIndex / 3) % 4) * 18,
          },
        },
      };
    });
  };

  const returnFile = (folder: ArtifactFolder, file: ArtifactFile) => {
    const id = folderFileId(folder.id, file.fileName);
    setState((current) => {
      const positions = { ...current.positions };
      delete positions[id];
      return {
        ...current,
        checkedOutFileIds: current.checkedOutFileIds.filter((candidate) => candidate !== id),
        positions,
      };
    });
  };

  const setFlowchartSize = (flowchartSize: FlowchartSize) =>
    setState((current) => ({ ...current, flowchartSize }));

  const setRememberOnDevice = (rememberOnDevice: boolean) =>
    setState((current) => ({ ...current, rememberOnDevice }));

  const reset = () =>
    setState((current) => ({
      ...createDefaultState(documents),
      rememberOnDevice: current.rememberOnDevice,
    }));

  return {
    state,
    orderedDocuments,
    checkedOutFiles,
    setView,
    setPosition,
    moveExhibit,
    checkOutFile,
    returnFile,
    setFlowchartSize,
    setRememberOnDevice,
    reset,
  };
};
