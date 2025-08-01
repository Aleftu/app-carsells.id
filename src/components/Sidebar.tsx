import React from "react";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Logika untuk logout
        // Misalnya, hapus token dari localStorage atau state global
        localStorage.removeItem("token");
        navigate("/");
    };
    return(
        <div className="min-h-screen bg-[#35467e] px-8  w-64 text-white 
                transition-transform duration-300 ease-in-out
                z-40 h-screen md:h-auto overflow-y-auto bg-gradient-moving bg-400 animate-gradient-move">
                    <div className="mt-20 mx-auto text-center">
            <BiUserCircle size={70} className="mx-auto" /> 
            <h1>Admin</h1>
            </div>

            <hr className="my-6 border-gray-300 opacity-30"/>
            <button onClick={handleLogout}
            className=" w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200">
                <BiLogOut size={20} />
                Logout
            </button>
        </div>
    )
}

export default Sidebar;