import { createContext } from "react";

export type LinkItem = {
  name: string;
  href: string;
};

export type MenuLinkItem = {
  name: string;
  links: LinkItem[];
};

export type HeaderLinkItem = LinkItem | MenuLinkItem;
export type HeaderLinkItems = HeaderLinkItem[];

export interface HeaderContextState {
  navLinks: HeaderLinkItems;
}

export const HeaderContext = createContext<HeaderContextState | undefined>(
  undefined,
);

interface HeaderProviderProps extends HeaderContextState {
  children: React.ReactNode;
}

export function HeaderProvider({ navLinks, children }: HeaderProviderProps) {
  const value = { navLinks };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
