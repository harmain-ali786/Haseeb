import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Haseeb Store</h3>
            <p className="text-gray-300 mb-4">
              Your trusted online shopping destination for quality products at amazing prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Instagram</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center"><Home size={16} className="mr-2" />Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/Electronics" className="text-gray-300 hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/category/Fashion" className="text-gray-300 hover:text-white transition-colors">Fashion</Link></li>
              <li><Link to="/category/Home%20&%20Living" className="text-gray-300 hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link to="/category/Sports" className="text-gray-300 hover:text-white transition-colors">Sports</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Books</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Haseeb Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
