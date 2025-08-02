import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Star, Image as ImageIcon, ShoppingCart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { doc, getDoc } from "firebase/firestore";
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

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      
      try {
        console.log("Fetching product from Firebase for ID:", productId);
        
        const productDoc = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDoc);
        
        if (productSnapshot.exists()) {
          const data = productSnapshot.data();
          const fetchedProduct: Product = {
            id: productSnapshot.id,
            name: data.name || '',
            price: data.price || 0,
            originalPrice: data.originalPrice,
            images: data.images || [],
            rating: data.rating || 0,
            category: data.category || '',
            description: data.description || ''
          };
          
          setProduct(fetchedProduct);
          console.log("Product loaded from Firebase:", fetchedProduct);
        } else {
          console.log("Product not found");
          setProduct(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleOrderNow = () => {
    if (!product) return;
    navigate(`/order-confirmation/${product.id}`);
  };

  const handleAddToCart = () => {
    if (!product) return;
    // Add to cart functionality - for now just show alert
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Product not found.</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productImages = (product.images && product.images.length > 0) ? product.images : (product.image ? [product.image] : []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              {productImages.length > 0 ? (
                <Carousel className="w-full group" opts={{ loop: productImages.length > 1 }}>
                  <CarouselContent>
                    {productImages.map((imgSrc, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square flex items-center justify-center">
                          <img 
                            src={imgSrc} 
                            alt={`${product.name} image ${index + 1}`} 
                            className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {productImages.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </Carousel>
              ) : (
                <div className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
                  <ImageIcon className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-1/2">
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.rating} rating)</span>
              </div>
              
              <div className="mb-6">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">PKR {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-gray-400 line-through ml-3">PKR {product.originalPrice.toLocaleString()}</span>
                )}
                {product.originalPrice && (
                  <div className="mt-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
                      Save PKR {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              
              {product.description && (
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Description</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">{product.description}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-500 text-white px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center space-x-2 transition-all duration-300 text-base sm:text-lg transform hover:scale-105"
                  >
                    <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button 
                    onClick={handleOrderNow}
                    className="flex-1 bg-green-500 text-white px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center space-x-2 transition-all duration-300 text-base sm:text-lg transform hover:scale-105"
                  >
                    <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                    <span>Order Now</span>
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  <p>📞 WhatsApp: +92 316 7202164</p>
                  <p className="mt-1">💬 Quick response guaranteed!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
