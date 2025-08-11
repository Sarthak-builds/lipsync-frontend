import { useEffect } from "react";
import TableSpeech from "./TableComponentForSpeech";
import { useSpeechStore } from "../../stores/speechStore";
import { useVoiceStore } from "../../stores/voicesStore";


const SpeechTable: React.FC = () => {
const {allSpeechGenerated, getAllSpeechesGenerated} = useSpeechStore();
const {voicesCollection, getAllVoices} = useVoiceStore();

useEffect(() => {
  const fetchData = async () => {
    await getAllVoices();
    const response = await getAllSpeechesGenerated();
    console.log(response);
  };

  fetchData();
}, []);


    return(
        <>
        <div className="mt-15">
            <h1 className=" my-2  px-5 py-1 rounded-tl-lg rounded-br-lg  text-md text-center ring-1 ring-gray-500 w-fit mb-5"> Your speeches Table</h1>
            <TableSpeech speechGeneratedResponseDisplay = {allSpeechGenerated} voicesCollection={voicesCollection}></TableSpeech>
        </div>
        </>
    )
}


export default SpeechTable;