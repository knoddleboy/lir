import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Icons,
} from "@lir/ui";

import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { documentApi, documentModel } from "~/entities/document";
import { generateDocumentURL } from "~/shared";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const ImportDocumentDialog = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const documentIdRef = useRef("");

  const { mutateAsync: createDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.createDocument(),
    mutationFn: documentApi.createDocument,
    onSuccess: (data) => {
      documentModel.setDocuments([data]);
      setOpen(false);
      router.push(generateDocumentURL(data.title, data.id));
    },
  });

  const onClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const files = target.files;

    if (!files || files.length < 1) return;

    const file = files[0];

    const sizeInMB = file.size / (1024 * 1024);

    if (sizeInMB > 5) {
      toast.error("File size exceeds the 5 MB limit. Please choose a smaller file.");
      return;
    }

    const name = file.name.split(".");
    name.pop();

    const createdDocument = await createDocument({
      title: name.join("."),
    });
    documentIdRef.current = createdDocument.id;

    const reader = new FileReader();
    reader.addEventListener("load", () => parseTextFile(reader.result as string));

    reader.readAsText(file);
  };

  // const { mutateAsync: createBlock } = useMutation({
  //   mutationKey: blockApi.blockKeys.mutation.createBlock(),
  //   mutationFn: blockApi.createBlock,
  // });

  const parseTextFile = (data: string) => {
    console.log(data);
  };

  // const parseTextFile = async (data: string) => {
  //   const fileBlocks = data.split("\n\n");
  //   const blocks: BlockProps[] = [];
  //   let prevId: BlockProps["id"] | null = null;

  //   for (const fileBlock of fileBlocks) {
  //     const createdBlock = await createBlock({
  //       type: BlockType.Text,
  //       documentId: documentIdRef.current,
  //       prevId,
  //       content: {
  //         title: [[fileBlock]],
  //         formats: {
  //           emphasis: [],
  //           fontSize: 16,
  //         },
  //         alignment: Alignment.Left,
  //         lineSpacing: 1.2,
  //       },
  //     });

  //     prevId = createdBlock.id;
  //     blocks.push(createdBlock);
  //   }

  //   blockModel.setBlocks(blocks);
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>
            Import your documents. Note that you can import files up to <b>5 MB</b>.
          </DialogDescription>
        </DialogHeader>

        <button
          className="_ring bg-accent hover:bg-muted-foreground/10 active:bg-muted-foreground/[0.15] border-muted-foreground/20 flex h-8 w-full items-center justify-center gap-2 rounded-md border"
          onClick={onClick}
        >
          <Icons.alignLeft size={16} />
          <span className="text-sm">Plain text</span>
          <input
            ref={inputRef}
            name="import"
            type="file"
            onChange={(e) => {
              onChange(e);
              e.target.value = "";
            }}
            className="hidden"
            accept=".txt"
            multiple={false}
          />
        </button>
      </DialogContent>
    </Dialog>
  );
};
