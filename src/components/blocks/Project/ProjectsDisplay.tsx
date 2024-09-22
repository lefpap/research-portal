import { cn } from "@/lib/utils";
import {
  ProjectProvider,
  type ProjectProviderProps,
} from "@/context/project.context";
import ProjectsGrid from "@/components/blocks/Project/ProjectsGrid";
import ProjectFilters from "./ProjectFilters";
import { useProjectsCtx } from "@/hooks/useProjectsCtx.hook";
import { useTranslations } from "@/i18n/utils";

interface ProjectDisplayProps extends Omit<ProjectProviderProps, "children"> {
  className?: string;
}

function ProjectsDisplay({
  initialProjectItems,
  lang,
  className,
}: ProjectDisplayProps) {
  return (
    <ProjectProvider initialProjectItems={initialProjectItems} lang={lang}>
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
  const { projectItems, lang } = useProjectsCtx();
  const t = useTranslations(lang);

  if (projectItems.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        {t("component.projects-display.empty")}
      </p>
    );
  }

  return <ProjectsGrid projectItems={projectItems} className={className} />;
}

export default ProjectsDisplay;
