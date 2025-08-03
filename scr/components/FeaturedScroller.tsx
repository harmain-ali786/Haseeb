import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductScrollerItem from "./ProductScrollerItem";
import BlogScrollerItem from "./BlogScrollerItem";
import { Button } from "./ui/button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  category: string;
  approved?: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  image?: string;
}

const FeaturedScroller = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const productScrollRef = useRef<HTMLDivElement>(null);
  const blogScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from Firebase...");
        
        // Fetch products
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const fetchedProducts: Product[] = [];
        productsSnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProducts.push({
            id: doc.id,
            name: data.name || '',
            price: data.price || 0,
            originalPrice: data.originalPrice,
            images: data.images || [],
            category: data.category || '',
            approved: data.approved
          });
        });
        
        // Fetch blogs
        const blogsCollection = collection(db, 'blogs');
        const blogsSnapshot = await getDocs(blogsCollection);
        const fetchedBlogs: BlogPost[] = [];
        blogsSnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedBlogs.push({
            id: doc.id,
            title: data.title || '',
            content: data.content || '',
            excerpt: data.excerpt || '',
            author: data.author || '',
            publishedAt: data.publishedAt?.toDate() || new Date(),
            image: data.image
          });
        });
        
        setProducts(fetchedProducts);
        setBlogs(fetchedBlogs);
        setLoading(false);
        console.log("Data loaded from Firebase:", { products: fetchedProducts, blogs: fetchedBlogs });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 280;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Featured Products */}
        {products.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
                <p className="text-gray-600">Discover our hand-picked selection of amazing products</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(productScrollRef, 'left')}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(productScrollRef, 'right')}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div 
              ref={productScrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => (
                <ProductScrollerItem key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}

        {/* Latest Blogs */}
        {blogs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Blogs</h2>
                <p className="text-gray-600">Stay updated with our latest news and insights</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(blogScrollRef, 'left')}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(blogScrollRef, 'right')}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div 
              ref={blogScrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {blogs.map((blog) => (
                <BlogScrollerItem key={blog.id} {...blog} />
              ))}
            </div>
          </div>
        )}

        {products.length === 0 && blogs.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Featured Content Yet</h3>
            <p className="text-gray-500">Featured products and blogs will appear here once added.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedScroller;
