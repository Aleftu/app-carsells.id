import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

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

const ListProduk: React.FC = () => {
  const [mobilList, setMobilList] = useState<Mobil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#beccfc]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#beccfc]">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-semibold">
      <main className="flex-grow container mx-auto max-w-screen-xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-[#374470]">Daftar Produk Mobil</h1>
        </div>

        {/* Produk Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mobilList.map((mobil) => (
            <div
              key={mobil.id}
              className="relative border rounded p-2 bg-white shadow-md text-sm flex flex-col"
            >
              {/* Status Badge */}
              <div className="absolute top-2 left-2 bg-[#5b6aa9] text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                {mobil.status}
              </div>

              {/* Foto */}
              <div className="w-full aspect-[4/3] bg-gray-100 mb-2 rounded overflow-hidden flex items-center justify-center">
                {mobil.foto && mobil.foto.length > 0 ? (
                  <img
                    src={mobil.foto[0].url}
                    alt={`${mobil.merek} ${mobil.tipe}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Tidak ada foto</span>
                )}
              </div>

              {/* Info Mobil */}
              <h3 className="font-semibold text-[#374470]">
                {mobil.merek} {mobil.tipe}
              </h3>
              <div className="space-y-1 mt-2 text-sm text-gray-600">
                <p>Tahun: {mobil.tahun}</p>
              </div>
              <p className="mt-2 font-semibold text-[#fb923c]">
                Rp : {mobil.harga.toLocaleString('id-ID')}
              </p>

              {/* Tombol Aksi */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4 text-white">
                <Link
                  to={`/produk/${mobil.id}`}
                  className="bg-[#6978af] rounded-md text-xs sm:text-sm py-1 px-3 w-full text-center hover:bg-[#7086d6]"
                >
                  Lihat Detail
                </Link>
                <a
                  href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20mobil%20${encodeURIComponent(
                    mobil.merek
                  )}%20${encodeURIComponent(mobil.tipe)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#374470] rounded-md text-xs sm:text-sm py-1 px-3 w-full text-center hover:bg-[#526091]"
                >
                  Hubungi
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListProduk;
