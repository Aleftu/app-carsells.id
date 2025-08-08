import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { FaEye } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Mobil {
  id: number;
  merek: string;
  tipe: string;
  harga: string;
  tahun: string;
  foto: Foto[];
  status: string;
}

interface Foto {
  id: number;
  url: string;
  mobil_id: number;
}

const ProdukPrev: React.FC = () => {
  const [produkprev, setProdukPrev] = useState<Mobil[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const response = await axios.get(
          'https://api-dealer-car-production.up.railway.app/mobil'
        );
        setProdukPrev(response.data.data);
      } catch {
        setError('Gagal memuat data produk.');
      } finally {
        setLoading(false);
      }
    };

    fetchMobil();
  }, []);

  if (error) {
    return <div className="p-4 text-red-600 text-center">{error}</div>;
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-700 font-medium">Memuat produk...</p>
      </div>
    );
  }

  const maxDisplay = 4;
  const tampilkanLebihBanyak = produkprev.length > maxDisplay;
  const mobilTampil = tampilkanLebihBanyak
    ? produkprev.slice(0, maxDisplay)
    : produkprev;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="rounded-md py-4 px-4">
      <Slider {...settings}>
        {mobilTampil.map((item) => (
          <div key={item.id} className="p-2">
            <div className="relative border rounded p-2 bg-white shadow-md w-full text-sm">
              <div className="absolute top-2 left-2 bg-[#5b6aa9] text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                {item.status}
              </div>

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

              <h3 className="font-semibold">
                {item.merek} {item.tipe}
              </h3>
              <div className="space-y-1 mt-2 text-sm">
                <p>tahun : {item.tahun}</p>
              </div>
              <p className="mt-2 font-semibold text-[#fb923c]">
                Rp : {item.harga}
              </p>

              <div className="flex flex-row gap-2 mt-4 text-white">
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
          </div>
        ))}

        {/* Card "Lihat Lebih Banyak" */}
        {tampilkanLebihBanyak && (
          <div className="p-2">
            <Link
              to="/list-produk"
              className="relative border rounded p-2 bg-[#626c95] shadow-md w-full text-sm flex flex-col justify-between h-full text-[#35467e] hover:shadow-lg transition"
            >
              <div className="w-full aspect-[4/3] mb-2 rounded flex items-center justify-center">
                <FaEye className="text-3xl text-[#f3f4f7]" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm sm:text-base text-white">
                  Lihat Lebih Banyak
                </h3>
              </div>
              <div className="h-24"></div>
            </Link>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default ProdukPrev;
