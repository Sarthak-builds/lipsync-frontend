import {  NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {



    return (
        <div className=" w-56   border-gray-400  h-full min-h-screen   sticky top-0  flex flex-col text-[14px] font-medium  gap-12 font-geist justify-start items-start  text-white bg-[#0d0d0f]">
            <div className="ring-1 ring-neutral-800 flex justify-center items-center  font-semibold text-lg w-52 px-6 py-1 text-netural-900 font-geistmono rounded-sm mx-2 my-3">
                LIPSYNC AI
            </div>
           <div className="flex flex-col gap-3 font-geist w-full px-4">
            {/* <NavLink to="/"  className={({isActive})=>isActive? "bg-neutral-800 text-white w-full px-4 py-2 rounded-sm transition-colors duration-300":"hover:bg-neutral-800  px-4 py-2 rounded-sm"}> <i className="ri-home-8-line px-2"></i>Home</NavLink> */}
             <NavLink to="/Clips" className={({isActive})=>isActive? "bg-neutral-800 text-white w-full px-4 py-2 rounded-sm transition-colors ":"hover:bg-neutral-800  px-4 py-2 rounded-sm"}><i className="ri-ai-generate px-2"></i>Generate clips</NavLink>
    
            <NavLink to="/Videos" className={({isActive})=>isActive? "bg-neutral-800 text-white w-full px-4 py-2 rounded-sm transition-colors duration-300":"hover:bg-neutral-800  px-4 py-2 rounded-sm"}><i className="ri-video-ai-line px-2"></i>Videos</NavLink>

             <NavLink to="/Voices" className={({isActive})=>isActive? "bg-neutral-800 text-white w-full px-4 py-2 rounded-sm transition-colors duration-300":"hover:bg-neutral-800  px-4 py-2 rounded-sm"}><i className="ri-mic-ai-line px-2"></i>Voices</NavLink>
            {/* <NavLink to="/Speech" className={({isActive})=>isActive? "bg-neutral-800 text-white w-full px-4 py-2 rounded-sm transition-colors duration-300":"hover:bg-neutral-800  px-4 py-2 rounded-sm"}><i className="ri-user-voice-line px-2"></i>Speech Collection</NavLink> */}
            
           
           </div>
        </div>
    )
}

export default Sidebar;