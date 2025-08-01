import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface ProdukView {
  id: number;
  merek: string;
  tipe: string;
  harga: string;
  tahun: string;
  spesifikasi: string;
  keterangan: string;
  status: string;
  foto: {
    filename: string;
  };
}

const ProdukPrev: React.FC = () => {
  const [produkprev, setProdukPrev] = useState<ProdukView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 👈 Tambahkan loading state

  useEffect(() => {
    axios
      .get('https://api-dealer-car-production.up.railway.app/mobil')
      .then((res) => {
        const responseData = res.data;
        if (Array.isArray(responseData.data)) {
          setProdukPrev(responseData.data.slice(0, 6));
        } else {
          setError('Format data tidak sesuai.');
        }
      })
      .catch(() => {
        setError('Gagal memuat produk😓.');
      })
      .finally(() => {
        setLoading(false); // 👈 Set loading selesai
      });
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
    <div className="bg-gray-300 py-4">
      <div className="max-w-screen-xl mx-auto px-4 overflow-x-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black font-medium">
          {produkprev.map((item) => (

            <div
              key={item.id}
              className="relative border rounded p-3 bg-white shadow max-w-full"
            >
              {/* Status badge */}
              <div className="absolute top-2 left-2 bg-[#3754b1] text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                {item.status}
              </div>

              {/* Gambar */}
              <img
                src={`https://api-dealer-car-production.up.railway.app/uploads/${item.foto.filename}`}
                alt={item.tipe}
                className="w-full h-40 object-cover mb-2 rounded"
                onError={(e) => (e.currentTarget.src = '/fallback.jpg')} // Optional fallback
              />

              {/* Info produk */}
              <h3 className="font-semibold">
                {item.merek} {item.tipe}
              </h3>
              <div className="space-y-1 mt-2 text-sm">
                <p>Tahun: {item.tahun}</p>
                <p>Spesifikasi: {item.spesifikasi}</p>
                <p>Keterangan: {item.keterangan}</p>
              </div>
              <p className="mt-2 font-semibold">Harga: Rp {item.harga}</p>

              {/* Tombol Aksi */}
              <div className="flex flex-wrap gap-2 mt-4 text-white">
                <Link
                  to={`/produk/${item.id}`}
                  className="bg-[#5266a9] rounded-md w-28 py-1 text-sm text-center"
                >
                  Lihat detail
                </Link>
                <a
                  href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20mobil%20${encodeURIComponent(
                    item.merek
                  )}%20${encodeURIComponent(item.tipe)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#35467e] rounded-md w-24 py-1 text-sm text-center"
                >
                  Hubungi
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Lebih Banyak */}
        <div className="text-center mt-6">
          <Link to="/list-produk">
            <button className="bg-[#35467e] text-white px-6 py-2 rounded-md hover:bg-[#2c3b69] transition">
              Lihat Lebih Banyak
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProdukPrev;
