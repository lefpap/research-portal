import NavLinkItem from "../Link/NavLink";
import { cn } from "@/lib/app.utils";
import { NAV_LINKS } from "@/config/app.config";

interface NavMenuProps {
  className?: string;
}

function NavMenu({ className }: NavMenuProps) {
  return (
    <nav className={cn("items-center justify-start gap-0.5", className)}>
      {NAV_LINKS.map((link) => (
        <NavLinkItem key={link.code} link={link} />
      ))}
    </nav>
  );
}

export default NavMenu;
