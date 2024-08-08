import { cn } from "@/lib/utils";
import PublicationsGrid from "@/components/blocks/Publication/PublicationsGrid";
import PublicationFilters from "@/components/blocks/Publication/PublicationFilters";
import {
  PublicationProvider,
  type PublicationProviderProps,
} from "@/context/publication.context";

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
          <PublicationsGrid className="flex-1" />
        </div>
      </div>
    </PublicationProvider>
  );
}

export default PublicationsDisplay;
