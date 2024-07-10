import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDownIcon } from "lucide-react";
import { cn, normalizePath } from "@/lib/utils";
import type {
  HeaderLinkItem,
  LinkItem,
  MenuLinkItem,
} from "@/context/header.context";

type NavLinkProps = {
  link: HeaderLinkItem;
};

const isLinkActive = (link: LinkItem, pathname: string) => {
  return normalizePath(link.href) === normalizePath(pathname);
};

const isMenuLinkActive = (link: MenuLinkItem, pathname: string) => {
  return link.links.some((sublink) => isLinkActive(sublink, pathname));
};

const isLink = (link: HeaderLinkItem): link is LinkItem => "href" in link;

function NavLink({ link }: NavLinkProps) {
  return isLink(link) ? (
    <Link
      link={link}
      className="px-4 py-2 text-sm hover:border-b-foreground"
      activeClasses="font-bold"
    />
  ) : (
    <MenuLink link={link} />
  );
}

function Link({
  link,
  className,
  activeClasses,
}: {
  link: LinkItem;
  className?: string;
  activeClasses?: string;
}) {
  const isActive = isLinkActive(link, window.location.pathname);

  return (
    <a
      href={link.href}
      className={cn(
        "border border-transparent transition",
        className,
        isActive && activeClasses,
      )}
    >
      {link.name}
    </a>
  );
}

function MenuLink({ link }: { link: MenuLinkItem }) {
  const pathname = window.location.pathname;

  const isActive = isMenuLinkActive(link, pathname);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger
        className={cn(
          "flex cursor-pointer items-center border border-transparent px-4 py-2 text-sm transition hover:border-b-foreground data-[state=open]:border-b-foreground",
          { "font-bold": isActive },
        )}
      >
        {link.name}
        <ChevronDownIcon
          className="ml-2 size-3.5"
          strokeWidth={isActive ? 3 : 2}
        />
      </HoverCardTrigger>
      <HoverCardContent
        sideOffset={10}
        className="flex flex-col p-0"
        align="start"
      >
        {link.links.map((sublink) => {
          return (
            <Link
              key={sublink.name}
              link={sublink}
              className={
                "border border-transparent px-4 py-3 text-sm hover:bg-foreground/10"
              }
              activeClasses="font-bold"
            />
          );
        })}
      </HoverCardContent>
    </HoverCard>
  );
}

export default NavLink;
