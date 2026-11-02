import React from 'react';
import DocxArtifactReader from '../ecoverses/iris/record/DocxArtifactReader';
import { AUTHOR_NOTE } from '../content/authorNote';

const AuthorNotePage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="author-note-reader">
  <DocxArtifactReader
    document={AUTHOR_NOTE}
    documents={[AUTHOR_NOTE]}
    onBack={onBack}
    onSelectDocument={() => undefined}
    backLabel="Back to Data Acorns"
  />
  </div>
);

export default AuthorNotePage;
