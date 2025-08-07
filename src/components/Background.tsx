import React from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';

const GradientBackground: React.FC = () => {
  const stars = Array.from({ length: 30 });

  return (
    <div className="relative overflow-hidden min-h-96 bg-gradient-to-b from-[#35467e] to-[#aebdf7]">
      {/* Bintang animasi */}
      {stars.map((_, index) => (
        <span
          key={index}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Konten */}

      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-10 text-white">
        Find your dream here just for you
      </h1>
      <p className="text-center mt-2 text-xl text-white">Jelajahi mobil impian Anda di sini</p>
      <p className="text-center font-bold text-white">Berbagai merek dan tipe terbaik</p>
      <div className="flex justify-center mt-6">
        <Link to="/list-produk" className="bg-[#35467e] hover:bg-[#2b3a6b] text-white px-6 py-2 rounded-md transition">
          Eksplor
        </Link>
      </div>
    </div>
  );
};
export default GradientBackground;