"use client";

import { Button, Icons } from "@lir/ui";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { sessionModel } from "~/entities/session";
import { useLogout } from "~/features/auth";
import { ChangePasswordForm } from "~/features/auth/change-password";
import { DeleteAccount } from "~/features/settings/delete";
import { EmailSetting } from "~/features/settings/email";
import { NameSetting } from "~/features/settings/name";
import { PasswordSetting } from "~/features/settings/password";
import { Setting } from "~/features/settings/ui/setting";
import { SettingTitle } from "~/features/settings/ui/setting-title";
import { Avatar } from "~/features/user/avatar";

export default function SettingsPage() {
  useEffect(() => {
    sessionModel.sessionStore.persist.rehydrate();
  }, []);

  const user = sessionModel.useCurrentUser();
  const router = useRouter();
  const { mutateAsync: _logout } = useLogout();

  const logout = async () => {
    await _logout();
    router.replace("/");
  };

  return (
    <div className="flex h-full justify-center overflow-y-auto overflow-x-hidden px-2.5">
      <div className="w-full max-w-[calc(960px+2*8px)] space-y-14">
        <div className="mx-2 space-y-6">
          <SettingTitle className="mt-1">Profile</SettingTitle>

          <div className="flex items-center">
            <Avatar avatarUrl={user?.avatar} fallbackName={user?.name} size="lg" />

            <NameSetting user={user} />
          </div>

          <EmailSetting email={user?.email} />

          <PasswordSetting>
            <ChangePasswordForm />
          </PasswordSetting>
        </div>

        <div className="space-y-4 pb-4">
          <SettingTitle className="mx-2">Account management</SettingTitle>

          <Button
            variant="control-ghost"
            className="h-fit w-full px-2 py-1"
            onClick={logout}
          >
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

          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
