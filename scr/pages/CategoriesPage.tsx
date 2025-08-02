import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Categories from "@/components/Categories";

const CategoriesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
