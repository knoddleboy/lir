import { cn } from "@lir/lib";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Icons,
} from "@lir/ui";

import { createId } from "@paralleldrive/cuid2";
import { useMutation } from "@tanstack/react-query";
import { useRef, type InputHTMLAttributes } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { documentApi, documentModel } from "~/entities/document";
import { sessionModel } from "~/entities/session";
import { generateDocumentURL } from "~/shared";

import { fileParser } from "../lib";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const ImportDocumentDialog = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const isAuth = sessionModel.useAuth();
  const documentIdRef = useRef("");

  const { mutateAsync: createLoggedInViewerDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.createDocument(),
    mutationFn: documentApi.createDocument,
    onSuccess: (data) => {
      documentModel.setDocuments([data]);
      router.push(generateDocumentURL(data.title, data.id));
    },
  });

  const createPublicViewerDocument = (title: string) => {
    const document = {
      id: createId(),
      title,
      userId: "",
      content: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    documentModel.unsetDocuments(); // make sure a public viewer has exactly one document.
    documentModel.setDocuments([document]);
    router.replace(generateDocumentURL(document.title, document.id));

    return document;
  };

  const handleCreateDocument = async (title: string) => {
    if (isAuth) {
      return await createLoggedInViewerDocument({ title });
    }

    return createPublicViewerDocument(title);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const files = target.files;

    if (!files || files.length < 1) return;

    const file = files[0];
    const fileType = file.type;
    const sizeInMB = file.size / (1024 * 1024);

    if (sizeInMB > 5) {
      toast.error("File size exceeds the 5 MB limit. Please choose a smaller file.");
      return;
    }

    // Remove the extension from the file name.
    const name = file.name.split(".");
    name.pop();

    const reader = new FileReader();
    reader.addEventListener("load", async () => {
      try {
        const parser = fileParser(reader.result as string, fileType);
        const parsedContent = parser.parse();

        const createdDocument = await handleCreateDocument(name.join("."));
        documentIdRef.current = createdDocument.id;

        documentModel.setDocument({
          id: createdDocument.id,
          content: parsedContent,
        });

        setOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message, {
            duration: 4000,
          });
        }
      }
    });

    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>
            Import your documents. Note that you can import files up to <b>5 MB</b>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <SelectFileButton
            fileType="text/plain"
            label="Plain text"
            icon={<Icons.alignLeft size={16} />}
            className="col-span-2"
            onChange={onChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type SelectFileButtonProps = {
  fileType: InputHTMLAttributes<HTMLInputElement>["accept"];
  label: string;
  icon: React.ReactNode;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectFileButton = ({
  fileType,
  label,
  icon,
  className,
  onChange,
}: SelectFileButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <button
      className={cn(
        "_ring bg-accent hover:bg-muted-foreground/10 active:bg-muted-foreground/[0.15] border-muted-foreground/20 flex h-8 w-full items-center justify-center gap-2 rounded-md border",
        className
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{label}</span>
      <input
        ref={inputRef}
        name="import"
        type="file"
        onChange={(e) => {
          onChange(e);
          e.target.value = "";
        }}
        className="hidden"
        accept={fileType}
        multiple={false}
      />
    </button>
  );
};
