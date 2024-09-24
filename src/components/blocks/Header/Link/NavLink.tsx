import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn, normalizePath } from "@/lib/app.utils";
import { extractLangFromUri, translateUri } from "@/lib/i18n.utils";
import type { HrefLink, MenuLink } from "@/config/types";

const isHrefLink = (link: HrefLink | MenuLink): link is HrefLink =>
  "href" in link;

const isHrefLinkActive = (link: HrefLink, pathname: string) => {
  const [, href] = extractLangFromUri(link.href);
  const [, path] = extractLangFromUri(pathname);

  return normalizePath(href) === normalizePath(path);
};

const isMenuLinkActive = (link: MenuLink, pathname: string) => {
  return link.items.some((sublink) => isHrefLinkActive(sublink, pathname));
};

interface NavLinkItemProps {
  link: HrefLink | MenuLink;
}

function NavLinkItem({ link }: NavLinkItemProps) {
  return isHrefLink(link) ? (
    <LinkItem
      link={link}
      className="px-4 py-2 text-sm hover:border-b-foreground"
      activeClasses="font-bold"
    />
  ) : (
    <MenuLinkItem link={link} />
  );
}

function LinkItem({
  link,
  className,
  activeClasses,
}: {
  link: HrefLink;
  className?: string;
  activeClasses?: string;
}) {
  const isActive = isHrefLinkActive(link, window.location.pathname);
  const [lang] = extractLangFromUri(window.location.pathname);

  return (
    <a
      href={translateUri(link.href, lang)}
      className={cn(
        "border border-transparent transition",
        className,
        isActive && activeClasses,
      )}
    >
      {link.name[lang]}
    </a>
  );
}

function MenuLinkItem({ link }: { link: MenuLink }) {
  const pathname = window.location.pathname;
  const isActive = isMenuLinkActive(link, pathname);

  const [lang] = extractLangFromUri(window.location.pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group flex cursor-pointer items-center border border-transparent px-4 py-2 text-sm transition hover:border-b-foreground data-[state=open]:border-b-foreground",
          { "font-bold": isActive },
        )}
      >
        {link.name[lang]}
        <ChevronDownIcon
          className="ml-2 size-3.5 transition group-data-[state=open]:-rotate-180"
          strokeWidth={isActive ? 3 : 2}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        className="flex min-w-[15rem] flex-col p-0"
        align="start"
      >
        {link.items.map((sublink) => {
          return (
            <DropdownMenuItem
              key={sublink.code}
              className="flex cursor-pointer p-0"
            >
              <LinkItem
                link={sublink}
                className={"flex-1 px-4 py-3 text-sm"}
                activeClasses="font-bold"
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavLinkItem;
