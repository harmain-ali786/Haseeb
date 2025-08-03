import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    itemCount: 0
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    itemCount: 0
  },
  {
    id: 3,
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    itemCount: 0
  },
  {
    id: 4,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    itemCount: 0
  }
];

interface Product {
  category: string;
}

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => doc.data()) as Product[];
        
        const counts = products.reduce((acc, product) => {
          if (product.category) {
            acc[product.category] = (acc[product.category] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        setCategories(prevCategories => 
          prevCategories.map(cat => ({
            ...cat,
            itemCount: counts[cat.name] || 0
          }))
        );
      } catch (error) {
        console.error("Error fetching product counts:", error);
      }
    };

    fetchProductCounts();
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Browse our diverse range of product categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 block"
            >
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {category.itemCount} items
                  </p>
                  <div className="mt-3 sm:mt-4 bg-white text-gray-800 px-4 sm:px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 text-sm sm:text-base">
                    Shop Now
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
