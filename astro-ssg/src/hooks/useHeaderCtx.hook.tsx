import { HeaderContext } from "@/context/header.context";
import { useContext } from "react";

export function useHeaderCtx() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeaderCtx must be used within a HeaderProvider");
  }
  return context;
}
