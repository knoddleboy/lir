import {
  Icons,
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@lir/ui";

import { useMutation } from "@tanstack/react-query";

import { usePathname, useRouter } from "next/navigation";

import { documentApi, documentModel } from "~/entities/document";
import { generateDocumentURL } from "~/shared";

type Props = {
  itemId: string;
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const NavigationItemMenu = ({ itemId, open, setOpen }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const documents = documentModel.useDocuments();
  const documentIndex = documentModel
    .useDocuments()
    .findIndex((document) => document.id === itemId);

  const { mutateAsync: deleteDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.updateDocument(),
    mutationFn: documentApi.deleteDocument,
    onSuccess: (deletedDocument) => {
      documentModel.unsetDocument({
        id: deletedDocument.id,
      });
    },
  });

  const handleDeleteDocument = async () => {
    await deleteDocument({ id: itemId });

    if (documents.length === 1) {
      if (pathname.startsWith("/d/")) {
        router.replace("/d");
      }

      return;
    }

    const nextDocument =
      documents.length === documentIndex + 1
        ? documents[documentIndex - 1]
        : documents[documentIndex + 1];

    router.replace(generateDocumentURL(nextDocument.title, nextDocument.id));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onPointerDown={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}
      >
        <Button variant="control-ghost" className="h-5 w-5 rounded-sm p-0">
          <Icons.more size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 font-medium">
        <DropdownMenuItem
          onClick={handleDeleteDocument}
          className="flex cursor-pointer items-center gap-2 px-2 py-1"
        >
          <Icons.trash className="h-4 w-4" />
          Move to Trash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
