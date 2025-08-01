import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Interface produk sesuai frontend (merek dari "merk" BE)
interface ProdukDetailView {
  id: number;
  merek: string; // mapping dari BE: merk
  tipe: string;
  harga: string | number;
  tahun: string | number;
  spesifikasi: string;
  keterangan: string;
  status: string;
  foto: string[]; // url dari array objek foto di BE
}

const ProdukDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [produk, setProduk] = useState<ProdukDetailView | null>(null);

  useEffect(() => {
    axios
      .get(`https://api-dealer-car-production.up.railway.app/mobil/${id}`)
      .then((res) => {
        const allProducts = res.data.data;

        // Cari produk yang sesuai ID dari URL
        const found = allProducts.find((item: any) => String(item.id) === id);

        if (!found) {
          console.error('Produk tidak ditemukan.');
          return;
        }

        // Ambil URL dari array foto
        const fotoUrls = Array.isArray(found.foto)
          ? found.foto.map((f: any) => f.url)
          : [];

        // Buat objek produk untuk ditampilkan
        const produkBaru: ProdukDetailView = {
          id: found.id,
          merek: found.merk, // BE pakai 'merk'
          tipe: found.tipe,
          harga: found.harga,
          tahun: found.tahun,
          spesifikasi: found.spesifikasi,
          keterangan: found.keterangan,
          status: found.status,
          foto: fotoUrls,
        };

        setProduk(produkBaru);
      })
      .catch((err) => {
        console.error('Gagal mengambil detail produk:', err);
      });
  }, [id]);

  if (!produk) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">{produk.merek} {produk.tipe}</h2>

      {/* Carousel Foto */}
      <Swiper spaceBetween={10} slidesPerView={1}>
        {(produk.foto && produk.foto.length > 0) ? (
          produk.foto.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Foto ${index + 1}`}
                className="w-full h-60 object-cover rounded shadow mb-4"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full h-60 flex items-center justify-center bg-gray-100 rounded shadow mb-4 text-gray-500">
              Tidak ada foto tersedia
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Detail Informasi */}
      <p><strong>Tahun:</strong> {produk.tahun}</p>
      <p><strong>Spesifikasi:</strong> {produk.spesifikasi}</p>
      <p><strong>Keterangan:</strong> {produk.keterangan}</p>
      <p><strong>Status:</strong> {produk.status}</p>
      <p className="text-lg font-semibold mt-2">
        Harga: <span className="text-green-500">Rp {new Intl.NumberFormat('id-ID').format(Number(produk.harga))}</span>
      </p>
    </div>
  );
};

export default ProdukDetail;
