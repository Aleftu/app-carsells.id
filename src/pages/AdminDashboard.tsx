import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import FotoList from './FotoList';
import { toast, ToastContainer } from 'react-toastify';
import { FiPlus, FiUpload, FiEdit, FiTrash } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

interface FormDataProduk {
  merk: string;
  tipe: string;
  tahun: string;
  harga: number;
  spesifikasi: string;
  keterangan: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [form, setForm] = useState<FormDataProduk>({
    merk: '',
    tipe: '',
    tahun: '',
    harga: 0,
    spesifikasi: '',
    keterangan: '',
    status: '',
  });

  const [dataMobil, setDataMobil] = useState<any[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'produk' | 'foto'>('produk');

  // State for photo upload
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedMobilId, setSelectedMobilId] = useState<string | null>(null);
  const [foto, setFoto] = useState<File | null>(null);
  const [deskripsi, setDeskripsi] = useState('');

  useEffect(() => {
    fetchMobil();
  }, []);

  const fetchMobil = async () => {
    try {
     const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Token tidak ditemukan. Silakan login ulang.');
        return;
      }

      const response = await axios.get(
        'https://api-dealer-car-production.up.railway.app/mobil',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      setDataMobil(result || []);
    } catch (error: any) {
      console.error('Fetch data error:', error.response?.data || error.message);
      toast.error('Gagal mengambil data');
    }
  };

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setForm((prevForm) => ({
    ...prevForm,
    [name]: name === 'harga' ? parseInt(value) : value,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { merk, tipe, tahun, harga, spesifikasi, keterangan, status } = form;
    if (
      !merk ||
      !tipe ||
      !tahun ||
      !harga ||
      !spesifikasi ||
      !keterangan ||
      !status
    ) {
      toast.error('Semua field harus diisi!');
      setLoading(false); 
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      setLoading(false); 
      return;
    }

    try {
      if (isEditing && editId) {
        await axios.put(
          `https://api-dealer-car-production.up.railway.app/mobil/${editId}`,
          form,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Produk berhasil diupdate!');
      } else {
        await axios.post(
          'https://api-dealer-car-production.up.railway.app/mobil',
          form,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Produk berhasil ditambahkan!');
      }

      setForm({
        merk: '',
        tipe: '',
        tahun: '',
        harga: 0,
        spesifikasi: '',
        keterangan: '',
        status: '',
      });
      setIsModal(false);
      setIsEditing(false);
      setEditId(null);
      fetchMobil();
    } catch (error: any) {
      console.error('Submit error:', error.response?.data || error.message);
      toast.error(
        `Gagal: ${error.response?.data?.message || 'Terjadi kesalahan'}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setForm({
      merk: item.merk,
      tipe: item.tipe,
      tahun: item.tahun,
      harga: item.harga,
      spesifikasi: item.spesifikasi,
      keterangan: item.keterangan,
      status: item.status,
    });
    setEditId(item._id || item.id);
    setIsEditing(true);
    setIsModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error('ID tidak valid!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      return;
    }

    try {
      await axios.delete(
        `https://api-dealer-car-production.up.railway.app/mobil/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Data berhasil dihapus!');
      fetchMobil();
    } catch (error: any) {
      console.error('Delete error:', error.response?.data || error.message);
      toast.error(
        `Gagal menghapus data: ${error.response?.data?.message || 'Terjadi kesalahan'}`
      );
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) {
      toast.error('ID tidak ditemukan');
      return;
    }

    await handleDelete(deleteId);
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  //buat pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataMobil.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataMobil.length / itemsPerPage);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#66739f] font-semibold backdrop-blur-md">
      <div className="md:w-64 w-full ">
        <Sidebar
          onSelectMenu={(menu: 'produk' | 'foto') => setActiveMenu(menu)}
        />
      </div>
      <div className="flex-1 p-4 md:p-6 overflow-x-auto">
        <div className="mx-5 mt-8">
          <h1 className="text-gray-800 font-semibold text-xl">
            Dashboard Admin
          </h1>
          <hr className="mt-2 w-44 border-black border" />
          {activeMenu === 'produk' && (
            <div className="mx-5 mt-8">
              <h1 className="font-semibold text-xl text-white">
                Kelola Produk
              </h1>

              <div className="mt-8 flex items-center">
                <button
                  onClick={() => {
                    setForm({
                      merk: '',
                      tipe: '',
                      tahun: '',
                      harga: 0,
                      spesifikasi: '',
                      keterangan: '',
                      status: '',
                    });
                    setIsEditing(false);
                    setEditId(null);
                    setIsModal(true);
                  }}
                  className="bg-[#5266a9] hover:bg-[#6078c5] text-white font-medium rounded-md px-4 py-2 shadow transition duration-200 flex items-center gap-2"
                >
                  <FiPlus className="text-lg" />
                  Tambah
                </button>

                <button
                  onClick={() => {
                    if (dataMobil.length === 0) {
                      toast.error('Tidak ada data mobil untuk diupload.');
                      return;
                    }
                    setUploadModal(true);
                    setSelectedMobilId(dataMobil[0]._id || dataMobil[0].id);
                  }}
                  className="ml-4 bg-green-500 hover:bg-green-400 text-white font-medium rounded-md px-4 py-2 shadow transition duration-200 flex items-center gap-2"
                >
                  <FiUpload className="text-lg" />
                  Upload Foto
                </button>
              </div>

              <div className="mt-6 overflow-x-auto font-semibold">
                <table className="min-w-full bg-white/30 backdrop-blur-md text-black rounded-lg overflow-hidden">
                  <thead className="bg-[#5266a9] text-white">
                    <tr>
                      <th className="p-2">No</th>
                      <th className="p-2">Foto</th>
                      <th className="p-2">Merk</th>
                      <th className="p-2">Seri</th>
                      <th className="p-2">Tahun</th>
                      <th className="p-2">Harga</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr
                        key={item._id || item.id || index}
                        className="border-t"
                      >
                        <td className="p-2">{indexOfFirstItem + index + 1}</td>
                        <td className="p-2">
                          {item.foto && item.foto.length > 0 ? (
                            <img
                              src={item.foto[0].url}
                              alt={`${item.merk} ${item.tipe}`}
                              className="w-20 h-16 object-cover rounded"
                            />
                          ) : (
                            <span className="text-gray-800">Belum ada</span>
                          )}
                        </td>
                        <td className="p-2">{item.merk}</td>
                        <td className="p-2">{item.tipe}</td>
                        <td className="p-2">{item.tahun}</td>
                        <td className="p-2">{item.harga}</td>
                        <td className="p-2 text-[#2643a4]">{item.status}</td>
                        <td className="p-2 flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                          >
                            <FiEdit className="inline" />
                          </button>
                          <button
                            onClick={() => {
                              const id = item._id || item.id;
                              if (!id) {
                                toast.error('ID tidak ditemukan.');
                                return;
                              }
                              setDeleteId(id);
                              setShowDeleteModal(true);
                            }}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                          >
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* {pagination} */}
                <div className="flex justify-center mt-4 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#5266a9] text-white' : 'bg-white text-black border'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Hapus */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm mx-4 text-black">
                <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
                <p>Apakah kamu yakin ingin menghapus data ini?</p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteId(null);
                    }}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Tambah / Edit */}
          {isModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4 max-h-screen overflow-y-auto text-black border-[#5266a9]">
                <h2 className="text-lg font-bold mb-4 text-[#5266a9]">
                  {isEditing ? 'Edit Mobil' : 'Form Tambah Mobil'}
                </h2>
                <form onSubmit={handleSubmit} className="grid gap-3">
                  <label>Merek</label>
                  <input
                    name="merk"
                    value={form.merk}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black rounded"
                  />

                  <label>Tipe</label>
                  <input
                    name="tipe"
                    value={form.tipe}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black rounded"
                  />

                  <label>Tahun</label>
                  <input
                    name="tahun"
                    value={form.tahun}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black rounded"
                  />

                  <label>Harga</label>
                  <input
                    type="number"
                    name="harga"
                    value={form.harga}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black rounded"
                  />

                  <label>Spesifikasi</label>
                  <input
                    name="spesifikasi"
                    value={form.spesifikasi}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black rounded"
                  />

                  <label>Keterangan</label>
                  <input
                    name="keterangan"
                    value={form.keterangan}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black rounded"
                  />

                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border p-2 bg-white text-black rounded font-semibold"
                  >
                    <option value="">-- Pilih Status --</option>
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-[#35467e] hover:bg-[#3851a3] text-white p-2 rounded"
                  >
                    {isEditing ? 'Simpan Perubahan' : 'Upload Produk'}
                  </button>
                </form>

                <button
                  onClick={() => setIsModal(false)}
                  className="mt-4 text-red-500 hover:underline"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          {/* Modal Upload Foto */}
          {uploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4 text-black">
                <h2 className="text-lg font-bold mb-4 text-[#5266a9]">
                  Upload Foto Mobil
                </h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!foto || !selectedMobilId || !deskripsi.trim()) {
                      toast.error(
                        'Pilih mobil, foto, dan deskripsi terlebih dahulu!'
                      );
                      return;
                    }
                    const formData = new FormData();
                    formData.append('id_mobil', selectedMobilId);
                    formData.append('foto', foto);
                    formData.append('deskripsi', deskripsi);
                    try {
                      const token = localStorage.getItem('token');
                      if (!token) {
                        toast.error(
                          'Token tidak ditemukan. Silakan login ulang.'
                        );
                        return;
                      }
                      await axios.post(
                        `https://api-dealer-car-production.up.railway.app/upload`,
                        formData,
                        {
                          headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      toast.success('Foto berhasil diupload!');
                      setUploadModal(false);
                      setFoto(null);
                      setDeskripsi('');
                      fetchMobil();
                    } catch (error: any) {
                      console.error(
                        'Upload error:',
                        error.response?.data || error.message
                      );
                      toast.error(
                        `Gagal mengupload foto: ${error.response?.data?.message || 'Terjadi kesalahan'}`
                      );
                    }
                  }}
                  className="grid gap-3"
                >
                  {/* Tambahan untuk pilih mobil */}
                  <label>Pilih Mobil</label>
                  <select
                    onChange={(e) => setSelectedMobilId(e.target.value)}
                    value={selectedMobilId || ''}
                    className="border p-2 bg-white text-black rounded"
                  >
                    <option value="">-- Pilih Mobil --</option>
                    {dataMobil.map((mobil) => (
                      <option
                        key={mobil._id || mobil.id}
                        value={mobil._id || mobil.id}
                      >
                        {mobil.merk} - {mobil.tipe}
                      </option>
                    ))}
                  </select>

                  <label>Deskripsi Foto</label>
                  <input
                    type="text"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="border p-2 bg-white text-black rounded"
                  />

                  <label>Foto Mobil</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFoto(e.target.files ? e.target.files[0] : null)
                    }
                    className="border p-2 bg-white text-black rounded"
                  />

                  <button
                    type="submit"
                    className="bg-[#35467e] hover:bg-[#3851a3] text-white p-2 rounded"
                  >
                    Upload Foto
                  </button>
                </form>

                <button
                  onClick={() => setUploadModal(false)}
                  className="mt-4 w-full text-center text-red-500 hover:underline"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
          {activeMenu === 'foto' && (
            <>
              {/* Panggil Komponen Terpisah */}
              <FotoList />
            </>
          )}
        </div>
        <ToastContainer />

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
            <div className="w-16 h-16 border-4 border-[#35467e] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white font-semibold">Memuat...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
