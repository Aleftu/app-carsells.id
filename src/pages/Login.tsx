import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { FaArrowLeft } from 'react-icons/fa'; // Icon arrow kiri

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
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setErrorMessage('Login berhasil, tapi data user tidak ditemukan.');
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Username atau password salah';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#5266a9] px-10">
      
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-white hover:text-gray-200 mt-4 mb-32 self-start"
      >
        <FaArrowLeft className="h-5 w-5" />
        Kembali ke Beranda
      </button>

      {/* 🧾 Card Form Login */}
      <div className="card w-full max-w-md bg-base-100 shadow-md p-8 flex flex-col">
        <h1 className="font-mono">Selamat datang Admin!</h1>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {errorMessage && (
          <div className="alert alert-error text-sm py-2 px-4 mb-4">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isLoading && <Loading />}

          <button
            className="btn bg-[#35467e] w-full mt-2"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
