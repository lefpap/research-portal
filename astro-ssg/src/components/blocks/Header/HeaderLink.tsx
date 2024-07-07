import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Link = {
  name: string;
  href: string;
};

type MenuLink = {
  name: string;
  links: Link[];
};

type HeaderLinkProps = {
  link: Link | MenuLink;
};

// Type guard function to check if the link is of type MenuLink
const isMenuLinkType = (link: Link | MenuLink): link is MenuLink => {
  return (link as MenuLink).links !== undefined;
};

const normalizePath = (path: string) => {
  return path.replace(/\/+$/, "").toLowerCase();
};

const isLinkActive = (link: Link, pathname: string) => {
  return normalizePath(link.href) === normalizePath(pathname);
};

function HeaderLink({ link }: HeaderLinkProps) {
  return isMenuLinkType(link) ? <MenuLink link={link} /> : <Link link={link} />;
}

function Link({ link }: { link: Link }) {
  const isActive = isLinkActive(link, window.location.pathname);

  return (
    <a
      href={link.href}
      className={cn(
        "border border-transparent px-4 py-2 text-sm transition hover:border-b-foreground",
        { "font-bold": isActive },
      )}
    >
      {link.name}
    </a>
  );
}

function MenuLink({ link }: { link: MenuLink }) {
  const pathname = window.location.pathname;

  const isActive = link.links.some((sublink) =>
    isLinkActive(sublink, pathname),
  );

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
          const isSublinkActive = isLinkActive(sublink, pathname);

          return (
            <a
              key={sublink.name}
              className={cn(
                "border border-transparent px-4 py-3 text-sm transition hover:bg-foreground/10",
                { "font-bold": isSublinkActive },
              )}
              href={sublink.href}
            >
              {sublink.name}
            </a>
          );
        })}
      </HoverCardContent>
    </HoverCard>
  );
}

export default HeaderLink;
