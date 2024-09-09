import { useEffect, useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Icon, MoonIcon, SunIcon } from "lucide-react";

interface IconProps
  extends Omit<ComponentProps<typeof Icon>, "iconNode" | "children"> {}

interface ThemeToggleProps
  extends Omit<ComponentProps<typeof Button>, "onClick" | "children"> {
  iconProps?: IconProps;
}

function ThemeToggle({ iconProps, ...rest }: ThemeToggleProps) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    // Setup the MutationObserver to listen for class changes on documentElement
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      // Only observe changes to the class attribute
      attributeFilter: ["class"],
    });

    // Cleanup observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <Button onClick={toggleTheme} {...rest}>
      <ThemeIcon {...iconProps} />
    </Button>
  );
}

export default ThemeToggle;
