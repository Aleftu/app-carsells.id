import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Harap isi username dan password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await axios.post(
        'https://api-dealer-car-production.up.railway.app/login',
        { username, password }
      );

      const data = res.data.data || res.data;
      const token = data.token;

      const user = {
        id: data.id,
        username: data.username,
      };

      if (token && user) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setErrorMessage('Login berhasil, tapi data user tidak ditemukan.');
      }
    } catch (error: unknown) {
      const message =
        (error as any).response?.data?.message ||
        'Username atau password salah';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#8896d6] to-[#35467e] relative px-4 py-4 flex items-center justify-center">
      {/* Loading Fullscreen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
      {/* Tombol kembali di pojok kiri atas */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-200 text-sm"
      >
        <FaArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </button>

      {/* Konten Tengah */}
      <div className="w-full max-w-md">
        <h1 className="text-white text-xl font-semibold my-14 mb-2 text-center">
          Selamat datang Admin!
        </h1>

        <div className="card bg-white/15 backdrop-blur-md border-white/30 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#cfd5e8]">
            Login
          </h2>

          {errorMessage && (
            <div className="alert alert-error text-sm py-2 px-4 mb-4">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Username</span>
              </label>
              <input
                type="text"
                className="input w-full  focus:border-[#35467e] text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                className="input w-full  focus:border-[#35467e] text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Link Tamu */}
            <Link
              to="/"
              className="text-sm text-white hover:underline text-center font-semibold flex items-center"
            >
              Tamu
            </Link>

            <button
              className="btn bg-[#35467e] text-white w-full mt-2 py-2 rounded-md hover:bg-[#2e3e6b]"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
