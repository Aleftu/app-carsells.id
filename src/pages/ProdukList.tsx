import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
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

const ITEMS_PER_PAGE = 15;

const ProdukList: React.FC = () => {
  const [mobilList, setMobilList] = useState<Mobil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(mobilList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMobilList = mobilList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-[#beccfc] font-semibold">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-screen-xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <FaReact className="text-4xl text-blue-500 mb-2" />
          <h1 className="text-2xl font-bold text-gray-700">Daftar Produk Mobil</h1>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentMobilList.map((mobil) => (
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
                <div className="mt-4 space-x-2">
                  <Link
                    to={`/produk/${mobil.id}`}
                    className="inline-block px-3 py-1 bg-[#6978af] text-white text-sm rounded hover:bg-[#7086d6]"
                  >
                    Lihat Detail
                  </Link>
                  <a
                    href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20mobil%20${mobil.merek}%20${mobil.tipe}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-[#374470] text-white text-sm rounded hover:bg-[#526091]"
                  >
                    Hubungi
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-[#374470] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProdukList;
