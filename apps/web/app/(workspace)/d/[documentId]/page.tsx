import type { Metadata } from "next";

type Props = {
  params: { documentId: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: params.documentId.split("-").slice(0, -1).join("-"),
  };
}

export default function WorkspacePage({ params: { documentId } }: Props) {
  return <div>{documentId}</div>;
}
