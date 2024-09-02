import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, LinkIcon, NewspaperIcon } from "lucide-react";
import React from "react";

interface NewsInfoProps {
  article: CollectionEntry<"news">;
  minutesRead?: number;
  className?: string;
}

function NewsInfo({ article, minutesRead, className }: NewsInfoProps) {
  return (
    <div className={cn("flex flex-col gap-1 font-mono text-sm", className)}>
      <div className="flex items-start justify-start gap-3">
        <NewspaperIcon className="size-4 shrink-0" />
        <a
          href={`${article.data.source.url}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline"
        >
          {`${article.data.source.name}`}
          <LinkIcon className="size-3" />
        </a>
      </div>
      <div className="flex items-start justify-start gap-3 font-mono text-sm">
        <CalendarIcon className="size-4 shrink-0" />
        <time className="uppercase text-muted-foreground">
          {format(article.data.publishedAt, "MMM dd, yyyy")}
        </time>
      </div>
      <div
        className={cn("flex items-start justify-start gap-3", {
          hidden: minutesRead === undefined,
        })}
      >
        <ClockIcon className="size-4 shrink-0" />
        <span className="uppercase text-muted-foreground">{`${minutesRead} min read`}</span>
      </div>
    </div>
  );
}

export default NewsInfo;
