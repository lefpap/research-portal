import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import ClipboardCopy from "@/components/utility/ClipboardCopy";
import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";
import { format } from "date-fns";
import {
  CalendarIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  LinkIcon,
  UserPenIcon,
} from "lucide-react";
import { useRef, useState } from "react";

interface PublicationInfoProps {
  publication: CollectionEntry<"publications">;
  authors: CollectionEntry<"authors">[];
  className?: string;
}

export default function Publicationinfo({
  publication,
  authors,
  className,
}: PublicationInfoProps) {
  const [citeOpen, setCiteOpen] = useState(false);
  const citeRef = useRef<HTMLPreElement>(null);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="not-prose flex items-center justify-start gap-3 font-mono text-sm">
        <CalendarIcon className="size-4 shrink-0" />
        <time className="uppercase text-muted-foreground">
          {format(publication.data.publishedAt, "MMM dd, yyyy")}
        </time>
      </div>
      <div className="not-prose flex items-start justify-start gap-3 font-mono text-sm">
        <UserPenIcon className="size-4 shrink-0" />
        <ul className="flex flex-wrap items-center justify-start">
          <>
            {authors.map((author) => (
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
            {publication.data.externalAuthors?.map((externalAuthor) => (
              <li className="group" key={externalAuthor.fullname}>
                {externalAuthor.url ? (
                  <a
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline"
                    target="_blank"
                    href={externalAuthor.url}
                  >
                    {externalAuthor.fullname}
                    <ExternalLinkIcon className="size-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground">
                    {externalAuthor.fullname}
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
      <div className="not-prose flex w-full items-center justify-start gap-3 font-mono text-sm">
        <FileTextIcon className="size-4 shrink-0" />
        <button
          className="inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline"
          onClick={() => setCiteOpen((prev) => !prev)}
        >
          Cite
          <CodeIcon className="size-3" />
        </button>

        {publication.data.doi && (
          <a
            className="inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition hover:text-foreground hover:underline"
            href={publication.data.doi}
            target="_blank"
          >
            Doi
            <ExternalLinkIcon className="size-3" />
          </a>
        )}
      </div>
      <Collapsible open={citeOpen}>
        <CollapsibleContent className="prose relative max-w-none prose-pre:bg-accent prose-pre:text-accent-foreground">
          <ClipboardCopy
            targetRef={citeRef}
            className="absolute right-0 top-0 mr-1 mt-1 text-accent-foreground hover:bg-primary/10"
          />
          <pre ref={citeRef} className="whitespace-pre" data-language="bibtex">
            <code>{publication.data.cite}</code>
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
