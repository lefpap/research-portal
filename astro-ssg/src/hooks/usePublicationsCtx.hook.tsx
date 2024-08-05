import { PublicationContext } from "@/context/publication.context";
import { useContext } from "react";

export function usePublicationsCtx() {
  const context = useContext(PublicationContext);
  if (context === undefined) {
    throw new Error(
      "usePublicationsCtx must be used within a PublicationProvider",
    );
  }
  return context;
}
