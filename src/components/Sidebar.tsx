import React from "react";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-[#35467e] text-white p-4 h-full min-h-screen md:w-64 sm:w-64">
      <div className="text-center mb-8 sm:mb-10">
        <BiUserCircle size={60} className="mx-auto" />
        <h1 className="text-base sm:text-lg font-semibold">Admin</h1>
      </div>

      <hr className="my-4 sm:my-6 border-gray-300 opacity-30" />

      <button
        onClick={handleLogout}
        className=" flex items-center justify-center gap-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200 md:w-28 lg:w-full sm:justify-center"
      >
        <BiLogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
