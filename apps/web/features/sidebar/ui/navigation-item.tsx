"use client";

import { cn } from "@lir/lib";

import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useOnClickOutside } from "usehooks-ts";

import { usePathname, useRouter } from "next/navigation";

import { documentApi, documentModel } from "~/entities/document";
import { LinkOr, generateDocumentURL } from "~/shared";

import { NavigationItemMenu } from "./navigation-item-menu";

export type NavigationItemType = {
  id?: string;
  name: string | null;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: ({ pathname }: { pathname: string }) => boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
};

type Props = {
  item: NavigationItemType;
  withMenu?: boolean;
  contentEditable?: boolean;
};

export const NavigationItem = ({
  item,
  withMenu = false,
  contentEditable = false,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const current = item.isCurrent?.({ pathname }) ?? false;

  const setDocument = documentModel.setDocument;

  const { mutateAsync: updateDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.updateDocument(),
    mutationFn: documentApi.updateDocument,
  });

  const itemRef = useRef<HTMLAnchorElement & HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState<string>(item.name ? item.name : "");

  useHotkeys(
    "Escape",
    () => handleUpdate(),
    {
      enableOnFormTags: ["input"],
      enabled: isEditing,
    },
    [isEditing]
  );

  useOnClickOutside(inputRef, () => handleUpdate());

  const handleUpdate = async () => {
    if (newTitle.length && item.id) {
      const updateInput = {
        id: item.id,
        title: newTitle,
      };

      router.replace(generateDocumentURL(newTitle, item.id));
      setDocument(updateInput);
      await updateDocument(updateInput);
    }

    setNewTitle("");
    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    if (!contentEditable) return;
    setIsEditing(true);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative mx-1.5 my-0.5 flex items-center"
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}
    >
      <LinkOr
        ref={itemRef}
        role="button"
        tabIndex={0}
        href={item.href}
        onClick={item.onClick}
        onDoubleClick={handleDoubleClick}
        className={cn(
          `_ring text-accent-foreground/75 group flex h-7 w-full flex-1 cursor-pointer select-none items-center rounded-md py-1 pl-3.5 pr-1.5 font-medium`,
          current && "bg-control",
          !isEditing &&
            "hover:bg-control active:text-accent-foreground active:bg-control-foreground",
          !isEditing && "hover:bg-control",
          isEditing && "bg-control-foreground"
        )}
      >
        <div className="mr-2 flex h-4 w-4 shrink-0 grow-0 items-center justify-center">
          {item.icon}
        </div>

        <div
          className={cn(
            "flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm",
            item.name === null &&
              "text-accent-foreground/50 group-active:text-accent-foreground/75 italic"
          )}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              name="setTitle"
              type="text"
              placeholder="Untitled Document"
              value={newTitle}
              onClick={(e) => e.preventDefault()}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await handleUpdate();
                }
              }}
              className="bg-accent placeholder:text-accent-foreground/20 text-accent-foreground/75 w-full outline-none"
              autoFocus
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
            />
          ) : (
            item.name ?? "Untitled Document"
          )}
        </div>
      </LinkOr>
      {!isEditing && withMenu && (menuVisible || menuOpen) && (
        <div className="absolute right-1.5 h-5 w-5">
          <NavigationItemMenu
            itemId={item.id!}
            open={menuOpen}
            setOpen={setMenuOpen}
          />
        </div>
      )}
    </div>
  );
};
