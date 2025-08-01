// import { useEffect, useState } from 'react';
// import type { Produk } from '../types/ProdukTypes';
// import { getProduk, deleteProduk, createProduk, updateProduk } from '../services/api';
// import { FormProduk } from '../components/Form';

// const ListProduk = () => {
//   const [data, setData] = useState<Produk[]>([]);
//   const [editData, setEditData] = useState<Produk | null>(null);

//   const loadData = async () => {
//     const res = await getProduk();
//     setData(res);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleDelete = async (id: number) => {
//     await deleteProduk(id);
//     loadData();
//   };

//   const handleSubmit = async (produk: Omit<Produk, 'id'>, id?: number) => {
//     if (id) {
//       await updateProduk(id, produk);
//       setEditData(null);
//     } else {
//       await createProduk(produk);
//     }
//     loadData();
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Manajemen Produk</h1>
//       <FormProduk onSubmit={handleSubmit} initialData={editData || undefined} />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//         {data.map((item) => (
//           <div key={item.id} className="card bg-base-100 shadow-md">
//             <figure><img src={item.gambar} alt={item.nama} className="h-48 w-full object-cover" /></figure>
//             <div className="card-body">
//               <h2 className="card-title">{item.nama}</h2>
//               <p>{item.deskripsi}</p>
//               <div className="card-actions justify-end">
//                 <button className="btn btn-info btn-sm" onClick={() => setEditData(item)}>Edit</button>
//                 <button className="btn btn-error btn-sm" onClick={() => handleDelete(item.id)}>Hapus</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ListProduk;