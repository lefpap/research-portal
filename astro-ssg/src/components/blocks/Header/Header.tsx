import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
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
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, setIsScrolled]);

  return (
    <HeaderProvider navLinks={navLinks}>
      <header
        className={cn("sticky top-0 z-50 transition", {
          "border-b saturate-100 backdrop-blur-md": isScrolled,
        })}
      >
        <div className="container flex items-center justify-between gap-5 py-6">
          <div className="flex items-center justify-start gap-3">
            <MobileMenu className="block sm:hidden" />
            <a href="/" className="flex items-center justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                className="size-8 fill-primary"
              >
                <path d="M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7c.7-2 1.9-3.2 3.4-3.2h29c1.5 0 2.7 1.2 3.4 3.2l24.2 65.7s-11.6-7-28.5-7L67 45.5c-.4-1.7-1.6-2.8-2.9-2.8-1.3 0-2.5 1.1-2.9 2.7L50.4 78.5Zm-1.1 28.2Zm-4.2-20.2c-2 6.6-.6 15.8 4.2 20.2a17.5 17.5 0 0 1 .2-.7 5.5 5.5 0 0 1 5.7-4.5c2.8.1 4.3 1.5 4.7 4.7.2 1.1.2 2.3.2 3.5v.4c0 2.7.7 5.2 2.2 7.4a13 13 0 0 0 5.7 4.9v-.3l-.2-.3c-1.8-5.6-.5-9.5 4.4-12.8l1.5-1a73 73 0 0 0 3.2-2.2 16 16 0 0 0 6.8-11.4c.3-2 .1-4-.6-6l-.8.6-1.6 1a37 37 0 0 1-22.4 2.7c-5-.7-9.7-2-13.2-6.2Z" />
              </svg>
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
