import Image from "next/image";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: number;
  base64: string;
  order: number;
  published: boolean;
  title: string;
}

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<GalleryImage[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchGalleryImages = async () => {
    try {
      // Add timestamp and random number to prevent caching
      const cacheBuster = `t=${Date.now()}&r=${Math.random()}`;
      const res = await fetch(`/gallery-images.json?${cacheBuster}`, { 
        cache: "no-store",
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!res.ok) throw new Error("Failed to fetch gallery images");

      const data: GalleryImage[] = await res.json();
      
      // Filter items with base64 content and sort by order (show all for now)
      const visibleItems = data
        .filter(item => item.base64)
        .sort((a, b) => a.order - b.order);

      setPortfolioItems(visibleItems);
    } catch (err) {
      console.warn("Failed to load gallery images:", err);
      setPortfolioItems([]);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <section id="portfolio" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold">
              Our Work Speaks
            </h2>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exceptional craftsmanship in every detail
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer hover-lift"
            >
              <Image
                src={item.base64}
                alt={item.title || `Portfolio item ${item.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-serif font-semibold text-foreground">
                    {item.title || `Image ${item.id}`}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
