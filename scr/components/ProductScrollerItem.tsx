import { Link } from "react-router-dom";
import { MessageCircle, ShoppingCart } from "lucide-react";

interface ProductScrollerItemProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  category: string;
}

const ProductScrollerItem = ({ id, name, price, originalPrice, image, images, category }: ProductScrollerItemProps) => {
  const displayImage = (images && images.length > 0) ? images[0] : image || "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <Link to={`/product/${id}`} className="block group flex-shrink-0 w-64">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-full">
        <div className="relative overflow-hidden">
          <img 
            src={displayImage} 
            alt={name} 
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          {originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{category}</p>
          <h3 className="font-semibold text-sm text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-blue-600">PKR {price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">PKR {originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 text-xs">
              <ShoppingCart size={14} />
              Add
            </button>
            <button className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1 text-xs">
              <MessageCircle size={14} />
              Order
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductScrollerItem;
