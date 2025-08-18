import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Mobil {
  id: number;
  merek: string;
  tipe: string;
  tahun: string;
  harga: number;
  km: number;
  foto: string;
  lokasi: string;
}

interface Props {
  listMobil?: Mobil[]; // bisa undefined dari parent
}

const ProdukPrev: React.FC<Props> = ({ listMobil = [] }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Slider {...sliderSettings}>
        {listMobil.map((mobil) => (
          <div key={mobil.id} className="p-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={mobil.foto}
                alt={`${mobil.merek} ${mobil.tipe}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h2 className="font-semibold text-lg">{mobil.merek} {mobil.tipe}</h2>
                <p className="text-gray-500 text-sm">{mobil.km.toLocaleString()} km • {mobil.lokasi}</p>
                <p className="font-bold text-[#fb923c] mt-1">Rp {mobil.harga.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProdukPrev;
