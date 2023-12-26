import { EditorContainer } from "~/features/editor";

type Props = {
  params: {
    documentId: string;
  };
};

export default function WorkspacePage({ params: { documentId } }: Props) {
  return <EditorContainer documentId={documentId} />;
}
