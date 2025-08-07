import { useEffect, useState } from "react";

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
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden bg-transparent hover:bg-[#6a79bd] hover:text-white border-none"
          >
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow-md bg-slate-300 text-black rounded-box w-52 hover:bg-[#6a79bd] hover:text-white"
          >
            <li><a href="/">Beranda</a></li>
            <li><button onClick={scrollToProduk}>Produk</button></li>
            <li><a href="/kontak">Kontak</a></li>
          </ul>
        </div>
        <a
          href="/"
          className="mx-5 text-xl font-extrabold first-letter:text-[#567af3] first-letter:text-3xl"
        >
          45Motor
        </a>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li><a href="/">Beranda</a></li>
          <li><button onClick={scrollToProduk}>Produk</button></li>
          <li><a href="/kontak">Kontak</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
