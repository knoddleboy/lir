import { EditorContainer } from "~/features/editor";
import { extractURIHash } from "~/shared/lib/extract-uri-hash";

type Props = {
  params: {
    documentId: string;
  };
};

export default function WorkspacePage({ params: { documentId } }: Props) {
  const extractedDocumentId = extractURIHash(documentId)!;
  return <EditorContainer documentId={extractedDocumentId} />;
}
