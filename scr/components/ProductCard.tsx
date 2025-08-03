import { MessageCircle, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface ProductCardProps {
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

const ProductCard = ({ id, name, price, originalPrice, image, images, rating, category }: ProductCardProps) => {
  const displayImage = (images && images.length > 0) ? images[0] : image || "https://via.placeholder.com/600x400.png?text=No+Image";
  const navigate = useNavigate();

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/order-confirmation/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart functionality - for now just show alert
    alert(`${name} added to cart!`);
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in ${name} (PKR ${price.toLocaleString()}). Please share more details.`;
    const whatsappUrl = `https://wa.me/923167202164?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img 
            src={displayImage} 
            alt={name} 
            className="w-full h-48 sm:h-56 md:h-48 lg:h-56 xl:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {originalPrice && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </div>
          )}
          <button 
            onClick={handleQuickOrder}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-green-600"
          >
            <MessageCircle size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
        
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">{category}</p>
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 hover:text-blue-600 transition-colors flex-grow line-clamp-2">
            {name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm sm:text-base ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({rating})</span>
          </div>
          
          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-lg sm:text-xl font-bold text-blue-600">PKR {price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">PKR {originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <button 
                onClick={handleOrderNow}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium"
              >
                <MessageCircle size={16} />
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
