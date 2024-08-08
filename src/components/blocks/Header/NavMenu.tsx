import { useHeaderCtx } from "@/hooks/useHeaderCtx.hook";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";

interface NavMenuProps {
  className?: string;
}

function NavMenu({ className }: NavMenuProps) {
  const { navLinks } = useHeaderCtx();

  return (
    <nav className={cn("items-center justify-start gap-0.5", className)}>
      {navLinks.map((link) => (
        <NavLink key={link.name} link={link} />
      ))}
    </nav>
  );
}

export default NavMenu;
