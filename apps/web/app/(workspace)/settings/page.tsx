import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Icons,
  Input,
  Label,
  Separator,
} from "@lir/ui";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

type TitleProps = {
  className?: string;
  children?: React.ReactNode;
};

const Title = ({ className, children }: TitleProps) => (
  <>
    <div className={className}>
      <h1 className="text-lg font-medium">{children}</h1>
      <Separator className="mt-4" />
    </div>
  </>
);

type SettingType = {
  label: React.ReactNode;
  description: React.ReactNode;
  actionSuffix: React.ReactNode;
};

const Setting = ({ label, description, actionSuffix }: SettingType) => (
  <div className="relative flex w-full items-center justify-between text-left">
    <div className="space-y-0.5">
      <h2 className="text-accent-foreground text-base font-medium">{label}</h2>
      <p className="text-accent-foreground/60 text-[13px]">{description}</p>
    </div>
    {actionSuffix}
  </div>
);

export default function SettingsPage() {
  return (
    <div className="flex h-full justify-center overflow-y-auto overflow-x-hidden px-2.5">
      <div className="w-full max-w-[calc(960px+2*8px)] space-y-14">
        <div className="mx-2 space-y-6">
          <Title className="mt-1">Profile</Title>

          <div className="flex items-center">
            <Avatar className="mr-5 h-16 w-16">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="text-3xl">KN</AvatarFallback>
            </Avatar>
            <div className="w-56">
              <Label className="mb-1.5 block text-xs" htmlFor="displayName">
                Display name
              </Label>
              <Input id="displayName" type="text" className="px-2" />
            </div>
          </div>

          <Setting
            label="Email"
            description="You can have only one account per email."
            actionSuffix={
              <Button
                variant="control-ghost"
                size="link"
                className="text-sm font-medium"
              >
                test@test.com
              </Button>
            }
          />

          <Setting
            label="Password"
            description="Remember to keep your password safe."
            actionSuffix={
              <Button
                variant="control-ghost"
                size="link"
                className="text-xs font-medium"
              >
                &lowast;&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;
              </Button>
            }
          />
        </div>

        <div className="space-y-4 pb-4">
          <Title className="mx-2">Account management</Title>
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
              label={<span className="text-red-600">Delete account</span>}
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
