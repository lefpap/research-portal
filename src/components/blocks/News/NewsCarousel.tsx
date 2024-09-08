import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NewsCard from "./NewsCard";
import type { CollectionEntry } from "astro:content";
import { cn } from "@/lib/utils";

interface NewsCarouselProps {
  newsItems: CollectionEntry<"news">[];
  className?: string;
}

function NewsCarousel({ newsItems, className }: NewsCarouselProps) {
  return (
    <Carousel
      className={cn("", className)}
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {newsItems.map((newsItem, index) => (
          <CarouselItem key={index}>
            <NewsCard article={newsItem} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default NewsCarousel;
