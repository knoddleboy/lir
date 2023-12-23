import { cn } from "@lir/lib";
import type { UserProps } from "@lir/lib/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lir/ui";

import { useRef } from "react";
import { toast } from "sonner";

import { sessionModel } from "~/entities/session";
import { Avatar, avatarVariants } from "~/features/user/avatar";
import { toBase64 } from "~/shared";

import { useUpdateUser } from "./api";

type Props = {
  user: UserProps;
};

export const AvatarSetting = ({ user }: Props) => {
  const setUser = sessionModel.setUser;
  const { mutateAsync: updateUserAvatar } = useUpdateUser();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
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

    const base64 = await toBase64(file);

    if (base64) {
      const updatedUser = await updateUserAvatar({
        avatar: base64,
      });
      setUser(updatedUser);
    }
  };

  const handleRemove = async () => {
    const updatedUser = await updateUserAvatar({
      avatar: null,
    });
    setUser(updatedUser);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "_ring group relative border-separate cursor-pointer overflow-hidden rounded-full outline-none",
            avatarVariants({ size: "lg" })
          )}
        >
          <div className="invisible absolute z-10 h-full w-full bg-gradient-to-t from-black/60 to-40% group-hover:visible">
            <div className="absolute bottom-1 left-0 right-0 text-[10px] font-bold text-white">
              edit
            </div>
          </div>
          <Avatar
            avatarUrl={user.avatar}
            fallbackName={user.name}
            size="lg"
            className="mr-0"
          />
          <input
            ref={inputRef}
            name="avatar"
            type="file"
            onChange={(e) => {
              onChange(e);
              e.target.value = "";
            }}
            className="hidden"
            accept="image/png, image/jpeg"
            multiple={false}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-28 font-medium">
        <DropdownMenuItem onClick={handleUpload} className="cursor-pointer py-1">
          {user.avatar ? "Replace photo" : "Add photo"}
        </DropdownMenuItem>
        {user.avatar && (
          <DropdownMenuItem onClick={handleRemove} className="cursor-pointer py-1">
            Remove photo
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
