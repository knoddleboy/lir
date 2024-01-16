import { Icons, Skeleton } from "@lir/ui";

import { useState } from "react";

import { sessionModel } from "~/entities/session";
import { useIsMounted } from "~/shared";

import { ImportDocumentDialog } from "./ui/import-document";
import { NavigationItem } from "./ui/navigation-item";

export const Navigation = () => {
  const isAuth = sessionModel.useAuth();
  const [importDocumentDialogOpen, setImportDocumentDialogOpen] = useState(false);

  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <nav className="mx-1.5 my-0.5">
        <Skeleton className="h-6" />
      </nav>
    );
  }

  return (
    <nav>
      {isAuth && (
        <NavigationItem
          item={{
            name: "Settings",
            href: "/settings",
            icon: <Icons.settings size={16} />,
            isCurrent: ({ pathname }) => pathname.startsWith("/settings") ?? false,
          }}
        />
      )}

      {/* <NavigationItem
        item={{
          name: "Trash",
          icon: <Icons.trash />,
        }}
      /> */}

      <NavigationItem
        item={{
          name: "Import",
          icon: <Icons.import size={16} />,
          onClick: () => setImportDocumentDialogOpen(true),
        }}
      />

      <ImportDocumentDialog
        open={importDocumentDialogOpen}
        setOpen={setImportDocumentDialogOpen}
      />
    </nav>
  );
};
