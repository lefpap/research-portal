import { NewsContext } from "@/context/news.context";
import { useContext } from "react";

export function useNewsCtx() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
}
