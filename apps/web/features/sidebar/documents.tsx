"use client";

import { Icons, Skeleton } from "@lir/ui";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { documentApi } from "~/entities/document";

import { NavigationItem } from "./ui/navigation-item";

export const Documents = () => {
  const router = useRouter();

  const { data: documents } = useQuery({
    queryKey: documentApi.documentKeys.query.getUserDocuments(),
    queryFn: documentApi.getUserDocuments,
  });

  const { mutateAsync: createDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.createDocument(),
    mutationFn: documentApi.createDocument,
    onSuccess: (data) => {
      documents?.push(data);
    },
  });

  const handleCreateDocument = async () => {
    const createdDocument = await createDocument({ title: null });
    router.push(`/d/Untitled-${createdDocument.id}`);
  };

  if (!documents) {
    return (
      <div className="flex-1">
        <Skeleton className="mx-1.5 my-2 h-4" />
        <Skeleton className="mx-1.5 my-2 h-4" />
        <Skeleton className="mx-1.5 my-2 h-4" />
      </div>
    );
  }

  return (
    <nav className="h-full flex-1 overflow-y-auto overflow-x-hidden pb-4">
      {documents.map((document) => {
        const documentUrl = `/d/${document.title ?? "Untitled"}-${document.id}`;

        return (
          <NavigationItem
            key={document.id}
            item={{
              name: document.title,
              href: documentUrl,
              icon: <Icons.document />,
              isCurrent: ({ pathname }) => pathname.startsWith(documentUrl) ?? false,
            }}
          />
        );
      })}
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
