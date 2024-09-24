import { cn } from "@/lib/app.utils";
import ProjectCard from "@/components/blocks/Project/ProjectCard";
import type { ProjectItem } from "@/context/project.context";

interface ProjectsGridProps {
  projectItems: ProjectItem[];
  className?: string;
}

function ProjectsGrid({ projectItems, className }: ProjectsGridProps) {
  return (
    <ul className={cn("grid items-stretch gap-10", className)}>
      {projectItems.map((item) => {
        return (
          <li key={item.project.id} className="overflow-hidden">
            <ProjectCard projectItem={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ProjectsGrid;
