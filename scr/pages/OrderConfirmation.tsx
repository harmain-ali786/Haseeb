import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, ArrowLeft, Package, Truck, User, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
}

const OrderConfirmation = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    city: ''
  });
  
  const deliveryCharges = 300;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return customerDetails.name.trim() !== '' && 
           customerDetails.phone.trim() !== '' && 
           customerDetails.address.trim() !== '' && 
           customerDetails.city.trim() !== '';
  };

  const handleConfirmOrder = () => {
    if (!product || !isFormValid()) return;
    
    const total = product.price + deliveryCharges;
    const message = `Hi! I want to confirm my order:

📦 Product: ${product.name}
💰 Price: PKR ${product.price.toLocaleString()}
🚚 Delivery Charges: PKR ${deliveryCharges.toLocaleString()}
💳 Total Amount: PKR ${total.toLocaleString()}

👤 Customer Details:
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}
City: ${customerDetails.city}

Please confirm availability and delivery details.`;
    
    const whatsappUrl = `https://wa.me/923167202164?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
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

  const displayImage = (product.images && product.images.length > 0) ? product.images[0] : product.image || "https://via.placeholder.com/600x400.png?text=No+Image";
  const total = product.price + deliveryCharges;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Button 
                    onClick={handleGoBack}
                    variant="ghost" 
                    size="sm"
                    className="mr-3"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                </div>
                <CardTitle className="text-xl sm:text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img 
                      src={displayImage} 
                      alt={product.name}
                      className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">PKR {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">PKR {product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">Product Price</span>
                    </div>
                    <span className="font-semibold">PKR {product.price.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">Delivery Charges</span>
                    </div>
                    <span className="font-semibold">PKR {deliveryCharges.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 bg-gray-50 rounded-lg px-4">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-blue-800 mb-2">📋 Order Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Payment Method: Cash on Delivery (COD)</li>
                    <li>• Delivery Time: 7-10 working days</li>
                    <li>• <strong>Return Policy: You can return your order within 4 days</strong></li>
                    <li>• Delivery charges apply nationwide</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center text-sm font-medium mb-2">
                      <User className="w-4 h-4 mr-2" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g., +92 300 1234567"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="flex items-center text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      Complete Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={customerDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="House/Flat No., Street, Area, Landmark"
                      className="w-full min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="flex items-center text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      City *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter your city"
                      className="w-full"
                    />
                  </div>

                  <Button 
                    onClick={handleConfirmOrder}
                    disabled={!isFormValid()}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 text-lg font-semibold rounded-lg flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 mt-6"
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Confirm Order via WhatsApp</span>
                  </Button>

                  <div className="text-center text-sm text-gray-600 mt-4">
                    <p>📞 WhatsApp: +92 316 7202164</p>
                    <p className="mt-1">💬 Quick response guaranteed!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
