import { cn } from "@/lib/utils";
import {
  ProjectProvider,
  type ProjectProviderProps,
} from "@/context/project.context";
import ProjectsGrid from "@/components/blocks/Project/ProjectsGrid";
import ProjectFilters from "./ProjectFilters";
import { useProjectsCtx } from "@/hooks/useProjectsCtx.hook";

interface ProjectDisplayProps extends Omit<ProjectProviderProps, "children"> {
  className?: string;
}

function ProjectsDisplay({
  initialProjectItems,
  authors,
  tags,
  className,
}: ProjectDisplayProps) {
  return (
    <ProjectProvider
      initialProjectItems={initialProjectItems}
      authors={authors}
      tags={tags}
    >
      <div
        className={cn(
          "flex flex-col items-stretch justify-between gap-5 md:flex-row",
          className,
        )}
      >
        <div className="w-full md:w-2/4">
          <div className="sm:sticky sm:top-28">
            <ProjectFilters className="sm:sticky sm:top-28" />
          </div>
        </div>
        <div className={"w-full"}>
          <ProjectItemsDisplay className="flex-1" />
        </div>
      </div>
    </ProjectProvider>
  );
}

function ProjectItemsDisplay({ className }: { className?: string }) {
  const { projectItems } = useProjectsCtx();

  if (projectItems.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No projects to display
      </p>
    );
  }

  return <ProjectsGrid projectItems={projectItems} className={className} />;
}

export default ProjectsDisplay;
