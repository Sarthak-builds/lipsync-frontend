import Button from "../UI/Button";
const VideosDisplay:React.FC = () => {


  return (
    <div className="flex flex-col gap-4 overflow-x-auto px-2 py-1 border-2">
        <div className=" w-full h-120 rounded-2xl flex justify-center items-center gap-4 px-1 py-1 ">
         <div className=" bg-black rounded-2xl h-full min-w-70">
            hello
         </div>
          <div className=" bg-black rounded-2xl h-full min-w-70">
            hello
         </div>
          <div className=" bg-black rounded-2xl h-full min-w-70">
            hello
         </div>
          <div className=" bg-black rounded-2xl h-full min-w-70">
            hello
         </div>
        </div>
        <div className="bg-red-100 w-full rounded-2xl flex justify-center">
            <Button type="button" text="Get All Videos"></Button>
        </div>
        </div>
    )
}

export default VideosDisplay;