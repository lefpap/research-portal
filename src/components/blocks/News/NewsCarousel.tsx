import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NewsCard from "./NewsCard";
import { cn } from "@/lib/app.utils";
import type { NewsItem } from "@/context/news.context";

interface NewsCarouselProps {
  newsItems: NewsItem[];
  className?: string;
}

function NewsCarousel({ newsItems, className }: NewsCarouselProps) {
  return (
    <Carousel
      className={cn(className)}
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {newsItems.map((newsItem, index) => (
          <CarouselItem key={index}>
            <NewsCard newsItem={newsItem} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default NewsCarousel;
