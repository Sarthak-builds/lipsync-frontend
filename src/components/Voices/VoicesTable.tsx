import { useEffect } from "react";
import Table from "./TableComponentForVoices";
import { useVoiceStore } from "../../stores/voicesStore";



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
            <h1> Your voices Table</h1>
            <hr></hr>
            <Table voiceDataDisplay = {voicesCollection}></Table>
        </div>
        </>
    )
}


export default VoicesTable;


