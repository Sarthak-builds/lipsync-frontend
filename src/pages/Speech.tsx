import { useState, useRef } from "react";
import SpeechTable from "../components/Speech/SpeechTable";
import Button from "../components/UI/Button";
import { useSpeechStore } from "../stores/speechStore";
import type { SpeechRequest } from "../types/speech";
import { useVoiceStore } from "../stores/voicesStore";
import { Card, CardHeader, CardTitle, CardContent} from "../components/UI/card";
import ButtonRed from "../components/UI/ButtonRed";
// import { useFileStore } from "../stores/fileStore";

const Speech: React.FC = () => {
    const { voicesCollection} = useVoiceStore();
    const [text,  setText] = useState< string >('');
    // const { getFileById} = useFileStore();
    const { getAllSpeechesGenerated, generateSpeech} = useSpeechStore();
    const [selectedVoiceId, setSelectedVoiceId] = useState<number | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

// const handleSpeechGetClick = async () => {
// const response = await getAllSpeechesGenerated();
// const audioTrackIdCollection = response.map((audioFile)=> {audiotrackId:audioFile.audio_file});
// console.log(audioTrackIdCollection);
// console.log(response);
// }

const handleSpeechGenerate = async (selectedVoiceId: number | null, text:string) => {
    if(!text.trim()) {
        textAreaRef.current?.focus();
        return;
    }
    if  (!selectedVoiceId){
        console.log("Voice is required");
        return;
    }
    const speechPayload: SpeechRequest = {
        text:text.trim(),
        voice: selectedVoiceId,
    }
    const response = await generateSpeech(speechPayload);
    console.log(response);
    setText("");
    setSelectedVoiceId(null);
    await getAllSpeechesGenerated();
}
const handleReset = () => {
    setText("");
    setSelectedVoiceId(null);
 }
const handleTextChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
}
const handleVoiceChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoiceId(Number(e.target.value) || null);
}

    return (
        <div className="flex px-30 py-10 bg-black/30 mx-1 rounded-2xl text-white w-full h-full  min-h-screen flex-col gap-5 font-grotesk">
            
            <div>
                <div>
        <h1 className="text-3xl font-semibold my-2 ">SPEECHES</h1>
       <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 " />

               </div>
               <div className="flex flex-col relative">
                 <SpeechTable></SpeechTable>
               </div>
                 {/* <Button type="button" onClick={handleSpeechGetClick} text="🔄️"></Button> */}
            </div>
            <Card className="w-full bg-black rounded-3xl border-1 border-gray-500 text-white font-grotesk">
            <CardHeader>
              <CardTitle className="text-xl">Generate Speech</CardTitle>
               <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 " />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex  justify-center items-center mt-5">
                <p className="italic text-gray-500 text-md w-40">Select a voice</p>
                <select 
                  className=" px-4 w-full h-12 rounded-xl flex justify-center items-center border-1 hover:bg-indigo-600/50 border-indigo-600/50 text-base cursor-pointer bg-black"
                  value={selectedVoiceId ?? ''}
                  onChange={handleVoiceChange}
                >
                    { voicesCollection.length>0? (
                        voicesCollection.map((voice)=> (
                            <option className="bg-white/10 text-black"  key={voice.id} value={voice.id}>
                                Voice {voice.name}
                            </option>
                        ))
                    ) 
                    :(<option value="" disabled> No voices available</option>)

                    }
                 </select>
              </div>
              <div className="flex  flex-col gap-2 items-start px-5 my-8">
               <div className="flex  justify-center gap-3 items-start w-full min-h-40">
                 <h2 className="text-xl ">Text:</h2>
                <textarea 
                  ref={textAreaRef}
                  className="border-1 rounded-sm border-gray-600 py-1 px-3 h-50 w-full bg-white/10 " 
                  name="speechText" 
                  onChange={handleTextChange} 
                  placeholder="Enter the speech text..." 
                  value={text}
                  rows={4}
                ></textarea>
               </div>
              </div>
              <div className="flex gap-4 justify-center">
                <ButtonRed type="button" text="Reset" onClick={handleReset}>
                </ButtonRed>
                <Button text="Generate Speech" type="button" onClick={()=>handleSpeechGenerate(selectedVoiceId, text)}>
                </Button>
                
              </div>
            </CardContent>
          </Card>

            {/* <Button type="button" onClick={()=> handleSpeechGenerate(selectedVoiceId, text)} text="speech post"></Button> */}
        </div>
    )
}

export default Speech;