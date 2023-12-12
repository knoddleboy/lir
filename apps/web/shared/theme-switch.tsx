import { Button, Icons } from "@lir/ui";

import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const systemOrLight = theme === "system" || theme === "light";

  const toggle = () => {
    setTheme(systemOrLight ? "dark" : "light");
  };

  return (
    <Button variant="control-ghost" size="control-icon" onClick={toggle}>
      {systemOrLight ? <Icons.moon /> : <Icons.sun />}
    </Button>
  );
};
