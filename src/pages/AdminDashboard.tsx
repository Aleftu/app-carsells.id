import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
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
      const token = localStorage.getItem('token');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'harga' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
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

  return (
    <div className="flex min-h-screen bg-blue-200">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mx-5 mt-8">
          <h1 className="text-black font-semibold text-xl">Dashboard Admin</h1>
          <hr className="mt-2 w-44 border-black border" />

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
              className="ml-4 bg-green-400 hover:bg-green-400 text-white font-medium rounded-md px-4 py-2 shadow transition duration-200 flex items-center gap-2"
            >
              <FiUpload className="text-lg" />
              Upload Foto
            </button>
          </div>

          <div className="mt-6 overflow-x-auto font-semibold">
            <table className="min-w-full bg-white border shadow text-black">
              <thead className="bg-[#5266a9] text-white">
                <tr>
                  <th className="p-2">Merk</th>
                  <th className="p-2">Tipe</th>
                  <th className="p-2">Tahun</th>
                  <th className="p-2">Harga</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataMobil.map((item, index) => (
                  <tr key={item._id || item.id || index} className="border-t">
                    <td className="p-2">{item.merk}</td>
                    <td className="p-2">{item.tipe}</td>
                    <td className="p-2">{item.tahun}</td>
                    <td className="p-2">{item.harga}</td>
                    <td className="p-2 text-[#2643a4]">{item.status}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
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
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
                  className="border p-2"
                />
                <label>Tipe</label>
                <input
                  name="tipe"
                  value={form.tipe}
                  onChange={handleChange}
                  className="border p-2"
                />
                <label>Tahun</label>
                <input
                  name="tahun"
                  value={form.tahun}
                  onChange={handleChange}
                  className="border p-2"
                />
                <label>Harga</label>
                <input
                  type="number"
                  name="harga"
                  value={form.harga}
                  onChange={handleChange}
                  className="border p-2"
                />
                <label>Spesifikasi</label>
                <input
                  name="spesifikasi"
                  value={form.spesifikasi}
                  onChange={handleChange}
                  className="border p-2"
                />
                <label>Keterangan</label>
                <input
                  name="keterangan"
                  value={form.keterangan}
                  onChange={handleChange}
                  className="border p-2"
                />
                <label>Status</label>
                <input
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="border p-2"
                />
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
                  if (!foto || !selectedMobilId) {
                    toast.error('Foto atau ID mobil tidak valid.');
                    return;
                  }
                  const formData = new FormData();
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
                      `https://api-dealer-car-production.up.railway.app/mobil/${selectedMobilId}/foto`,
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
                      `Gagal mengupload foto: ${
                        error.response?.data?.message || 'Terjadi kesalahan'
                      }`
                    );
                  }
                }}
                className="grid gap-3"
              >
                <label>Deskripsi Foto</label>
                <input
                  type="text"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="border p-2"
                />
                <label>Foto Mobil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFoto(e.target.files ? e.target.files[0] : null)
                  }
                  className="border p-2"
                />
                <button
                  type="submit"
                  className="bg-[#35467e] hover:bg-[#3851a3] text-white p-2 rounded"
                >
                  Upload Foto
                </button>
              </form>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminDashboard;
