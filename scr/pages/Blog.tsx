import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  createdAt: Date;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        console.log("Fetching blog posts from Firebase...");
        
        const blogsCollection = collection(db, 'blogs');
        const querySnapshot = await getDocs(blogsCollection);
        
        const fetchedBlogs: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedBlogs.push({
            id: doc.id,
            title: data.title || '',
            content: data.content || '',
            excerpt: data.excerpt || '',
            author: data.author || '',
            publishedAt: data.publishedAt?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date()
          });
        });
        
        setBlogPosts(fetchedBlogs);
        setLoading(false);
        console.log("Blog posts loaded from Firebase:", fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, tips, and insights from our team
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-500">Blog posts will appear here once they are published.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.publishedAt?.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="text-gray-700 prose max-w-none">
                      {post.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
