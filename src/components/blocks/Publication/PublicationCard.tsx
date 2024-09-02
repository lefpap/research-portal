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
import type { PublicationItem } from "@/context/publication.context";
import PublicationInfo from "@/components/blocks/Publication/PublicationInfo";
import { cn } from "@/lib/utils";

interface PublicationCardProps {
  publicationItem: PublicationItem;
  className?: string;
}

function PublicationCard({ publicationItem }: PublicationCardProps) {
  const { publication } = publicationItem;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <a
            href={`/publications/${publication.slug}`}
            className="group flex items-center gap-3 hover:underline"
          >
            {publication.data.title}
            <LinkIcon className="hidden size-5 group-hover:block" />
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {publication.data.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <PublicationInfo publicationItem={publicationItem} />
      </CardContent>
      <CardFooter>
        <ul
          className={cn(
            "flex flex-wrap items-center justify-start gap-1.5 capitalize",
            { hidden: publication.data.tags === undefined },
          )}
        >
          {publication.data.tags?.map((tag) => (
            <Badge variant={"secondary"} key={tag}>
              {tag}
            </Badge>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}

export default PublicationCard;
