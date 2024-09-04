import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectItem } from "@/context/project.context";
import type { PublicationItem } from "@/context/publication.context";
import ProjectsGrid from "../Project/ProjectsGrid";
import PublicationsGrid from "../Publication/PublicationsGrid";

interface AuthorPostsDisplayProps {
  className?: string;
  projectItems: ProjectItem[];
  publicationItems: PublicationItem[];
}

function AuthorPostsDisplay({
  projectItems,
  publicationItems,
  className,
}: AuthorPostsDisplayProps) {
  return (
    <Tabs
      defaultValue={projectItems.length > 0 ? "projects" : "publications"}
      className={className}
    >
      <TabsList>
        {projectItems.length > 0 && (
          <TabsTrigger key={"projects"} value={"projects"}>
            Projects
          </TabsTrigger>
        )}
        {publicationItems.length > 0 && (
          <TabsTrigger key={"publications"} value={"publications"}>
            Publications
          </TabsTrigger>
        )}
      </TabsList>
      <div className="mt-5">
        {projectItems.length > 0 && (
          <TabsContent key={"projects"} value={"projects"}>
            <ProjectsGrid projectItems={projectItems} />
          </TabsContent>
        )}
        {publicationItems.length > 0 && (
          <TabsContent key={"publications"} value={"publications"}>
            <PublicationsGrid publicationItems={publicationItems} />
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
}

export default AuthorPostsDisplay;
