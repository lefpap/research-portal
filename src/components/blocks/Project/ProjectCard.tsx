import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkIcon } from "lucide-react";
import type { ProjectItem } from "@/context/project.context";
import ProjectInfo from "@/components/blocks/Project/ProjectInfo";
import { extractLangFromUri, translateUri } from "@/lib/i18n.utils";

interface ProjectCardProps {
  projectItem: ProjectItem;
  className?: string;
}

function ProjectCard({ projectItem }: ProjectCardProps) {
  const { project } = projectItem;
  const [lang] = extractLangFromUri(project.slug);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <a
            href={translateUri(`/projects/${projectItem.project.slug}`, lang)}
            className="group flex items-center gap-3 hover:underline"
          >
            {project.data.title}
            <LinkIcon className="hidden size-5 group-hover:block" />
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {project.data.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <ProjectInfo projectItem={projectItem} />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-start gap-1.5 capitalize">
        {project.data.tags?.map((tag) => (
          <Badge variant={"secondary"} key={tag}>
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
