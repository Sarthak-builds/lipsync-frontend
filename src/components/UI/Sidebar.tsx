import {  NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {



    return (
        <div className=" w-55  border-r-1 border-gray-400 px-8 h-full min-h-screen py-50  sticky top-0 text-white flex flex-col text-base  gap-15 font-geist justify-start items-start ">
           {/* <div className="flex flex-col gap-2 w-full">
             <NavLink to="/"  className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-2 py-1":""}>Home</NavLink>
           
           </div> */}

           <div className="flex flex-col gap-5 font-grotesk w-full">
            <NavLink to="/"  className={({isActive})=>isActive? "bg-indigo-500 w-full rounded-lg px-2 py-1 border-b-gray-700 border-2":""}>Home</NavLink>
             <NavLink to="/Voices" className={({isActive})=>isActive? "bg-indigo-500 w-full rounded-lg px-2 py-1":""}>Voices</NavLink>
            <NavLink to="/Speech" className={({isActive})=>isActive? "bg-indigo-500 w-full rounded-lg px-2 py-1":""}>Speech</NavLink>
            <NavLink to="/Videos" className={({isActive})=>isActive? "bg-indigo-500 w-full rounded-lg px-2 py-1":""}>Videos</NavLink>
            <NavLink to="/Clips" className={({isActive})=>isActive? "bg-indigo-500 w-full rounded-lg px-2 py-1":""}>Generate clips</NavLink>
           </div>

            {/* videos, */}
          
        </div>
    )
}

export default Sidebar;