import {  NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {



    return (
        <div className=" w-55  border-r-1 border-gray-400  h-full min-h-screen py-50  sticky top-0 text-white flex flex-col text-base  gap-15 font-geist justify-start items-start ">
           <div className="flex flex-col gap-5 font-grotesk w-full">
            <NavLink to="/"  className={({isActive})=>isActive? "bg-indigo-500 w-full px-8 py-1 transition-colors duration-300":"px-8"}>Home</NavLink>
             <NavLink to="/Voices" className={({isActive})=>isActive? "bg-indigo-500 w-full px-8 py-1 transition-colors duration-300":"px-8"}>Voices</NavLink>
            <NavLink to="/Speech" className={({isActive})=>isActive? "bg-indigo-500 w-full  px-8 py-1 transition-colors duration-300":"px-8"}>Speech</NavLink>
            <NavLink to="/Videos" className={({isActive})=>isActive? "bg-indigo-500 w-full px-8 py-1 transition-colors duration-300":"px-8"}>Videos</NavLink>
            <NavLink to="/Clips" className={({isActive})=>isActive? "bg-indigo-500 w-full px-8 py-1 transition-colors duration-300":"px-8"}>Generate clips</NavLink>
           </div>
        </div>
    )
}

export default Sidebar;