import React from "react";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { FaBox, FaImage, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onSelectMenu: (menu: 'produk' | 'foto') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
<div className="bg-gradient-to-b from-[#48588d] to-[#6e799c] text-white p-4 h-full min-h-screen md:w-64 sm:w-64 flex flex-col justify-between">
      <div>
        {/* Profil Admin */}
        <div className="text-center mb-10 my-12">
          <BiUserCircle size={60} className="mx-auto" />
          <h1 className="text-base sm:text-lg font-semibold">Admin</h1>
        </div>

        {/* Navigasi */}
        <nav className="flex flex-col gap-2 mb-9">
          <button
            onClick={() => onSelectMenu('produk')}
            className="flex items-center gap-3 text-left w-full text-white hover:text-blue-400 transition-colors"
          >
            <FaBox size={18} /> Kelola Produk
          </button>
          <button
            onClick={() => onSelectMenu('foto')}
            className="flex items-center gap-3 text-left w-full text-white hover:text-blue-400 transition-colors"
          >
            <FaImage size={18} /> Kelola Foto
          </button>
        </nav>
        <hr className="my-4 border-gray-300 opacity-30" />
      </div>

      {/* Bagian Bawah */}
      <div>
        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200 md:w-28 lg:w-full sm:justify-center mb-6"
        >
          <BiLogOut size={20} /> Logout
        </button>

        {/* Ikon Sosmed */}
        <div className="flex justify-center gap-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
            <FaTwitter />
          </a>
          <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
