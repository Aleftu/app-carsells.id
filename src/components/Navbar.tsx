import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProduk = () => {
    const el = document.getElementById("produk-preview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`navbar sticky top-0 z-50 shadow transition-colors duration-300 ${
        scroll ? "bg-[#909cd2] text-white" : "bg-[#35467e] text-white"
      }`}
    >
      {/* Navbar Kiri */}
      <div className="navbar-start">
        {/* Menu Dropdown Mobile */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden bg-transparent hover:bg-[#6a79bd] hover:text-white border-none"
          >
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow-md bg-slate-300 text-black rounded-box w-52"
          >
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <button onClick={scrollToProduk}>Produk</button>
            </li>
            <li>
              <Link to="/kontak">Kontak</Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 hover:bg-[#6a79bd] hover:text-white p-2 rounded"
              >
                <FaUser size={18} />
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo Brand */}
        <Link
          to="/"
          className="mx-5 text-xl font-extrabold first-letter:text-[#567af3] first-letter:text-3xl"
        >
          45Motor
        </Link>
      </div>

      {/* Navbar Kanan */}
      <div className="navbar-end hidden lg:flex items-center gap-4">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li>
            <Link to="/">Beranda</Link>
          </li>
          <li>
            <button onClick={scrollToProduk}>Produk</button>
          </li>
          <li>
            <Link to="/kontak">Kontak</Link>
          </li>
        </ul>
        {/* Tombol Login Desktop */}
        <Link
          to="/login"
          className="flex items-center gap-2 bg-[#6a79bd] hover:bg-[#4f5d99] text-white px-4 py-2 rounded-md transition"
        >
          <FaUser size={18} />
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
