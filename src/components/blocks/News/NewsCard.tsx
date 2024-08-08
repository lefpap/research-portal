import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, NewspaperIcon } from "lucide-react";
import type { CollectionEntry } from "astro:content";

interface NewsCardProps {
  article: CollectionEntry<"news">;
  className?: string;
}

function NewsCard({ article, className }: NewsCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <div className="p-3">
        <a
          href={`/news/${article.slug}`}
          className="block overflow-clip rounded-md border-2 border-transparent transition hover:border-primary"
        >
          <img
            src={article.data.coverImage}
            alt={article.id}
            className="size-full max-h-72 bg-muted bg-cover object-cover"
          />
        </a>
      </div>
      <CardHeader className="flex-grow pt-1">
        <div className="flex flex-wrap items-center justify-start gap-3">
          <a
            href={article.data.source.url}
            target="_blank"
            className="flex items-center gap-1 font-mono text-xs text-muted-foreground underline"
          >
            <NewspaperIcon className="size-4" />
            <span>{article.data.source.name}</span>
          </a>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <CalendarIcon className="size-4" />
            <span>
              {format(article.data.publishedAt, "MMM dd, yyyy").toUpperCase()}
            </span>
          </span>
        </div>
        <CardTitle className="pt-1">
          <a href={`/news/${article.slug}`} className="hover:underline">
            {article.data.title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mt-1.5 line-clamp-2 text-sm">
          {article.data.summary}
        </CardDescription>
      </CardContent>
      <CardFooter>
        {article.data.tags && (
          <ul className="flex flex-wrap items-center justify-start gap-2">
            {article.data.tags.map((tag, index) => (
              <li
                key={index}
                className="rounded bg-muted px-2 py-1 text-xs capitalize text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
