import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#909cd2] text-white px-6 py-12 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Sosial */}
        <div>
          <h1 className="text-2xl font-bold text-[#314159] mb-4">45Motor</h1>
          <p className="mb-4">
            45Motor adalah platform dealer mobil terpercaya yang hadir untuk
            memberikan pengalaman jual beli mobil yang mudah, aman, dan
            transparan di seluruh Indonesia.
          </p>
          <div className="flex space-x-4 text-xl mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-semibold text-white mb-4">Berlangganan</h2>
          <p className="mb-2">
            Dapatkan info promo & penawaran eksklusif langsung ke email Anda.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Terima kasih telah berlangganan!");
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Alamat email"
              required
              className="w-full px-4 py-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-[#314159] text-white font-bold px-4 py-2 rounded hover:bg-[#909cd2]"
            >
              Kirim
            </button>
          </form>
        </div>

        {/* Navigasi Layanan */}
        <div>
          <h2 className="font-semibold text-white mb-4">Layanan</h2>
          <ul className="space-y-2">
            <li><a href="/list-produk" className="hover:underline">Beli Mobil</a></li>
            <li><a href="/jual" className="hover:underline">Jual Mobil</a></li>
            <li><a href="/tukar-tambah" className="hover:underline">Tukar Tambah</a></li>
            <li><a href="/dealer" className="hover:underline">Masuk sebagai Dealer</a></li>
          </ul>
        </div>

        {/* Informasi */}
        <div>
          <h2 className="font-semibold text-white mb-4">Tentang 45Motor</h2>
          <ul className="space-y-2">
            <li><a href="/tentang" className="hover:underline">Tentang Kami</a></li>
            <li><a href="/kontak" className="hover:underline">Hubungi Kami</a></li>
            <li><a href="/lokasi" className="hover:underline">Lokasi Kami</a></li>
            <li><a href="/karir" className="hover:underline">Karir</a></li>
          </ul>
        </div>
      </div>

      {/* Footer bawah */}
      <div className="mt-12 border-t border-[#C4B5FD] pt-6 text-center text-white text-sm font-semibold">
       2025 45Motor. Semua Hak Dilindungi. Made with <span className="text-red-400">❤</span>
      </div>
    </footer>
  );
};

export default Footer;
