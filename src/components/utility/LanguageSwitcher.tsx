import { Button } from "@/components/ui/button";
import { languages } from "@/i18n/config";
import { extractLangFromUri } from "@/i18n/utils";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

type LanguageKeys = keyof typeof languages;

function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = window.location.pathname;
  const [currentLang] = extractLangFromUri(pathname);

  const toggleLanguage = () => {
    const newLang: LanguageKeys = currentLang === "en" ? "el" : "en";

    // Build the new URL with the new language prefix
    const newUrl = pathname.replace(`/${currentLang}`, `/${newLang}`);

    // Use replaceState to update the URL without adding to the browser history
    window.history.replaceState(null, "", newUrl);

    // Optionally, reload the page after changing the URL to reflect the language change
    window.location.reload();
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={cn("rounded-full", className)}
      onClick={toggleLanguage}
    >
      <svg className="size-5">
        <use
          href={`/icons/flags.svg#${currentLang === "en" ? "el" : "en"}`}
        ></use>
      </svg>
    </Button>
  );
}

export default LanguageSwitcher;
