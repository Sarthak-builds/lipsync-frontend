import {  NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {



    return (
        <div className=" w-55   border-gray-400  h-full min-h-screen   sticky top-0  flex flex-col text-[14px] font-medium  gap-12 font-geist justify-start items-start bg-white/70 ">
            <div className="ring-2 ring-neutral-900 flex justify-start items-center  font-bold text-xl w-full px-3 pt-2 pb-1 text-netural-900 font-geistmono rounded-b-xs">
                LIPSYNC
            </div>
           <div className="flex flex-col gap-5 font-geist w-full">
            <NavLink to="/"  className={({isActive})=>isActive? "bg-neutral-800 text-white w-full px-4 py-2 rounded-b-xs transition-colors duration-300":"px-4"}> <i className="ri-home-8-line px-2"></i>Home</NavLink>
    
            <NavLink to="/Videos" className={({isActive})=>isActive? "bg-neutral-900 text-white w-full px-4 py-2 rounded-b-xs transition-colors duration-300":"px-4"}><i className="ri-video-ai-line px-2"></i>Videos</NavLink>

             <NavLink to="/Voices" className={({isActive})=>isActive? "bg-neutral-900 text-white w-full px-4 py-2 rounded-b-xs transition-colors duration-300":"px-4"}><i className="ri-mic-ai-line px-2"></i>Voices</NavLink>
            <NavLink to="/Speech" className={({isActive})=>isActive? "bg-neutral-900 text-white w-full px-4 py-2 rounded-b-xs transition-colors duration-300":"px-4"}><i className="ri-user-voice-line px-2"></i>Speech</NavLink>
            
            <NavLink to="/Clips" className={({isActive})=>isActive? "bg-neutral-900 text-white w-full px-4 py-2 rounded-b-xs transition-colors duration-300":"px-4"}><i className="ri-ai-generate px-2"></i>Generate clips</NavLink>
           </div>
        </div>
    )
}

export default Sidebar;