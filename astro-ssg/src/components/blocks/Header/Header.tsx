import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/blocks/Header/MobileMenu";
import { SearchIcon, SunIcon } from "lucide-react";
import { NAV_LINKS } from "@/lib/consts";
import HeaderLink from "@/components/blocks/Header/HeaderLink";

export type LinkItem = {
  name: string;
  href: string;
};

export type MenuLinkItem = {
  name: string;
  links: LinkItem[];
};

export type HeaderLinkItem = LinkItem | MenuLinkItem;
export type HeaderLinkItems = HeaderLinkItem[];

function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between gap-5 py-6">
        <div className="flex items-center justify-start gap-3">
          <MobileMenu className="block sm:hidden" navLinks={NAV_LINKS} />
          <a href="/" className="flex items-center justify-start gap-3">
            <img src="/favicon.svg" alt="logo" className="size-8" />
            <span className="sr-only">logo</span>
            <h1 className="hidden font-bold md:block">Research Portal</h1>
          </a>
          <nav className="hidden items-center justify-start gap-0.5 sm:flex">
            {NAV_LINKS.map((link) => (
              <HeaderLink key={link.name} link={link} />
            ))}
          </nav>
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
  );
}

export default Header;
