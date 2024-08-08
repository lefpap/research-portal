import { ProjectContext } from "@/context/project.context";
import { useContext } from "react";

export function useProjectsCtx() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjectsCtx must be used within a ProjectProvider");
  }
  return context;
}
