import React from 'react';
import {
  FaClipboardList,
  FaComments,
  FaMoneyCheckAlt,
  FaCarSide,
} from 'react-icons/fa';

const ProsesPembelian: React.FC = () => {
  const steps = [
    {
      title: 'Pilih Mobil',
      description: 'Lihat dan pilih mobil sesuai keinginan Anda.',
      icon: <FaClipboardList className="text-white text-2xl sm:text-3xl" />,
    },
    {
      title: 'Konsultasi',
      description: 'Diskusikan kebutuhan Anda dengan tim kami.',
      icon: <FaComments className="text-white text-2xl sm:text-3xl" />,
    },
    {
      title: 'Pembayaran',
      description: 'Lakukan pembayaran secara tunai atau kredit.',
      icon: <FaMoneyCheckAlt className="text-white text-2xl sm:text-3xl" />,
    },
    {
      title: 'Ambil Mobil',
      description: 'Mobil siap diantar atau diambil langsung.',
      icon: <FaCarSide className="text-white text-2xl sm:text-3xl" />,
    },
  ];

  return (
    <section className="bg-[#beccfc] py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#35467e] mb-8">
          Proses Pembelian Mobil
        </h2>

        {/* Grid responsif */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="bg-[#35467e] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                {step.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#35467e] mb-1 sm:mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProsesPembelian;
