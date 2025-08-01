import { useEffect, useState } from "react";
import axios from "axios";

const ListSpek = () => {
  const [speks, setSpeks] = useState([]);

  useEffect(() => {
    const fetchSpeks = async () => {
      const res = await axios.get("http://localhost:5000/mobil");
      setSpeks(res.data);
    };
    fetchSpeks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar Mobil</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {speks.map((spek: any) => (
          <div
            key={spek._id}
            className="card bg-white shadow-md rounded-md p-4 border hover:shadow-lg transition"
          >
            {/* Optional: spek.gambar */}
            <img
              src={spek.gambar || "/default-car.jpg"}
              alt={spek.merk}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">
              {spek.merk} {spek.tipe}
            </h3>
            <p className="text-gray-600">Tahun: {spek.tahun}</p>
            <p className="text-gray-800 font-bold">Rp {spek.harga.toLocaleString()}</p>
            <p className="text-sm text-green-700">{spek.status}</p>
            <p className="text-sm mt-1">{spek.keterangan}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSpek;
