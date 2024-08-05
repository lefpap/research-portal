import CollectionOrEmptyMessage from "@/components/utility/CollectionOrEmptyMessage";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/blocks/Project/ProjectCard";
import { useProjectsCtx } from "@/hooks/useProjectsCtx.hook";

interface ProjectsGridProps {
  className?: string;
}

function ProjectsGrid({ className }: ProjectsGridProps) {
  const { projectItems } = useProjectsCtx();

  return (
    <CollectionOrEmptyMessage
      collection={projectItems}
      emptyMessage={
        <p className="text-center text-sm text-muted-foreground">
          No projects to display
        </p>
      }
    >
      <ul className={cn("grid items-stretch gap-10", className)}>
        {projectItems.map((item) => {
          return (
            <li key={item.project.id} className="overflow-hidden">
              <ProjectCard projectItem={item} />
            </li>
          );
        })}
      </ul>
    </CollectionOrEmptyMessage>
  );
}

export default ProjectsGrid;
