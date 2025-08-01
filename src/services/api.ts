// import type { Produk } from "../types/ProdukTypes";

// const BASE_URL = 'http://localhost:5173/mobil'; // Ganti dengan URL asli

// export const getProduk = async (): Promise<Produk[]> => {
//   const res = await fetch(BASE_URL);
//   return res.json();
// };

// export const createProduk = async (produk: Omit<Produk, 'id'>): Promise<Produk> => {
//   const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(produk),
//   });
//   return res.json();
// };

// export const updateProduk = async (id: number, produk: Omit<Produk, 'id'>): Promise<Produk> => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(produk),
//   });
//   return res.json();
// };

// export const deleteProduk = async (id: number): Promise<void> => {
//   await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
// };