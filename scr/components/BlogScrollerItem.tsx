import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

interface BlogScrollerItemProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  image?: string;
}

const BlogScrollerItem = ({ id, title, excerpt, author, publishedAt, image }: BlogScrollerItemProps) => {
  const displayImage = image || "https://via.placeholder.com/300x200.png?text=Blog+Post";

  return (
    <Link to={`/blog#${id}`} className="block group flex-shrink-0 w-64">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-full">
        <div className="relative overflow-hidden">
          <img 
            src={displayImage} 
            alt={title} 
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-sm text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-xs text-gray-600 mb-3 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{publishedAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogScrollerItem;
