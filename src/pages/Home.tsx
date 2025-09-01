import { NavLink } from "react-router-dom";

const Home:React.FC = () => {



    return (
       <div className="min-h-screen w-full bg-[#020617] relative flex justify-center items-start">
  {/* Magenta Orb Grid Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#020617",
      backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
      `,
      backgroundSize: "40px 40px, 40px 40px, 100% 100%",
    }}
  />
    {
      <div className="w-full mt-50 mx-30 h-80 rounded-2xl z-40 font-geist text-white flex justify-start items-start flex-col gap-10">
       <div className="w-full flex flex-col gap-4 justify-start items-start">
         <h1 className="text-7xl">
          Revolutionize Videos with Smart <span className="font-semibold text-indigo-400">LIPSYNC</span>
        </h1>
        <p className="text-xl text-gray-500 font-grotesk">Harness AI to sync audio perfectly to any face in your videos. From fun filters to pro productions, make your content come alive</p>
       </div>
       <NavLink to="/Clips" className="px-4 py-1 rounded-lg border-indigo-500  border-2 hover:bg-indigo-500  text-md font-semibold">Get Started</NavLink>
        </div>
    }
</div>
         
    )
}

export default Home;