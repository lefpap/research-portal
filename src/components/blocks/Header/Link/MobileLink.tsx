import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, normalizePath } from "@/lib/utils";
import type { HrefLink, MenuLink, SubLink } from "@/config/consts";
import {
  extractLangFromUri,
  translateUri,
  useTranslations,
} from "@/i18n/utils";

const isHrefLink = (link: HrefLink | MenuLink) => "href" in link;

const isHrefLinkActive = (link: HrefLink | SubLink, pathname: string) => {
  const [, href] = extractLangFromUri(link.href);
  const [, path] = extractLangFromUri(pathname);

  return normalizePath(href) === normalizePath(path);
};

const isMenuLinkActive = (link: MenuLink, pathname: string) => {
  return link.links.some((sublink) => isHrefLinkActive(sublink, pathname));
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
  link: HrefLink | SubLink;
  className?: string;
  activeClasses?: string;
}) {
  const isActive = isHrefLinkActive(link, window.location.pathname);

  const [lang] = extractLangFromUri(window.location.pathname);
  const t = useTranslations(lang);

  return (
    <a
      href={translateUri(link.href, lang)}
      className={cn(
        "flex w-full items-center gap-5 border border-transparent border-b-muted p-2 font-medium text-muted-foreground hover:bg-foreground/10",
        className,
        isActive && activeClasses,
      )}
    >
      {t(`nav-link.${link.code}`)}
    </a>
  );
}

function MenuLinkItem({ link }: { link: MenuLink }) {
  const isActive = isMenuLinkActive(link, window.location.pathname);

  const [lang] = extractLangFromUri(window.location.pathname);
  const t = useTranslations(lang);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn("p-2 font-medium text-muted-foreground", {
            "font-extrabold text-foreground": isActive,
          })}
        >
          {t(`nav-link.${link.code}`)}
        </AccordionTrigger>
        <AccordionContent>
          {link.links.map((sublink) => (
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
