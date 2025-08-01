import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GradientBackground from "../components/Background";
import Loading from "../components/Loading";
import ProdukPrev from "./ProdukPrev";
import Footer from "../components/Footer";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  // Simulasi delay loading 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  

 return (
  <div className="min-h-screen flex flex-col overflow-x-hidden">
    <Navbar />
    <GradientBackground />
    <hr className="mt-3 w-44 mx-auto" />
    <h1 className="text-center mt-1">Daftar Produk</h1>

    <div className="mb-5 card rounded-md bg-[#beccfc] mt-3">
      <ProdukPrev />
    </div>

    <Footer />
  </div>
);

};

export default HomePage;
