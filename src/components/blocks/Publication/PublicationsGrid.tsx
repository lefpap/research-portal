import { cn } from "@/lib/app.utils";
import PublicationCard from "./PublicationCard";
import type { PublicationItem } from "@/context/publication.context";

interface PublicationsGridProps {
  publicationItems: PublicationItem[];
  className?: string;
}

function PublicationsGrid({
  publicationItems,
  className,
}: PublicationsGridProps) {
  return (
    <ul className={cn("grid items-stretch gap-10", className)}>
      {publicationItems.map((item) => {
        return (
          <li key={item.publication.id} className="overflow-hidden">
            <PublicationCard publicationItem={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default PublicationsGrid;
