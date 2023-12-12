type SettingType = {
  label: React.ReactNode;
  description: React.ReactNode;
  actionSuffix: React.ReactNode;
};

export const Setting = ({ label, description, actionSuffix }: SettingType) => (
  <div className="relative flex w-full items-center justify-between text-left">
    <div className="space-y-0.5">
      <h2 className="text-accent-foreground text-[15px] font-medium">{label}</h2>
      <p className="text-accent-foreground/60 text-[13px]">{description}</p>
    </div>
    {actionSuffix}
  </div>
);
