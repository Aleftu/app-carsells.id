import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProdukView {
  id: number;
  merek: string;
  tipe: string;
  harga: string;
  tahun: string;
  spesifikasi: string;
  keterangan: string;
  status: string;
  foto: string;
}

const ProdukList: React.FC = () => {
  const [produkv, setProdukv] = useState<ProdukView[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://api-dealer-car-production.up.railway.app/mobil')
      .then((res) => {
        const responseData = res.data;
        if (Array.isArray(responseData.data)) {
          setProdukv(responseData.data);
        } else {
          console.error("Isi 'data' bukan array:", responseData);
          setError('Format data tidak sesuai.');
        }
      })
      .catch((err) => {
        console.error('Gagal fetch data:', err);
        setError('Gagal memuat produk😓.');
      });
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 p-4 text-black font-medium bg-gray-300">
      {produkv.map((item) => (
        <div
          key={item.id}
          className="relative border rounded p-3  bg-white shadow"
        >
          {/* Status badge as popup on top-left */}
          <div className="absolute top-2 left-2 bg-gradient-to-br bg-[#3754b1]  text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            {item.status}
          </div>

          {/* Main content */}
          <img
            src={`https://api-dealer-car-production.up.railway.app/uploads/${item.foto.filename}`}
            alt={item.tipe}
            className="w-full h-40 object-cover mb-2 rounded"
          />

          <h3 className="font-semibold">
            {item.merek} {item.tipe}
          </h3>
          <div className=" space-y-1 mt-2">
            <p>Tahun: {item.tahun}</p>
            <p>Spesifikasi: {item.spesifikasi}</p>
            <p>Keterangan: {item.keterangan}</p>
          </div>
          <p>Harga: Rp {item.harga}</p>
          <div className="flex flex-row mt-5 text-white">
            <Link to={`/produk/${item.id}`}>
              <button className="bg-[#5266a9] rounded-md w-28 py-1 text-sm">
                Lihat detail
              </button>
            </Link>
            <a
              href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20mobil%20${encodeURIComponent(item.merek)}%20${encodeURIComponent(item.tipe)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#35467e] rounded-md w-24 mx-5 py-1 text-sm">
                Hubungi
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProdukList;
