import { type Node as ProseMirrorNode } from "prosemirror-model";

import { useProseMirror } from "~/entities/editor";

type Props = {
  doc?: ProseMirrorNode;
};

export const ProseEditor = ({ doc }: Props) => {
  const { ref } = useProseMirror(doc);

  return <div ref={ref} />;
};
