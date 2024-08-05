import CollectionOrEmptyMessage from "@/components/utility/CollectionOrEmptyMessage";
import { cn } from "@/lib/utils";
import PublicationCard from "./PublicationCard";
import { usePublicationsCtx } from "@/hooks/usePublicationsCtx.hook";

interface PublicationsGridProps {
  className?: string;
}

function PublicationsGrid({ className }: PublicationsGridProps) {
  const { publications } = usePublicationsCtx();

  return (
    <CollectionOrEmptyMessage
      collection={publications}
      emptyMessage={
        <p className="text-center text-sm text-muted-foreground">
          No publications to display
        </p>
      }
    >
      <ul className={cn("grid items-stretch gap-10", className)}>
        {publications.map((publication) => {
          return (
            <li key={publication.id} className="overflow-hidden">
              <PublicationCard publication={publication} />
            </li>
          );
        })}
      </ul>
    </CollectionOrEmptyMessage>
  );
}

export default PublicationsGrid;
