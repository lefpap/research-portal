import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  SunIcon,
  Menu,
  XIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { cn } from "@/lib/utils";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import HeaderLink from "./HeaderLink";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Team",
    links: [
      {
        name: "Meet The Team",
        href: "/team",
      },
      {
        name: "Projects",
        href: "/team/projects",
      },
      {
        name: "Publications",
        href: "/team/publications",
      },
    ],
  },
  {
    name: "News",
    href: "/news",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between gap-5 py-6">
        <div className="flex items-center justify-start gap-3">
          <NavMenu className="block sm:hidden" />
          <a href="/" className="flex items-center justify-start gap-3">
            <img src="/favicon.svg" alt="logo" className="size-8" />
            <span className="sr-only">logo</span>
            <h1 className="hidden font-bold md:block">Research Portal</h1>
          </a>
          <nav className="hidden items-center justify-start gap-0.5 sm:flex">
            {navLinks.map((link) => (
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

interface NavMenuProps {
  className?: string;
}

function NavMenu({ className }: NavMenuProps) {
  // const { navLinks } = useNavbarContext();

  return (
    <div className={cn("", className)}>
      <Drawer direction="left">
        <Button
          asChild
          variant={"outline"}
          size={"icon"}
          className="rounded-full"
        >
          <DrawerTrigger>
            <Menu className="size-5" />
          </DrawerTrigger>
        </Button>
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>
              <a href="/" className="flex items-center justify-start gap-3">
                <img src="/favicon.svg" alt="logo" className="size-8" />
                <span className="sr-only">logo</span>
              </a>
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              navigation menu
            </DrawerDescription>

            <Button
              asChild
              variant={"outline"}
              size={"icon"}
              className="rounded-full"
            >
              <DrawerClose>
                <XIcon className="size-5" />
              </DrawerClose>
            </Button>
          </DrawerHeader>

          <div className="flex flex-col items-start justify-start gap-3 p-4">
            {navLinks.map((link) => {
              const isLink = "href" in link;

              return isLink ? (
                <a
                  href={link.href}
                  className="flex w-full items-center gap-5 border border-transparent border-b-muted p-2 text-lg hover:bg-foreground/10"
                >
                  {link.name}
                  <ArrowLeftIcon className="size-5" />
                </a>
              ) : (
                <div className="w-full">
                  <div className="p-2 text-lg text-muted-foreground">
                    {link.name}
                  </div>
                  <div className="flex flex-col items-start justify-start border border-transparent border-b-muted">
                    {link.links.map((sublink) => (
                      <a
                        href={sublink.href}
                        className="mt-3 flex w-full items-center gap-5 py-2 pl-10 text-lg font-bold hover:bg-foreground/10"
                      >
                        {sublink.name}
                        <ArrowLeftIcon className="size-5" />{" "}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <DrawerFooter>
            <div className="flex items-center justify-center gap-1">
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full"
              >
                <SearchIcon className="size-5" />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full"
              >
                <SunIcon className="size-5" />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full"
              >
                <svg className="size-5">
                  <use href={`/icons/flags.svg#el`}></use>
                </svg>
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Header;
