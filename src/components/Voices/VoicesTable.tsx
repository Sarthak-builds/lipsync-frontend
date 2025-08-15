
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
            <h1 className="  mt-6 mb-4 px-5 py-1  border-1 border-neutral-700 bg-[#0e0e11] rounded-sm text-md text-center  w-fit ] ">Voice Collection</h1>
            <VoicesTableComponent voiceDataDisplay={voicesCollection}></VoicesTableComponent>
            
        </div>
        </>
    )
}


export default VoicesTable;


