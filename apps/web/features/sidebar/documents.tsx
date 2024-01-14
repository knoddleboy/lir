"use client";

import type { DocumentProps } from "@lir/lib/schema";
import { Icons, Skeleton } from "@lir/ui";

import { createId } from "@paralleldrive/cuid2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useMemo, memo } from "react";
import { toast } from "sonner";

import { usePathname, useRouter } from "next/navigation";

import { documentApi, documentModel } from "~/entities/document";
import { sessionModel } from "~/entities/session";
import { generateDocumentURL } from "~/shared";

import { NavigationItem } from "./ui/navigation-item";

export const Documents = () => {
  const isAuth = sessionModel.useAuth();
  const pathname = usePathname();
  const lastPathname = useRef<string>();

  useEffect(() => {
    lastPathname.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  if (!isAuth) {
    return <PublicViewerDocuments />;
  }

  return <LoggedInViewerDocuments lastPathname={lastPathname.current} />;
};

const PublicViewerDocuments = () => {
  const router = useRouter();
  const documents = documentModel.useDocuments();
  const publicViewerDocument = useRef<DocumentProps | null>(null);

  useEffect(() => {
    // We want to keep 1 document per public viewer session.
    if (documents.length) {
      const document = documents[0];
      router.replace(generateDocumentURL(document.title, document.id));
      return;
    }

    const document = {
      id: createId(),
      title: "Untitled Document",
      userId: "",
      content: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!publicViewerDocument.current) {
      documentModel.setDocuments([document]);
      router.replace(generateDocumentURL(document.title, document.id));
    }

    return () => {
      publicViewerDocument.current = document;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="h-full flex-1 overflow-y-auto overflow-x-hidden pb-4 pt-px">
      <DocumentList />
      <CreateDocument />
    </nav>
  );
};

const LoggedInViewerDocuments = ({ lastPathname }: { lastPathname?: string }) => {
  const router = useRouter();

  const { data: userDocuments, isSuccess: isGetUserDocumentsSuccess } = useQuery({
    queryKey: documentApi.documentKeys.query.getUserDocuments(),
    queryFn: documentApi.getUserDocuments,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    documentModel.unsetDocuments();

    if (isGetUserDocumentsSuccess) {
      documentModel.setDocuments(userDocuments);
    }

    router.replace(lastPathname || "/d");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetUserDocumentsSuccess]);

  if (!isGetUserDocumentsSuccess) {
    return (
      <div className="flex-1">
        <Skeleton className="mx-1.5 my-2 h-4" />
        <Skeleton className="mx-1.5 my-2 h-4" />
        <Skeleton className="mx-1.5 my-2 h-4" />
      </div>
    );
  }

  return (
    <nav className="h-full flex-1 overflow-y-auto overflow-x-hidden pb-4 pt-px">
      <DocumentList />
      <CreateDocument />
    </nav>
  );
};

const DocumentList = () => {
  const documents = documentModel.useDocuments();

  const memoizedDocuments = useMemo(
    () =>
      documents.map((document) => {
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
            withMenu
            contentEditable
          />
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [documents.length, JSON.stringify(documents.map((doc) => [doc.id, doc.title]))]
  );

  return memoizedDocuments;
};

const CreateDocument = memo(() => {
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
      toast.info("For more documents, please create a new account or sign in.");
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
