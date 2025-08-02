import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Package, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    images: "",
    category: "",
    description: "",
    rating: "4.5"
  });
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user came from header with correct password
    const adminAccess = sessionStorage.getItem("adminAccess");
    if (adminAccess === "786512") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "786512") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAccess", "786512");
    } else {
      alert("Incorrect password");
      setPassword("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetProductForm = () => {
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      images: "",
      category: "",
      description: "",
      rating: "4.5"
    });
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title: "",
      content: "",
      excerpt: "",
      author: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add product to Firebase
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        images: formData.images.split('\n').filter(url => url.trim() !== ''),
        category: formData.category,
        description: formData.description,
        rating: parseFloat(formData.rating),
        approved: true,
        createdAt: new Date()
      };

      await addDoc(collection(db, "products"), productData);
      console.log("Product added to Firebase:", productData);
      
      setIsDialogOpen(false);
      resetProductForm();
      
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        title: blogFormData.title,
        content: blogFormData.content,
        excerpt: blogFormData.excerpt,
        author: blogFormData.author,
        published: true,
        publishedAt: new Date(),
        createdAt: new Date()
      };

      await addDoc(collection(db, "blogs"), blogData);
      console.log("Blog post added to Firebase:", blogData);
      
      setIsBlogDialogOpen(false);
      resetBlogForm();
      
      alert("Blog post published successfully!");
    } catch (error) {
      console.error("Error adding blog post:", error);
      alert("Error publishing blog post. Please try again.");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetProductForm();
  };

  const handleBlogDialogClose = () => {
    setIsBlogDialogOpen(false);
    resetBlogForm();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>

                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsBlogDialogOpen(true)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Add Blog Post
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Product Management</h2>
                <p className="text-gray-500">Click "Add Product" to start adding products to your store. All prices are in PKR.</p>
              </div>
              
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Blog Management</h2>
                <p className="text-gray-500">Click "Add Blog Post" to create and publish new blog posts for your website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="price">Price (PKR)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="99999"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="originalPrice">Original Price (PKR)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="149999"
              />
            </div>
            
            <div>
              <Label htmlFor="images">Image URLs (one per line)</Label>
              <Textarea
                id="images"
                name="images"
                value={formData.images}
                onChange={handleInputChange}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                required
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Electronics"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
              />
            </div>
            
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="4.5"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleDialogClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Add Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Blog Dialog */}
      <Dialog open={isBlogDialogOpen} onOpenChange={handleBlogDialogClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleBlogSubmit} className="space-y-4">
            <div>
              <Label htmlFor="blogTitle">Blog Title</Label>
              <Input
                id="blogTitle"
                name="title"
                value={blogFormData.title}
                onChange={handleBlogInputChange}
                placeholder="Enter blog title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="blogAuthor">Author</Label>
              <Input
                id="blogAuthor"
                name="author"
                value={blogFormData.author}
                onChange={handleBlogInputChange}
                placeholder="Author name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="blogExcerpt">Excerpt</Label>
              <Textarea
                id="blogExcerpt"
                name="excerpt"
                value={blogFormData.excerpt}
                onChange={handleBlogInputChange}
                placeholder="Brief description of the blog post"
                required
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <Label htmlFor="blogContent">Content</Label>
              <Textarea
                id="blogContent"
                name="content"
                value={blogFormData.content}
                onChange={handleBlogInputChange}
                placeholder="Write your blog post content here..."
                required
                className="min-h-[200px]"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBlogDialogClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Publish Blog Post
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Admin;
