import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import GradientBackground from '../components/Background';
import Loading from '../components/Loading';
import ProdukPrev from './ProdukPrev';
import Footer from '../components/Footer';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GradientBackground />

      {/* Daftar Produk */}
      <div className="bg-slate-200 py-6">
        <div className="flex justify-center mb-8">
          <div className="relative w-[92%] md:w-[80%] bg-[#bcc3e4] py-6 px-4 rounded-b-3xl shadow-lg text-center overflow-visible">
            {/* Notch kiri */}
            <div className="absolute -top-6 left-0 w-14 h-7 bg-white rounded-br-full"></div>

            {/* Notch kanan */}
            <div className="absolute -top-6 right-0 w-14 h-7 bg-white rounded-bl-full"></div>

            {/* Teks */}
            <h2 className="text-gray-600 text-xl md:text-2xl font-extrabold">
              Beli Mobil 45Motor Certified
            </h2>
          </div>
        </div>

        <section id="produk-preview" className="card rounded-lg p-5">
          <ProdukPrev />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
