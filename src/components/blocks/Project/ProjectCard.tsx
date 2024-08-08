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

interface ProjectCardProps {
  projectItem: ProjectItem;
  className?: string;
}

function ProjectCard({ projectItem }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <a
            href={`/projects/${projectItem.project.slug}`}
            className="group flex items-center gap-3 hover:underline"
          >
            {projectItem.project.data.title}
            <LinkIcon className="hidden size-5 group-hover:block" />
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {projectItem.project.data.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <ProjectInfo projectItem={projectItem} />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-start gap-1.5 capitalize">
        {projectItem.project.data.tags?.map((tag) => (
          <Badge variant={"secondary"} key={tag}>
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
