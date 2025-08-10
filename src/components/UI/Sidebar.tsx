import {  NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {



    return (
        <div className=" w-65  bg-white/5 px-5 h-full min-h-screen py-30  text-white flex flex-col text-base  gap-15">
           <div className="flex flex-col gap-2 w-full">
             <NavLink to="/Home"  className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-2 py-1":""}>Home</NavLink>
            <NavLink to="/" className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-2 py-1":""}>Collection</NavLink>
           </div>

           <div className="flex flex-col gap-4 font-grotesk">
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