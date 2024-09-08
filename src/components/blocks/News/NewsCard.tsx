import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CollectionEntry } from "astro:content";
import { Badge } from "@/components/ui/badge";
import NewsInfo from "./NewsInfo";
import ArticlePlaceHolderImage from "@/content/news/article-placeholder.png";

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
            src={article.data?.cover?.src ?? ArticlePlaceHolderImage.src}
            alt={article.id}
            className="size-full max-h-72 bg-muted bg-cover object-cover"
          />
        </a>
      </div>
      <CardHeader className="flex-grow pt-1">
        <CardTitle className="pt-1">
          <a href={`/news/${article.slug}`} className="hover:underline">
            {article.data.title}
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {article.data.summary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NewsInfo article={article} />
      </CardContent>
      <CardFooter>
        <ul
          className={cn(
            "flex flex-wrap items-center justify-start gap-1.5 capitalize",
            { hidden: article.data.tags === undefined },
          )}
        >
          {article.data.tags?.map((tag) => (
            <Badge variant={"secondary"} key={tag}>
              {tag}
            </Badge>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
