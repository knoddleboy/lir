import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Icons,
  Input,
  Label,
} from "@lir/ui";

import { EmailSetting } from "~/features/settings/email";
import { PasswordSetting } from "~/features/settings/password";
import { Setting } from "~/features/settings/ui/setting";
import { SettingTitle } from "~/features/settings/ui/setting-title";

export default function SettingsPage() {
  return (
    <div className="flex h-full justify-center overflow-y-auto overflow-x-hidden px-2.5">
      <div className="w-full max-w-[calc(960px+2*8px)] space-y-14">
        <div className="mx-2 space-y-6">
          <SettingTitle className="mt-1">Profile</SettingTitle>

          <div className="flex items-center">
            <Avatar className="mr-5 h-16 w-16">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="text-3xl">KN</AvatarFallback>
            </Avatar>
            <div className="w-56">
              <Label className="mb-1.5 block text-xs" htmlFor="displayName">
                Display name
              </Label>
              <Input id="displayName" type="text" className="h-8 px-2" />
            </div>
          </div>

          <EmailSetting />
          <PasswordSetting />
        </div>

        <div className="space-y-4 pb-4">
          <SettingTitle className="mx-2">Account management</SettingTitle>

          <Button variant="control-ghost" className="h-fit w-full px-2 py-1">
            <Setting
              label="Log out"
              description="Tap here to log out."
              actionSuffix={
                <div className="text-accent-foreground/60 absolute -right-2.5 h-7 w-7 p-1">
                  <Icons.chevronRight className="w-full" />
                </div>
              }
            />
          </Button>

          <Button variant="control-ghost" className="h-fit w-full px-2 py-1">
            <Setting
              label={<span className="text-destructive">Delete account</span>}
              description="Permanently delete this account and all related data."
              actionSuffix={
                <div className="text-accent-foreground/60 absolute -right-2.5 h-7 w-7 p-1">
                  <Icons.chevronRight className="w-full" />
                </div>
              }
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
