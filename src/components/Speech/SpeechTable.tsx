import { useEffect } from "react";
import TableSpeech from "./TableComponentForSpeech";
import { useSpeechStore } from "../../stores/speechStore";



const SpeechTable: React.FC = () => {
const {allSpeechGenerated, getAllSpeechesGenerated} = useSpeechStore();

useEffect(() => {
  const fetchSpeeches = async () => {
    const response = await getAllSpeechesGenerated();
    console.log(response);
  };

  fetchSpeeches();
}, []);


    return(
        <>
        <div>
            <h1> Your voices Table</h1>
            <hr></hr>
            <TableSpeech speechGeneratedResponseDisplay = {allSpeechGenerated}></TableSpeech>
        </div>
        </>
    )
}


export default SpeechTable;


