import { useEffect, useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Icon, MoonIcon, SunIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage.hook";

interface IconProps
  extends Omit<ComponentProps<typeof Icon>, "iconNode" | "children"> {}

interface ThemeToggleProps
  extends Omit<ComponentProps<typeof Button>, "onClick" | "children"> {
  iconProps?: IconProps;
}

function ThemeToggle({ iconProps, ...rest }: ThemeToggleProps) {
  const [theme, setTheme] = useLocalStorage("theme", () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <Button onClick={toggleTheme} {...rest}>
      <ThemeIcon {...iconProps} />
    </Button>
  );
}

export default ThemeToggle;
