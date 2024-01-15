import { Icons } from "@lir/ui";

import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { documentApi, documentModel } from "~/entities/document";
import { sessionModel } from "~/entities/session";
import { generateDocumentURL } from "~/shared";

import { NavigationItem } from "./navigation-item";

export const CreateDocument = memo(() => {
  const router = useRouter();
  const isAuth = sessionModel.useAuth();
  const setDocuments = documentModel.setDocuments;

  const { mutateAsync: createDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.createDocument(),
    mutationFn: documentApi.createDocument,
    onSuccess: (data) => {
      setDocuments([data]);
    },
  });

  const handleCreateDocument = async () => {
    if (!isAuth) {
      toast.info("For more documents, please create a new account or sign in.", {
        duration: 4000,
      });
      return;
    }

    const createdDocument = await createDocument({
      title: null,
    });

    router.push(generateDocumentURL(createdDocument.title, createdDocument.id));
  };

  return (
    <NavigationItem
      item={{
        name: "New document",
        icon: (
          <Icons.plus
            size={16}
            strokeWidth={3}
            className="text-accent-foreground/60 group-active:text-accent-foreground/90"
          />
        ),
        onClick: handleCreateDocument,
      }}
    />
  );
});
CreateDocument.displayName = "CreateDocument";
