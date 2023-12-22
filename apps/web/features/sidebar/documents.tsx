"use client";

import { Icons, Skeleton } from "@lir/ui";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { documentApi, documentModel } from "~/entities/document";
import { generateDocumentURL } from "~/shared";

import { NavigationItem } from "./ui/navigation-item";

export const Documents = () => {
  const router = useRouter();

  const documents = documentModel.useDocuments();
  const setDocuments = documentModel.setDocuments;

  const { data: userDocuments, isSuccess: isGetUserDocumentsSuccess } = useQuery({
    queryKey: documentApi.documentKeys.query.getUserDocuments(),
    queryFn: documentApi.getUserDocuments,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: createDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.createDocument(),
    mutationFn: documentApi.createDocument,
    onSuccess: (data) => {
      setDocuments([data]);
    },
  });

  useEffect(() => {
    if (userDocuments?.length && !documents.length) {
      setDocuments(userDocuments);
    }
  }, [documents, userDocuments, setDocuments]);

  const handleCreateDocument = async () => {
    const createdDocument = await createDocument({ title: null });
    router.push(generateDocumentURL(createdDocument.title, createdDocument.id));
  };

  if (!isGetUserDocumentsSuccess) {
    return (
      <div className="flex-1">
        <Skeleton className="mx-1.5 my-2 h-4" />
        <Skeleton className="mx-1.5 my-2 h-4" />
        <Skeleton className="mx-1.5 my-2 h-4" />
      </div>
    );
  }

  const DocumentList = () => {
    return documents.map((document) => {
      const documentUrl = generateDocumentURL(document.title, document.id);

      return (
        <NavigationItem
          key={document.id}
          item={{
            id: document.id,
            name: document.title,
            href: documentUrl,
            icon: <Icons.document />,
            isCurrent: ({ pathname }) => pathname.startsWith(documentUrl) ?? false,
          }}
          contentEditable
        />
      );
    });
  };

  return (
    <nav className="h-full flex-1 overflow-y-auto overflow-x-hidden pb-4">
      <DocumentList />
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
    </nav>
  );
};
