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
import { useRef, useState } from "react";
import type { PublicationWithAuthors } from "@/context/publication.context";
import Publicationinfo from "./Publicationinfo";

interface PublicationCardProps {
  publication: PublicationWithAuthors;
  className?: string;
}

function PublicationCard({ publication }: PublicationCardProps) {
  const [citeOpen, setCiteOpen] = useState(false);
  const citeRef = useRef<HTMLPreElement>(null);

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
        <CardDescription className="line-clamp-3">
          {publication.data.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Publicationinfo
          publication={publication}
          authors={publication.authors}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-start gap-1.5 capitalize">
        {publication.data.tags?.map((tag) => (
          <Badge variant={"secondary"} key={tag}>
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}

export default PublicationCard;
