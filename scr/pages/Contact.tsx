import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="bg-white flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
          <div className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 mb-6 text-center">For any questions or issues related to your order, please don't hesitate to reach out.</p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a href="mailto:haseebshop378@gmail.com" className="text-blue-600 hover:underline">haseebshop378@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone/WhatsApp</h3>
                    <a href="tel:03167202164" className="text-blue-600 hover:underline">03167202164</a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
