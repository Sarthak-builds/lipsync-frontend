import {  NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {



    return (
        <div className="rounded-xl w-50 h-full min-h-screen py-30   mx-1 text-white flex flex-col text-base  gap-15  ">
           <div className="flex flex-col gap-2">
             <NavLink to="/Home"  className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-1":""}>Home</NavLink>
            <NavLink to="/" className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-1":""}>Collection</NavLink>
           </div>

           <div className="flex flex-col gap-2">
             <NavLink to="/Voices" className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-1":""}>Voices</NavLink>
            <NavLink to="Videos" className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-1":""}>Videos</NavLink>
            <NavLink to="Clips" className={({isActive})=>isActive? "bg-blue-400 w-full rounded-lg px-1":""}>Generate clips</NavLink>
           </div>

            {/* videos, */}
          
        </div>
    )
}

export default Sidebar;