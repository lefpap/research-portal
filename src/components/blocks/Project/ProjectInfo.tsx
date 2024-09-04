import type { ProjectItem } from "@/context/project.context";
import { cn } from "@/lib/utils";
import {
  ExternalLinkIcon,
  GlobeIcon,
  LinkIcon,
  UserPenIcon,
} from "lucide-react";

interface ProjectInfoProps {
  projectItem: ProjectItem;
  className?: string;
}

export default function ProjectInfo({
  projectItem,
  className,
}: ProjectInfoProps) {
  const hasRepo = projectItem.project.data.repo !== undefined;
  const hasDemo = projectItem.project.data.demo !== undefined;
  const hasLinks = hasRepo || hasDemo;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="not-prose flex items-start justify-start gap-3 font-mono text-sm">
        <UserPenIcon className="size-4 shrink-0" />
        <ul className="flex flex-wrap items-center justify-start">
          <>
            {projectItem.authors.map((author) => (
              <li className="group" key={author.id}>
                <a
                  href={`/team/${author?.slug}`}
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline"
                >
                  {`${author?.data.firstname} ${author?.data.lastname}`}
                  <LinkIcon className="size-3" />
                </a>
                <span className="mr-2 text-muted-foreground group-last:hidden">
                  ,
                </span>
              </li>
            ))}
            {projectItem.project.data.externalAuthors?.map((externalAuthor) => (
              <li className="group" key={externalAuthor.name}>
                {externalAuthor.url ? (
                  <a
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline"
                    target="_blank"
                    href={externalAuthor.url}
                  >
                    {externalAuthor.name}
                    <ExternalLinkIcon className="size-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground">
                    {externalAuthor.name}
                  </span>
                )}
                <span className="mr-2 text-muted-foreground group-last:hidden">
                  ,
                </span>
              </li>
            ))}
          </>
        </ul>
      </div>
      {hasLinks && (
        <div className="not-prose flex w-full items-center justify-start gap-3 font-mono text-sm">
          <GlobeIcon className="size-4 shrink-0" />
          {hasRepo && (
            <a className="inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline">
              Repo
              <ExternalLinkIcon className="size-3" />
            </a>
          )}
          {hasDemo && (
            <a className="inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline">
              Demo
              <ExternalLinkIcon className="size-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
