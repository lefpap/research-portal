import { cn } from "@/lib/utils";
import PublicationsGrid from "@/components/blocks/Publication/PublicationsGrid";
import PublicationFilters from "@/components/blocks/Publication/PublicationFilters";
import {
  PublicationProvider,
  type PublicationProviderProps,
} from "@/context/publication.context";
import { usePublicationsCtx } from "@/hooks/usePublicationsCtx.hook";

interface PublicationsDisplayProps
  extends Omit<PublicationProviderProps, "children"> {
  className?: string;
}

function PublicationsDisplay({
  initialPublicationItems: initialPublications,
  authors,
  tags,
  className,
}: PublicationsDisplayProps) {
  return (
    <PublicationProvider
      initialPublicationItems={initialPublications}
      authors={authors}
      tags={tags}
    >
      <div
        className={cn(
          "flex flex-col items-stretch justify-between gap-5 md:flex-row",
          className,
        )}
      >
        <div className="w-full md:w-2/4">
          <PublicationFilters className="sm:sticky sm:top-28" />
        </div>
        <div className={"flex w-full"}>
          <PublicationItemsDisplay className="flex-1" />
        </div>
      </div>
    </PublicationProvider>
  );
}

function PublicationItemsDisplay({ className }: { className?: string }) {
  const { publicationItems } = usePublicationsCtx();

  if (publicationItems.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No publications to display
      </p>
    );
  }

  return (
    <PublicationsGrid
      publicationItems={publicationItems}
      className={className}
    />
  );
}

export default PublicationsDisplay;
