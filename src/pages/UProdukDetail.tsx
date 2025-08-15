import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ProsesPembelian from '../components/ProseSell';

const Slider = lazy(() => import('react-slick')); // lazy load slider

interface FotoMobil {
  url: string;
  deskripsi?: string;
}

interface ProdukDetailView {
  id: number;
  merek: string;
  tipe: string;
  harga: string | number;
  tahun: string | number;
  spesifikasi: string;
  keterangan: string;
  status: string;
  foto: FotoMobil[];
}

const ProdukDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [produk, setProduk] = useState<ProdukDetailView | null>(null);
  const [tab, setTab] = useState<'detail' | 'inspeksi'>('detail');

  useEffect(() => {
    axios
      .get(`https://api-dealer-car-production.up.railway.app/mobil/${id}`)
      .then((res) => {
        const found = res.data.data; // langsung ambil objek
        if (!found) {
          console.error(`Produk dengan id ${id} tidak ditemukan.`);
          return;
        }

        const fotoArray: FotoMobil[] = Array.isArray(found.foto)
          ? found.foto.map((f: any) => ({
              url: f.url,
              deskripsi: f.deskripsi || '',
            }))
          : [];

        setProduk({ ...found, foto: fotoArray });
      })
      .catch((err) => console.error('Gagal mengambil detail produk:', err));
  }, [id]);

  if (!produk) return <Loading />;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#beccfc] text-gray-800 font-semibold">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow">

        {/* Tombol Kembali */}
        <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-200 text-sm"
              >
                <FaArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </button>

        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#35467e] mb-6 text-center">
          {produk.merek} {produk.tipe}
        </h2>

        {/* Slider Foto */}
        <div className="rounded-lg overflow-hidden shadow mb-8 bg-white w-full">
          {produk.foto.length > 0 ? (
            <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading slider...</div>}>
              <Slider {...sliderSettings}>
                {produk.foto.map((img, index) => (
                  <div key={index} className="w-full outline-none">
                    <img
                      src={img.url}
                      alt={`Foto ${index + 1}`}
                      className="w-full max-h-[400px] object-cover pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Slider>
            </Suspense>
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
              tab === 'detail' ? 'bg-white text-[#35467e] shadow' : 'bg-[#d1d5db] text-gray-500'
            }`}
          >
            Detail Mobil
          </button>
          <button
            onClick={() => setTab('inspeksi')}
            className={`px-4 py-2 rounded-t-md font-semibold ${
              tab === 'inspeksi' ? 'bg-white text-[#35467e] shadow' : 'bg-[#d1d5db] text-gray-500'
            }`}
          >
            Deskripsi Foto
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'detail' && (
          <div className="space-y-3 bg-white rounded-xl shadow px-4 py-5 mb-10 text-gray-700">
            <h1 className="text-2xl text-gray-600">Spesifikasi Detail</h1>
            <p><span className="font-semibold">Tahun:</span> {produk.tahun}</p>
            <p><span className="font-semibold">Spesifikasi:</span> {produk.spesifikasi}</p>
            <p><span className="font-semibold">Keterangan:</span> {produk.keterangan}</p>
            <p><span className="font-semibold">Status:</span> {produk.status}</p>
            <p className="text-lg font-bold text-[#fb923c]">
              Harga: Rp {new Intl.NumberFormat('id-ID').format(Number(produk.harga))}
            </p>
          </div>
        )}

        {tab === 'inspeksi' && (
          <div className="bg-white rounded-xl shadow px-4 py-6 mb-10 text-gray-700">
            <h1 className="text-xl font-semibold mb-4 text-[#35467e]">Deskripsi Foto</h1>
            {produk.foto.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada Deskripsi Foto untuk mobil ini.</p>
            ) : (
              <ul className="list-disc pl-6 space-y-2 text-sm">
                {produk.foto.map((foto, idx) => (
                  <li key={idx}>{foto.deskripsi || 'Tidak ada deskripsi.'}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Kontak Penjual */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-sm space-y-4 bg-[#808dc4] shadow-md rounded-md px-4 py-5 text-white text-sm">
            <h1 className="text-xl">Kontak penjual</h1>
            <span className="flex items-center gap-2"><FaPhoneAlt /> Hubungi Penjual</span>
            <p className="flex items-center gap-2"><FaEnvelope /> email@example.com</p>
            <button
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              className="mt-4 w-full bg-white text-[#2c824c] font-medium py-2 px-4 rounded hover:bg-[#25D366] hover:text-white flex items-center justify-center gap-2"
            >
              <FaWhatsapp /> Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Proses Pembelian */}
      <ProsesPembelian />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProdukDetail;
