import { useEffect, useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Icon, MoonIcon, SunIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage.hook";
import { useTheme } from "@/hooks/useTheme";

interface IconProps
  extends Omit<ComponentProps<typeof Icon>, "iconNode" | "children"> {}

interface ThemeToggleProps
  extends Omit<ComponentProps<typeof Button>, "onClick" | "children"> {
  iconProps?: IconProps;
}

function ThemeToggle({ iconProps, ...rest }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={toggleTheme} {...rest}>
      <ThemeIcon {...iconProps} />
    </Button>
  );
}

export default ThemeToggle;
