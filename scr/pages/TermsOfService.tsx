import Header from "@/components/Header";
import Footer from "@/components/Footer";
const TermsOfService = () => {
  return <>
      <Header />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Terms of Service</h1>
          <div className="prose lg:prose-xl max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg">
            <p>By placing an order on our website, you agree to the following terms and conditions:</p>
            
            <h2>🛍️ HaseebStore Return Policy</h2>
            <p>At HaseebStore, all sales are final — we currently do not offer returns or exchanges on any products.


Please double-check product details before placing your order.
If your item arrives damaged or incorrect, contact us within 24 hours of delivery at haseebshop378@gmail.com with proof (photo/video).

We’re here to help with any questions before you buy — thanks for shopping with HaseebStore 💙</p>
            
            <h2>Delivery Charges</h2>
            <p>A flat delivery fee of PKR 300 applies to all orders, regardless of location or order size.</p>
            
            <h2>Cash on Delivery (COD)</h2>
            <p>We only offer Cash on Delivery (COD) as a payment method. Please ensure someone is available at the provided address to receive the order and make the payment.</p>
            
            <h2>Order Confirmation</h2>
            <p>Once your order is placed, you will receive a confirmation message via WhatsApp, SMS, or email. Please verify all order details at that time.</p>
            
            <h2>Delivery Time</h2>
            <p>Delivery usually takes 7 to 10 working days, depending on your location. We are not responsible for delays caused by courier services or unforeseen circumstances.</p>
            
            <h2>Contact Us</h2>
            <p>For any questions or issues related to your order, please contact us at:</p>
            <ul>
              <li>Email: <a href="mailto:haseebshop378@gmail.com" className="text-blue-600 hover:underline">haseebshop378@gmail.com</a></li>
              <li>Phone/WhatsApp: <a href="tel:03167202164" className="text-blue-600 hover:underline">03167202164</a></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>;
};
export default TermsOfService;
