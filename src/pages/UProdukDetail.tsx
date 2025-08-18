import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
} from 'react-icons/fa';
import Slider from 'react-slick';
import Footer from '../components/Footer';
import ProsesPembelian from '../components/ProseSell';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 🔹 Lazy load ProdukPrev
const ProdukPrev = React.lazy(() => import('./ProdukPrev'));

interface FotoMobil {
  url: string;
  deskripsi?: string;
}

interface ProdukDetailView {
  id: number;
  merk: string;
  tipe: string;
  harga: string | number;
  tahun: string | number;
  spesifikasi: string;
  keterangan: string;
  status: string;
  foto: FotoMobil[];
}

// 🔹 Custom Arrow
const NextArrow = (props: any) => (
  <button
    onClick={props.onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#35467e] text-white p-2 rounded-full shadow hover:bg-[#22315d] z-10"
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = (props: any) => (
  <button
    onClick={props.onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#35467e] text-white p-2 rounded-full shadow hover:bg-[#22315d] z-10"
  >
    <FaChevronLeft />
  </button>
);

const ProdukDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [produk, setProduk] = useState<ProdukDetailView | null>(null);
  const [tab, setTab] = useState<'detail' | 'inspeksi'>('detail');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔹 Fetch data produk
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    axios
      .get(`https://api-dealer-car-production.up.railway.app/mobil/${id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        const found = res.data.data;
        if (!found) {
          setError('Produk tidak ditemukan');
          setLoading(false);
          return;
        }

        const fotoArray: FotoMobil[] = Array.isArray(found.foto)
          ? found.foto.map((f: any) => ({
              url: f.url,
              deskripsi: f.deskripsi || '',
            }))
          : [];

        setProduk({ ...found, foto: fotoArray });
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Gagal mengambil detail produk');
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  // 🔹 Konfigurasi slider utama
  const mainSettings = {
    dots: false,
    infinite: (produk?.foto?.length ?? 0) > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: (produk?.foto?.length ?? 0) > 1,
    autoplaySpeed: 4000,
    arrows: (produk?.foto?.length ?? 0) > 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#beccfc] text-gray-800 font-semibold">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#35467e] hover:text-[#22315d] font-medium mb-4"
        >
          <FaArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </button>

        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#35467e] mb-6 text-center">
          {loading ? 'Loading...' : `${produk?.merk} ${produk?.tipe}`}
        </h2>

        {/* Slider Foto */}
        <div className="relative rounded-lg overflow-hidden shadow mb-4 bg-white w-full">
          {loading ? (
            <div className="w-full h-[300px] bg-gray-200 animate-pulse flex items-center justify-center">
              Loading foto...
            </div>
          ) : produk && produk.foto.length > 0 ? (
            <Slider {...mainSettings}>
              {produk.foto.map((img, index) => (
                <div key={index}>
                  <img
                    src={img.url}
                    alt={`Foto ${index + 1}`}
                    className="w-full max-h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 text-gray-500">
              Tidak ada foto tersedia
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setTab('detail')}
            className={`px-4 py-2 rounded-t-md font-semibold ${
              tab === 'detail'
                ? 'bg-white text-[#35467e] shadow'
                : 'bg-[#d1d5db] text-gray-500'
            }`}
          >
            Detail Mobil
          </button>
          <button
            onClick={() => setTab('inspeksi')}
            className={`px-4 py-2 rounded-t-md font-semibold ${
              tab === 'inspeksi'
                ? 'bg-white text-[#35467e] shadow'
                : 'bg-[#d1d5db] text-gray-500'
            }`}
          >
            Deskripsi Foto
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="h-[200px] bg-gray-200 animate-pulse rounded-lg mb-10"></div>
        ) : tab === 'detail' && produk ? (
          <div className="space-y-3 bg-white rounded-xl shadow px-4 py-5 mb-10 text-gray-700">
            <h1 className="text-2xl text-gray-600">Spesifikasi Detail</h1>
            <p>
              <span className="font-semibold">Tahun:</span> {produk.tahun}
            </p>
            <p>
              <span className="font-semibold">Spesifikasi:</span>{' '}
              {produk.spesifikasi}
            </p>
            <p>
              <span className="font-semibold">Keterangan:</span>{' '}
              {produk.keterangan}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {produk.status}
            </p>
            <p className="text-lg font-bold text-[#fb923c]">
              Harga: Rp{' '}
              {new Intl.NumberFormat('id-ID').format(Number(produk.harga))}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow px-4 py-6 mb-10 text-gray-700">
            <h1 className="text-xl font-semibold mb-4 text-[#35467e]">
              Deskripsi Foto
            </h1>
            {produk?.foto.length === 0 ? (
              <p className="text-sm text-gray-500">
                Belum ada Deskripsi Foto untuk mobil ini.
              </p>
            ) : (
              <ul className="list-disc pl-6 space-y-2 text-sm">
                {produk?.foto.map((foto, idx) => (
                  <li key={idx}>{foto.deskripsi || 'Tidak ada deskripsi.'}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Kontak Penjual */}
        <div className="flex justify-center items-center mb-8">
          <div className="w-full max-w-sm space-y-4 bg-[#808dc4] shadow-md rounded-md px-4 py-5 text-white text-sm">
            <h1 className="text-xl">Kontak penjual</h1>
            <span className="flex items-center gap-2">
              <FaPhoneAlt /> Hubungi Penjual
            </span>
            <p className="flex items-center gap-2">
              <FaEnvelope /> email@example.com
            </p>
            <button
              onClick={() =>
                window.open('https://wa.me/6281234567890', '_blank')
              }
              className="mt-4 w-full bg-white text-[#2c824c] font-medium py-2 px-4 rounded hover:bg-[#25D366] hover:text-white flex items-center justify-center gap-2"
            >
              <FaWhatsapp /> Hubungi via WhatsApp
            </button>
          </div>
        </div>

        {/* Proses Pembelian */}
        <div className="w-full bg-[#beccfc] py-10">
          <div className="flex flex-wrap justify-center gap-6 px-4">
            <ProsesPembelian />
          </div>
        </div>

        {/* Rekomendasi Produk */}
        {/* <div className=" rounded-xl shadow px-4 py-6 mb-10">
          <h1 className="text-xl font-semibold mb-4 text-[#35467e]">
            Rekomendasi Mobil Lain
          </h1>
          <ProdukPrev />
        </div> */}
        {/* Scroll to Top Button */}
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#374470] hover:bg-[#526091] text-white p-3 rounded-full shadow-lg transition duration-300"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>

      {/* Footer full width */}
      <Footer />
    </div>
  );
};

export default ProdukDetail;
