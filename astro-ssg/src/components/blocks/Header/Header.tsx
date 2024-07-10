import { Button } from "@/components/ui/button";
import { SearchIcon, SunIcon } from "lucide-react";
import {
  HeaderProvider,
  type HeaderContextState,
} from "@/context/header.context";
import NavMenu from "@/components/blocks/Header/NavMenu";
import MobileMenu from "@/components/blocks/Header/MobileMenu";

interface HeaderProps extends HeaderContextState {}

function Header({ navLinks }: HeaderProps) {
  return (
    <HeaderProvider navLinks={navLinks}>
      <header className="border-b">
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
            <Button variant={"outline"} size={"icon"} className="rounded-full">
              <SunIcon className="size-5" />
            </Button>
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
