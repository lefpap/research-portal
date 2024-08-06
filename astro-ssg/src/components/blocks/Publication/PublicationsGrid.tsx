import CollectionOrEmptyMessage from "@/components/utility/CollectionOrEmptyMessage";
import { cn } from "@/lib/utils";
import PublicationCard from "./PublicationCard";
import { usePublicationsCtx } from "@/hooks/usePublicationsCtx.hook";

interface PublicationsGridProps {
  className?: string;
}

function PublicationsGrid({ className }: PublicationsGridProps) {
  const { publicationItems } = usePublicationsCtx();

  return (
    <CollectionOrEmptyMessage
      collection={publicationItems}
      emptyMessage={
        <p className="text-center text-sm text-muted-foreground">
          No publications to display
        </p>
      }
    >
      <ul className={cn("grid items-stretch gap-10", className)}>
        {publicationItems.map((item) => {
          return (
            <li key={item.publication.id} className="overflow-hidden">
              <PublicationCard publicationItem={item} />
            </li>
          );
        })}
      </ul>
    </CollectionOrEmptyMessage>
  );
}

export default PublicationsGrid;
