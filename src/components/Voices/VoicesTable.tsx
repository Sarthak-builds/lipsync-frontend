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
            <h1 className=" font-bold  my-2 mt-10 px-5 py-1 rounded-tl-lg rounded-br-lg  text-lg text-center ring-1 ring-gray-500 w-fit ] ">Voice Collection</h1>
            <VoicesTableComponent voiceDataDisplay={voicesCollection}></VoicesTableComponent>
            
        </div>
        </>
    )
}


export default VoicesTable;


