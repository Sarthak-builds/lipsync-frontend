
import { useEffect } from "react";
import { useVoiceStore } from "../../stores/voicesStore";
import VoicesTableComponent from "./TableComponentForVoices";



const VoicesTable: React.FC = () => {
const { getAllVoices, voicesCollection} = useVoiceStore();

useEffect(() => {
  const fetchVoices = async () => {
    const response = await getAllVoices();
    console.log(response);
  };

  fetchVoices();
}, [getAllVoices]);


    return(
        <>
        <div>
            <h1 className="  mt-6 mb-4 p-[1px]  rounded-sm text-md text-center  w-fit bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 "><div className='bg-black w-full rounded-sm px-5 py-1'>Voice Collection</div></h1>
            <VoicesTableComponent voiceDataDisplay={voicesCollection}></VoicesTableComponent>
            
        </div>
        </>
    )
}


export default VoicesTable;


