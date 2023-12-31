import { Icons } from "@lir/ui";

import { useState } from "react";

import { ImportDocumentDialog } from "./ui/import-document";
import { NavigationItem } from "./ui/navigation-item";

export const Navigation = () => {
  const [importDocumentDialogOpen, setImportDocumentDialogOpen] = useState(false);

  return (
    <nav>
      <NavigationItem
        item={{
          name: "Settings",
          href: "/settings",
          icon: <Icons.settings size={16} />,
          isCurrent: ({ pathname }) => pathname.startsWith("/settings") ?? false,
        }}
      />

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
