import type {
  HeaderLinkItem,
  LinkItem,
  MenuLinkItem,
} from "@/context/header.context";
import { cn, normalizePath } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";

interface MobileLinkProps {
  link: HeaderLinkItem;
}

const isLink = (link: HeaderLinkItem) => "href" in link;

const isLinkActive = (link: LinkItem, pathname: string) => {
  return normalizePath(link.href) === normalizePath(pathname);
};

function MobileLink({ link }: MobileLinkProps) {
  return isLink(link) ? (
    <Link link={link} activeClasses="font-bold" />
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
        "flex w-full items-center gap-5 border border-transparent border-b-muted p-2 text-lg hover:bg-foreground/10",
        className,
        isActive && activeClasses,
      )}
    >
      {link.name}
      {isActive && <ArrowLeftIcon className="size-4" strokeWidth={2.5} />}
    </a>
  );
}

function MenuLink({ link }: { link: MenuLinkItem }) {
  return (
    <div className="w-full">
      <div className="border border-transparent border-b-muted p-2 text-lg text-muted-foreground">
        {link.name}
      </div>
      <div className="flex flex-col items-start justify-start">
        {link.links.map((sublink) => (
          <Link
            key={sublink.name}
            link={sublink}
            className="mt-3 border-transparent pl-10 text-base"
            activeClasses="font-bold"
          />
        ))}
      </div>
    </div>
  );
}

export default MobileLink;
