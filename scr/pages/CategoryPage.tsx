import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { collection, getDocs, query, where } from "firebase/firestore";
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

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const decodedCategoryName = decodeURIComponent(categoryName || '');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!decodedCategoryName) {
        setLoading(false);
        return;
      }
      
      try {
        console.log("Fetching products for category:", decodedCategoryName);
        
        const productsCollection = collection(db, 'products');
        const categoryQuery = query(
          productsCollection, 
          where('category', '==', decodedCategoryName)
        );
        const querySnapshot = await getDocs(categoryQuery);
        
        const categoryProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          categoryProducts.push({
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
        
        setProducts(categoryProducts);
        setLoading(false);
        console.log("Products loaded for category:", categoryProducts);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [decodedCategoryName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center lg:text-left">
            Products in: {decodedCategoryName}
          </h1>
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">There are currently no products available in the "{decodedCategoryName}" category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
