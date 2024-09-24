import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, normalizePath } from "@/lib/app.utils";
import type { HrefLink, MenuLink } from "@/config/types";
import { extractLangFromUri, translateUri } from "@/lib/i18n.utils";

const isHrefLink = (link: HrefLink | MenuLink) => "href" in link;

const isHrefLinkActive = (link: HrefLink, pathname: string) => {
  const [, href] = extractLangFromUri(link.href);
  const [, path] = extractLangFromUri(pathname);

  return normalizePath(href) === normalizePath(path);
};

const isMenuLinkActive = (link: MenuLink, pathname: string) => {
  return link.items.some((sublink) => isHrefLinkActive(sublink, pathname));
};

interface MobileLinkItemProps {
  link: HrefLink | MenuLink;
}

function MobileLinkItem({ link }: MobileLinkItemProps) {
  return isHrefLink(link) ? (
    <LinkItem link={link} activeClasses="font-extrabold text-foreground" />
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
        "flex w-full items-center gap-5 border border-transparent border-b-muted p-2 font-medium text-muted-foreground hover:bg-foreground/10",
        className,
        isActive && activeClasses,
      )}
    >
      {link.name[lang]}
    </a>
  );
}

function MenuLinkItem({ link }: { link: MenuLink }) {
  const isActive = isMenuLinkActive(link, window.location.pathname);

  const [lang] = extractLangFromUri(window.location.pathname);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn("p-2 font-medium text-muted-foreground", {
            "font-extrabold text-foreground": isActive,
          })}
        >
          {link.name[lang]}
        </AccordionTrigger>
        <AccordionContent>
          {link.items.map((sublink) => (
            <LinkItem
              key={sublink.code}
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

export default MobileLinkItem;
