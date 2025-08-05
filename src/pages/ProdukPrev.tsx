import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Mobil {
  id: number;
  merek: string;
  tipe: string;
  harga: string;
  tahun: string;
  foto: Foto[];
}

interface Foto {
  id: number;
  url: string;
  mobil_id: number;
}

const ProdukPrev: React.FC = () => {
  const [produkprev, setProdukPrev] = useState<ProdukView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 👈 Tambahkan loading state

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const response = await axios.get(
          'https://api-dealer-car-production.up.railway.app/mobil'
        );
        setProdukPrev(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchMobil();
  }, []);

  // Tampilkan pesan error jika ada
  if (error) {
    return (
      <div className="p-4 text-red-600 text-center">
        <p>{error}</p>
      </div>
    );
  }

  // Tampilkan loading screen
  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-700 font-medium">Memuat produk...</p>
      </div>
    );
  }

  // Tampilkan produk jika tidak error dan sudah selesai loading
  return (
    <div className="bg-[#808dc4] py-4">
      <div className="max-w-screen-xl mx-auto px-4 overflow-x-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-black font-medium">
          {produkprev.map((item) => (
            <div
              key={item.id}
              className="relative border rounded p-2 bg-white shadow-md w-full text-sm"
            >
              {/* Status badge */}
              <div className="absolute top-2 left-2 bg-[#5b6aa9] text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                {item.status}
              </div>

              {/* Gambar */}
              <div className="w-full aspect-[4/3] bg-gray-100 mb-2 rounded overflow-hidden flex items-center justify-center">
                {item.foto && item.foto.length > 0 ? (
                  <img
                    src={item.foto[0].url}
                    alt={`${item.merek} ${item.tipe}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Tidak ada foto</span>
                )}
              </div>

              {/* Info produk */}
              <h3 className="font-semibold">
                {item.merek} {item.tipe}
              </h3>
              <div className="space-y-1 mt-2 text-sm">
                <p>tahun : {item.tahun}</p>
              </div>
              <p className="mt-2 font-semibold">Harga : {item.harga}</p>

              {/* Tombol Aksi */}
             <div className="flex flex-col lg:flex-row gap-2 mt-4 text-white sm:mx-auto">
                <Link
                  to={`/produk/${item.id}`}
                  className="bg-[#6978af] rounded-md text-xs sm:text-sm py-1 px-3 w-full md:w-auto text-center"
                >
                  Lihat detail
                </Link>
                <a
                  href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20mobil%20${encodeURIComponent(
                    item.merek
                  )}%20${encodeURIComponent(item.tipe)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#374470] rounded-md text-xs sm:text-sm py-1 px-3 w-full md:w-auto text-center"
                >
                  Hubungi
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Lebih Banyak */}
        {/* <div className="text-center mt-6">
          <Link to="/list-produk">
            <button className="bg-[#52639e] text-white px-6 py-2 rounded-md hover:bg-[#2c3b69] transition">
              Lihat Lebih Banyak
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ProdukPrev;
