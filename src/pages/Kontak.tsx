import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';

const Kontak: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#808dc4] py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto bg-[#6b78b1] rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6  text-center">Hubungi Kami</h1>

          <div className="space-y-5 text-base text-semibold">
            <div className="flex items-center">
              <FaWhatsapp className="text-green-600 mr-3" />
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                +62 812-3456-7890 (Chat via WhatsApp)
              </a>
            </div>

            <div className="flex items-center">
              <FaEnvelope className="text-red-600 mr-3" />
              <span>dealer@example.com</span>
            </div>

            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-600 mr-3" />
              <span>Jl. Mobil Impian No. 123, Jakarta</span>
            </div>

            <div className="flex items-center">
              <FaClock className="text-yellow-600 mr-3" />
              <span>Senin - Sabtu: 09.00 - 17.00</span>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 rounded-md overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              className="w-full h-[300px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Kontak;
