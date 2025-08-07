import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

interface Mobil {
  id: string | number;
  merk: string;
  tipe: string;
}

interface Foto {
  id: string | number;
  url: string;
  deskripsi: string;
  id_mobil: string | number;
}

const FotoList: React.FC = () => {
  const [fotoList, setFotoList] = useState<Foto[]>([]);
  const [mobilList, setMobilList] = useState<Mobil[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [deskripsi, setDeskripsi] = useState('');
  const [selectedMobilId, setSelectedMobilId] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Modal konfirmasi hapus
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchMobil();
      await fetchFoto();
    };
    fetchAll();
  }, []);

  const fetchMobil = async () => {
    try {
      const res = await axios.get(
        'https://api-dealer-car-production.up.railway.app/mobil'
      );
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      console.log('🚗 mobilList:', data);
      setMobilList(data || []);
    } catch (error) {
      console.error('❌ Gagal ambil mobil:', error);
      toast.error('Gagal mengambil data mobil.');
    }
  };

  const fetchFoto = async () => {
    try {
      const res = await axios.get(
        'https://api-dealer-car-production.up.railway.app/foto'
      );
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      console.log('🖼️ fotoList:', data);
      setFotoList(data || []);
    } catch (error) {
      console.error('❌ Gagal ambil foto:', error);
      toast.error('Gagal mengambil data foto.');
    }
  };

  const openModal = () => {
    setShowModal(true);
    setEditingId(null);
    setFile(null);
    setDeskripsi('');
    setSelectedMobilId('');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return toast.error('Token tidak ditemukan.');

    if (!deskripsi || !selectedMobilId || (!file && !editingId)) {
      return toast.error('Semua field wajib diisi.');
    }
    setLoadingSubmit(true);

    try {
      if (editingId) {
        const formData = new FormData();
        formData.append('deskripsi', deskripsi);
        formData.append('id_mobil', selectedMobilId);
        if (file) {
          formData.append('foto', file); // harus "foto" sesuai backend
        }

        await axios.put(
          `https://api-dealer-car-production.up.railway.app/upload/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        toast.success('Data foto berhasil diupdate.');
      } else {
        const formData = new FormData();
        formData.append('foto', file!); // nama field harus "foto"
        formData.append('deskripsi', deskripsi);
        formData.append('id_mobil', selectedMobilId);

        await axios.post(
          'https://api-dealer-car-production.up.railway.app/upload',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        toast.success('Foto berhasil diupload.');
      }

      closeModal();
      fetchFoto();
    } catch (error: any) {
      console.error(
        '❌ Error saat simpan:',
        error.response?.data || error.message
      );
      toast.error('Gagal menyimpan data.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleEdit = (foto: Foto) => {
    setEditingId(foto.id.toString());
    setDeskripsi(foto.deskripsi);
    setSelectedMobilId(foto.id_mobil.toString());
    setFile(null);
    setShowModal(true);
  };

  const confirmDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem('token');
    if (!token || !confirmDeleteId) return;
setLoadingDelete(true);
    try {
      await axios.delete(
        `https://api-dealer-car-production.up.railway.app/foto/${confirmDeleteId}`, //aku gak tau end poinnya benr atau slah(kamu bisa ganti disini kalo aku slh)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Foto berhasil dihapus.');
      setConfirmDeleteId(null);
      fetchFoto();
    } catch {
      toast.error('Gagal menghapus foto.');
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="px-4 sm:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-white">Data Foto Mobil</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#5266a9] text-white px-4 py-2 rounded hover:bg-[#6078c5]"
        >
          <FiPlus /> Upload Foto
        </button>
      </div>

      {/* Modal Form Upload/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-11/12 sm:w-full max-w-md p-6 rounded shadow text-gray-700">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Foto' : 'Upload Foto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingId && (
                <div>
                  <label className="block mb-1">File Foto</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border w-full px-2 py-1 bg-white"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block mb-1">Deskripsi</label>
                <input
                  type="text"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="border w-full px-2 py-1 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Nama Mobil</label>
                <select
                  value={selectedMobilId}
                  onChange={(e) => setSelectedMobilId(e.target.value)}
                  className="border w-full px-2 py-1 bg-white"
                  required
                >
                  <option value="">-- Pilih Mobil --</option>
                  {mobilList.map((mobil) => (
                    <option key={mobil.id} value={mobil.id}>
                      {mobil.merk} {mobil.tipe}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loadingSubmit}
                  className="bg-[#5266a9] text-white px-4 py-2 rounded hover:bg-[#6078c5] disabled:opacity-50"
                >
                  {loadingSubmit
                    ? editingId
                      ? 'Menyimpan...'
                      : 'Mengupload...'
                    : editingId
                      ? 'Update'
                      : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm p-6 rounded shadow text-black">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p className="text-black">
              Apakah kamu yakin ingin menghapus foto ini?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
              >
                Batal
              </button>
              <button
  onClick={handleDeleteConfirmed}
  disabled={loadingDelete}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
>
  {loadingDelete ? 'Menghapus...' : 'Hapus'}
</button>

            </div>
          </div>
        </div>
      )}

      {/* Tabel Foto */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white text-black text-sm sm:text-base border-collapse">
          <thead className="bg-[#5266a9] text-white">
            <tr>
              <th className="p-2 whitespace-nowrap">No</th>
              <th className="p-2 whitespace-nowrap">Foto</th>
              <th className="p-2 whitespace-nowrap">URL</th>
              <th className="p-2 whitespace-nowrap">Deskripsi</th>
              <th className="p-2 whitespace-nowrap">Nama Mobil</th>
              <th className="p-2 whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {fotoList.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data foto.
                </td>
              </tr>
            ) : (
              fotoList.map((foto, index) => {
                const mobil = mobilList.find(
                  (m) => String(m.id) === String(foto.id_mobil)
                );
                return (
                  <tr key={foto.id} className="border-t text-center">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      <img
                        src={foto.url}
                        alt="foto"
                        className="w-20 h-12 sm:w-28 sm:h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="p-2 text-xs text-gray-700 break-all">-</td>
                    <td className="p-2">{foto.deskripsi || '-'}</td>
                    <td className="p-2">
                      {mobil
                        ? `${mobil.merk} ${mobil.tipe}`
                        : 'Mobil tidak ditemukan'}
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(foto)}
                        className=" bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(foto.id.toString())}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FotoList;
