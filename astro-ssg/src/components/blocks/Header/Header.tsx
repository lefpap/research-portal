import { Button } from "@/components/ui/button";
import { SearchIcon, SunIcon } from "lucide-react";
import {
  HeaderProvider,
  type HeaderContextState,
} from "@/context/header.context";
import NavMenu from "@/components/blocks/Header/NavMenu";
import MobileMenu from "@/components/blocks/Header/MobileMenu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/utility/ThemeToggle";

interface HeaderProps extends HeaderContextState {}

function Header({ navLinks }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, setIsScrolled]);

  return (
    <HeaderProvider navLinks={navLinks}>
      <header
        className={cn("border-b transition", {
          "sticky top-0 z-50 animate-appear backdrop-blur-md": isScrolled,
        })}
      >
        <div className="container flex items-center justify-between gap-5 py-6">
          <div className="flex items-center justify-start gap-3">
            <MobileMenu className="block sm:hidden" />
            <a href="/" className="flex items-center justify-start gap-3">
              <img src="/favicon.svg" alt="logo" className="size-8" />
              <span className="sr-only">logo</span>
              <h1 className="hidden font-bold md:block">Research Portal</h1>
            </a>
            <NavMenu className="hidden sm:flex" />
          </div>
          <div className="flex items-center justify-end gap-1">
            <Button variant={"outline"} size={"icon"} className="rounded-full">
              <SearchIcon className="size-5" />
            </Button>
            <ThemeToggle
              variant={"outline"}
              size={"icon"}
              className="rounded-full"
              iconProps={{ className: "size-5" }}
            />
            <Button variant={"outline"} size={"icon"} className="rounded-full">
              <svg className="size-5">
                <use href={`/icons/flags.svg#el`}></use>
              </svg>
            </Button>
          </div>
        </div>
      </header>
    </HeaderProvider>
  );
}

export default Header;
