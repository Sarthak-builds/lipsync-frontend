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
        <div className="">
           <h1 className="  mt-6 mb-4 p-[1px]  rounded-sm text-md text-center  w-fit bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 "><div className='bg-black w-full rounded-sm px-5 py-1'>Speech Collection</div></h1>
            <TableSpeech speechGeneratedResponseDisplay = {allSpeechGenerated} voicesCollection={voicesCollection}></TableSpeech>
        </div>
        </>
    )
}


export default SpeechTable;