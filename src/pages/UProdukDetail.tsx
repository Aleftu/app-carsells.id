import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ProdukPrev from './ProdukPrev';
import ProsesPembelian from '../components/ProseSell';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        const found = res.data.data.find((item: any) => item.id === Number(id));
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

        const produkBaru: ProdukDetailView = {
          id: found.id,
          merek: found.merek,
          tipe: found.tipe,
          harga: found.harga,
          tahun: found.tahun,
          spesifikasi: found.spesifikasi,
          keterangan: found.keterangan,
          status: found.status,
          foto: fotoArray,
        };

        setProduk(produkBaru);
      })
      .catch((err) => {
        console.error('Gagal mengambil detail produk:', err);
      });
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
    arrows: true
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#beccfc] text-gray-800 font-semibold">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow">

        {/* Tombol Kembali */}
        <button
          onClick={() => navigate('/')}
          className="mb-4 px-4 py-2 text-[#35467e] rounded hover:text-white transition flex items-center gap-2 group"
        >
          <span className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[#35467e] text-white rounded-full text-sm sm:text-base font-bold transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </button>

        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#35467e] mb-6 text-center">
          {produk.merek} {produk.tipe}
        </h2>

        {/* Slider Foto */}
        <div className="rounded-lg overflow-hidden shadow mb-8 bg-white w-full">
          <Slider {...sliderSettings}>
            {produk.foto && produk.foto.length > 0 ? (
              produk.foto.map((img, index) => (
                <div key={index}>
                  <img
                    src={img.url}
                    alt={`Foto ${index + 1}`}
                    className="w-full max-h-[300px] sm:max-h-[400px] object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 text-gray-500 text-center px-4">
                Tidak ada foto tersedia
              </div>
            )}
          </Slider>
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
        {tab === 'detail' && (
          <div className="space-y-3 bg-white rounded-xl shadow px-4 py-5 sm:px-6 sm:py-6 mb-10 text-gray-700">
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
            <span className="flex items-center gap-2">
              <FaPhoneAlt />
              Hubungi Penjual
            </span>
            <p className="flex items-center gap-2">
              <FaEnvelope />
              email@example.com
            </p>
            <button
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              className="mt-4 w-full bg-white text-[#2c824c] font-medium py-2 px-4 rounded hover:bg-[#25D366] hover:text-white transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp />
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Proses Pembelian */}
      <ProsesPembelian />

      {/* Produk Lain */}
      <h1 className="text-center text-2xl text-[#35467e] font-bold my-5">
        Produk lain mungkin anda suka
      </h1>
      <div className="mb-10">
        <ProdukPrev />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProdukDetail;
