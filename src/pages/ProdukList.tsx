import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Foto {
  id: number;
  url: string;
  mobil_id: number;
}

interface Mobil {
  id: number;
  merek: string;
  tipe: string;
  harga: number;
  tahun: string;
  status: string;
  foto: Foto[];
}

const ProdukList: React.FC = () => {
  const [mobilList, setMobilList] = useState<Mobil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const response = await axios.get('https://api-dealer-car-production.up.railway.app/mobil');
        setMobilList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Gagal fetch data mobil:', error);
        setError('Gagal memuat produk');
        setLoading(false);
      }
    };

    fetchMobil();
  }, []);

  // Munculkan tombol scroll to top saat user scroll ke bawah
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#beccfc] font-semibold">
        <Navbar />
        <main className="flex-grow container mx-auto max-w-screen-xl px-4 py-6">
          <Loading />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#beccfc] font-semibold">
        <Navbar />
        <main className="flex-grow container mx-auto max-w-screen-xl px-4 py-6">
          <p className="text-center text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#beccfc] font-semibold relative">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-screen-xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Daftar Produk Mobil</h1>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mobilList.map((mobil) => (
            <div key={mobil.id} className="bg-white text-gray-700 rounded-xl shadow-md overflow-hidden relative">
              {mobil.foto && mobil.foto.length > 0 ? (
                <img
                  src={mobil.foto[0].url}
                  alt={`${mobil.merek} ${mobil.tipe}`}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  Tidak ada foto
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-2 left-2 bg-[#5b6aa9] text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                {mobil.status}
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold">{mobil.merek} {mobil.tipe}</h2>
                <p className="text-sm text-gray-600 mb-1">Tahun: {mobil.tahun}</p>
                <p className="text-sm text-gray-800 font-medium">
                  Rp {mobil.harga.toLocaleString('id-ID')}
                </p>

                {/* Tombol Aksi */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/produk/${mobil.id}`}
                    className="w-full text-center px-3 py-1 bg-[#6978af] text-white text-sm rounded hover:bg-[#7086d6]"
                  >
                    Lihat Detail
                  </Link>
                  <a
                    href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20mobil%20${mobil.merek}%20${mobil.tipe}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center px-3 py-1 bg-[#374470] text-white text-sm rounded hover:bg-[#526091]"
                  >
                    Hubungi
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#374470] hover:bg-[#526091] text-white p-3 rounded-full shadow-lg transition duration-300"
        >
          <FaArrowUp />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default ProdukList;
