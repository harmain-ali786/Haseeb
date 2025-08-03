import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  rating: number;
  category: string;
  description?: string;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from Firebase...");
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);
        
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProducts.push({
            id: doc.id,
            name: data.name || '',
            price: data.price || 0,
            originalPrice: data.originalPrice,
            images: data.images || [],
            rating: data.rating || 0,
            category: data.category || '',
            description: data.description || ''
          });
        });
        
        setProducts(fetchedProducts);
        setLoading(false);
        console.log("Products loaded from Firebase:", fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayedProducts = showAll ? products : products.slice(0, 8);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of top-quality products at amazing prices
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Available</h3>
            <p className="text-gray-500">Products will appear here once they are added to the store.</p>
          </div>
        ) : (
          <>
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {displayedProducts.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <ProductCard {...product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg border-2 hover:bg-gray-50 h-10 w-10 md:h-12 md:w-12" />
                <CarouselNext className="-right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg border-2 hover:bg-gray-50 h-10 w-10 md:h-12 md:w-12" />
              </Carousel>
            </div>
            
            {products.length > 8 && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => setShowAll(!showAll)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  {showAll ? 'Show Less' : 'View All Products'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
