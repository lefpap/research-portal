import type { NewsItem } from "@/context/news.context";
import { extractLangFromUri, translateUri } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  LinkIcon,
  NewspaperIcon,
  UserPenIcon,
} from "lucide-react";

interface NewsInfoProps {
  newsItem: NewsItem;
  minutesRead?: number;
  className?: string;
}

function NewsInfo({ newsItem, minutesRead, className }: NewsInfoProps) {
  const { article, author } = newsItem;

  const [lang] = extractLangFromUri(article.slug);

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
      <div className="flex items-start justify-start gap-3">
        <UserPenIcon className="size-4 shrink-0" />
        <a
          href={translateUri(`/team/${author.slug}`, lang)}
          className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline"
        >
          {`${author?.data.firstname} ${author?.data.lastname}`}
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
