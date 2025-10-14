// import Image from "next/image";
// import { useEffect, useState } from "react";

// // Default assets fallback
// import portfolio1 from "@/assets/akarva-1.jpg";
// import portfolio2 from "@/assets/akarva-7.jpg";
// import portfolio3 from "@/assets/akarva-3.jpg";
// import portfolio4 from "@/assets/akarva-4.jpg";
// import portfolio5 from "@/assets/akarva-5.jpg";
// import portfolio6 from "@/assets/akarva-6.jpg";

// interface ImageSlot {
//   id: number;
//   url: string | null;
//   title?: string;
//   order?: number;
// }

// const defaultPortfolio: ImageSlot[] = [
//   { id: 1, url: portfolio1.src, order: 1, title: "Sample Ruby Necklace" },
//   { id: 2, url: portfolio2.src, order: 2, title: "Sample Diamond Earrings" },
//   { id: 3, url: portfolio6.src, order: 3, title: "Sample Engagement Ring" },
//   { id: 4, url: portfolio4.src, order: 4, title: "Sample Pearl Necklace" },
//   { id: 5, url: portfolio5.src, order: 5, title: "Sample Sapphire Bracelet" },
//   { id: 6, url: portfolio3.src, order: 6, title: "Sample Emerald Bracelet" },
// ];

// const Portfolio = () => {
//   const [portfolioItems, setPortfolioItems] = useState<ImageSlot[]>([]);

//   useEffect(() => {
//     const fetchHeroImages = async () => {
//       try {
//         const res = await fetch("/hero-images.json", { cache: "no-store" });
//         if (!res.ok) throw new Error("Failed to fetch hero images JSON");

//         const data: ImageSlot[] = await res.json();
//         const sorted = data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
//         setPortfolioItems(sorted);
//       } catch (err) {
//         console.warn("Falling back to default portfolio:", err);
//         setPortfolioItems(defaultPortfolio);
//       }
//     };

//     fetchHeroImages();
//   }, []);

//   return (
//     <section id="portfolio" className="py-24 bg-secondary/20">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold mb-4">
//             Our Work Speaks
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Exceptional craftsmanship in every detail
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {portfolioItems.map((item) =>
//             item.url ? (
//               <div
//                 key={item.id}
//                 className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer hover-lift"
//               >
//                 <Image
//                   src={item.url}
//                   alt={item.title ?? "Portfolio item"}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="absolute bottom-0 left-0 right-0 p-6">
//                     <h3 className="text-xl font-serif font-semibold text-foreground">
//                       {item.title}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             ) : null
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Portfolio;

import Image from "next/image";
import { useEffect, useState } from "react";

// Default assets fallback
import portfolio1 from "@/assets/akarva-1.jpg";
import portfolio2 from "@/assets/akarva-7.jpg";
import portfolio3 from "@/assets/akarva-3.jpg";
import portfolio4 from "@/assets/akarva-4.jpg";
import portfolio5 from "@/assets/akarva-5.jpg";
import portfolio6 from "@/assets/akarva-6.jpg";

interface ImageSlot {
  id: number;
  url: string | null;
  title?: string;
  order?: number;
  published?: boolean; // <-- add this field
}

const defaultPortfolio: ImageSlot[] = [
  { id: 1, url: portfolio1.src, order: 1, title: "Sample Ruby Necklace" },
  { id: 2, url: portfolio2.src, order: 2, title: "Sample Diamond Earrings" },
  { id: 3, url: portfolio6.src, order: 3, title: "Sample Engagement Ring" },
  { id: 4, url: portfolio4.src, order: 4, title: "Sample Pearl Necklace" },
  { id: 5, url: portfolio5.src, order: 5, title: "Sample Sapphire Bracelet" },
  { id: 6, url: portfolio3.src, order: 6, title: "Sample Emerald Bracelet" },
];

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<ImageSlot[]>([]);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await fetch("/hero-images.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch hero images JSON");

        const data: ImageSlot[] = await res.json();

        // ✅ Filter only published items, then sort
        const visibleItems = data
          .filter((item) => item.published) // <-- only published = true
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setPortfolioItems(visibleItems);
      } catch (err) {
        console.warn("Falling back to default portfolio:", err);
        setPortfolioItems(defaultPortfolio);
      }
    };

    fetchHeroImages();
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold mb-4">
            Our Work Speaks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exceptional craftsmanship in every detail
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map(
            (item) =>
              item.url && (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer hover-lift"
                >
                  <Image
                    src={item.url}
                    alt={item.title ?? "Portfolio item"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-serif font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
