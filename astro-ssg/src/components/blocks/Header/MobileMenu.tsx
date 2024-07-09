import { Button } from "@/components/ui/button";
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
  ArrowLeftIcon,
  MenuIcon,
  SearchIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeaderLinkItems, HeaderLinkItem } from "./Header";
import MobileLink from "./MobileLink";

interface NavMenuProps {
  navLinks: HeaderLinkItems;
  className?: string;
}

const isLink = (link: HeaderLinkItem) => "href" in link;

function MobileMenu({ navLinks, className }: NavMenuProps) {
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
            <MenuIcon className="size-5" />
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
            {navLinks.map((link) => (
              <MobileLink key={link.name} link={link} />
            ))}
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

export { MobileMenu };
