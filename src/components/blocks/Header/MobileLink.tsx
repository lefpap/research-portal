import type {
  HeaderLinkItem,
  LinkItem,
  MenuLinkItem,
} from "@/context/header.context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, normalizePath } from "@/lib/utils";
import { BookmarkIcon } from "lucide-react";

interface MobileLinkProps {
  link: HeaderLinkItem;
}

const isLink = (link: HeaderLinkItem) => "href" in link;

const isLinkActive = (link: LinkItem, pathname: string) => {
  return normalizePath(link.href) === normalizePath(pathname);
};

function MobileLink({ link }: MobileLinkProps) {
  return isLink(link) ? (
    <Link link={link} activeClasses="font-extrabold text-foreground" />
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
        "flex w-full items-center gap-5 border border-transparent border-b-muted p-2 font-medium text-muted-foreground hover:bg-foreground/10",
        className,
        isActive && activeClasses,
      )}
    >
      {link.name}
      {isActive && <BookmarkIcon className="size-4" strokeWidth={2.5} />}
    </a>
  );
}

function MenuLink({ link }: { link: MenuLinkItem }) {
  const isActive = link.links.some((sublink) =>
    isLinkActive(sublink, window.location.pathname),
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn("p-2 font-medium text-muted-foreground", {
            "font-extrabold text-foreground": isActive,
          })}
        >
          {link.name}
        </AccordionTrigger>
        <AccordionContent>
          {link.links.map((sublink) => (
            <Link
              key={sublink.name}
              link={sublink}
              className="mt-3 border-transparent pl-10 text-sm"
              activeClasses="font-extrabold text-foreground"
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default MobileLink;
