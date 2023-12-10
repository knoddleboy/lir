import type { Metadata } from "next";

type Props = {
  params: { documentId: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: params.documentId,
  };
}

export default function WorkspacePage({ params: { documentId } }: Props) {
  return <div></div>;
}
