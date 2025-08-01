import { useState, useEffect } from 'react';
import type { Produk } from '../types/ProdukTypes';

type Props = {
  onSubmit: (produk: Omit<Produk, 'id'>, id?: number) => void;
  initialData?: Produk; // jika ada, berarti edit mode
};

export const FormProduk = ({ onSubmit, initialData }: Props) => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambar, setGambar] = useState('');

  // Jika initialData tersedia (edit mode), isi form
  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama);
      setDeskripsi(initialData.deskripsi);
      setGambar(initialData.gambar);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nama, deskripsi, gambar }, initialData?.id);
    // reset jika tambah baru
    if (!initialData) {
      setNama('');
      setDeskripsi('');
      setGambar('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" className="input input-bordered w-full" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
      <textarea className="textarea textarea-bordered w-full" placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
      <input type="text" className="input input-bordered w-full" placeholder="URL Gambar" value={gambar} onChange={(e) => setGambar(e.target.value)} required />
      <button className="btn btn-primary" type="submit">{initialData ? 'Update' : 'Tambah'} Produk</button>
    </form>
  );
};