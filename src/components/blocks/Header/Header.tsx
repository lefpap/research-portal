import { useEffect, useState } from "react";
import { cn } from "@/lib/app.utils";
import ThemeToggle from "@/components/utility/ThemeToggle";
import LanguageSwitcher from "@/components/utility/LanguageSwitcher";
import MobileMenu from "./Menu/MobileMenu";
import NavMenu from "./Menu/NavMenu";
import { extractLangFromUri, translateUri } from "@/lib/i18n.utils";
import { SITE_TITLE } from "@/config/app.config";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, setIsScrolled]);

  const [lang] = extractLangFromUri(window.location.pathname);

  return (
    <header
      className={cn("sticky top-0 z-50 transition", {
        "border-b saturate-100 backdrop-blur-md": isScrolled,
      })}
    >
      <div className="container flex items-center justify-between gap-5 py-6">
        <div className="flex items-center justify-start gap-3">
          <MobileMenu className="block sm:hidden" />
          <a
            href={translateUri("/", lang)}
            className="flex items-center justify-start gap-3"
            aria-label="Research Portal"
          >
            <svg className="size-8 fill-primary">
              <use href={`/icons/logo.svg#app-logo`}></use>
            </svg>
            <h3 className="hidden font-bold md:block">{SITE_TITLE[lang]}</h3>
          </a>
          <NavMenu className="hidden sm:flex" />
        </div>
        <div className="flex items-center justify-end gap-1">
          <ThemeToggle
            variant={"outline"}
            size={"icon"}
            className="rounded-full"
            iconProps={{ className: "size-5" }}
          />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
