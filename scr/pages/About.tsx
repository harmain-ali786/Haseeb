import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Haseeb Store</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Welcome to Haseeb Store, your one-stop shop for the best products. We are dedicated to providing you with high-quality items and excellent customer service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
