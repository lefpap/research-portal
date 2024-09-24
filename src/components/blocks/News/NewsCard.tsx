import { cn } from "@/lib/app.utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NewsInfo from "./NewsInfo";
import ArticlePlaceHolderImage from "@/content/news/_images/_placeholder.png";
import { extractLangFromUri, translateUri } from "@/lib/i18n.utils";
import type { NewsItem } from "@/context/news.context";

interface NewsCardProps {
  newsItem: NewsItem;
  className?: string;
}

function NewsCard({ newsItem, className }: NewsCardProps) {
  const { article } = newsItem;
  const [lang] = extractLangFromUri(article.slug);
  return (
    <Card className={cn("flex flex-col", className)}>
      <div className="p-3">
        <a
          href={translateUri(`/news/${article.slug}`, lang)}
          className="block overflow-clip rounded-md border-2 border-transparent transition hover:border-primary"
        >
          <img
            src={article.data?.cover?.src ?? ArticlePlaceHolderImage.src}
            alt={article.slug}
            width={article.data?.cover?.width}
            height={article.data?.cover?.height}
            className="size-full max-h-72 bg-muted bg-cover object-cover"
          />
        </a>
      </div>
      <CardHeader className="flex-grow pt-1">
        <CardTitle className="pt-1">
          <a
            href={translateUri(`/news/${article.slug}`, lang)}
            className="hover:underline"
          >
            {article.data.title}
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {article.data.summary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NewsInfo newsItem={newsItem} />
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
