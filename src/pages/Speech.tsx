import { useState } from "react";
import SpeechTable from "../components/Speech/SpeechTable";
import Button from "../components/UI/Button";
import { generateSpeech } from "../services/apiSpeech";
import { useSpeechStore } from "../stores/speechStore";
import type { SpeechRequest } from "../types/speech";
import { useVoiceStore } from "../stores/voicesStore";
import { useFileStore } from "../stores/fileStore";

const Speech: React.FC = () => {
    const { voicesCollection} = useVoiceStore();
    const [text,  setText] = useState< string >('');
    const { getFileById} = useFileStore();
    const { getAllSpeechesGenerated, generateSpeech} = useSpeechStore();
    const [selectedVoiceId, setSelectedVoiceId] = useState<number | null>(null);

const handleSpeechGetClick = async () => {
const response = await getAllSpeechesGenerated();
const audioTrackIdCollection = response.map((audioFile)=> {audiotrackId:audioFile.audio_file});
console.log(audioTrackIdCollection);
console.log(response);
}

const handleSpeechGenerate = async (selectedVoiceId: number | null, text:string) => {
    const speechPayload: SpeechRequest = {
        text:text,
        voice: selectedVoiceId,
    }
    console.log(text);
    console.log(selectedVoiceId);
     console.log(speechPayload);

    // const response = await generateSpeech(speechPayload);
    // console.log(response);
}

    return (
        <div className="flex px-30 py-10 bg-neutral-800 mx-1 rounded-2xl text-white w-full h-full  min-h-screen flex-col gap-10">
            
            <div>
                <SpeechTable></SpeechTable>
                 <Button type="button" onClick={handleSpeechGetClick} text="speech Get"></Button>
            </div>
            <div className="w-full h-120 border-2 bg-black text-white rounded-xl flex flex-col px-10 py-10 gap-5">
                <div>
                  <label htmlFor="voiceId">Voice:</label>
                 <select id="voiceId"  className="bg-white/10 w-full "  value={selectedVoiceId ?? ''}
                 onChange={(e)=> setSelectedVoiceId(Number(e.target.value) || null )}>
                    { voicesCollection.length>0? (
                        voicesCollection.map((voice)=> (
                            <option className="bg-white/10 text-black"  key={voice.id} value={voice.id}>
                                Voice {voice.id}
                            </option>
                        ))
                    ) 
                    :(<option value=""disabled> No voices available</option>)

                    }
                 </select>
                </div>
                <div>
                    <label htmlFor="speechtext"> Text For Generation: </label>
                    <textarea id="speechText" value={text ?? ''} onChange={(e)=> setText(e.target.value)} className="w-full p-3 rounded bg-gray-800 text-white border-1 border-gray-600 focus:outline-none focus: borde-blue-600" rows={4} placeholder="Enter the speech text..."></textarea>
                </div>

            </div>

            <Button type="button" onClick={()=> handleSpeechGenerate(selectedVoiceId, text)} text="speech post"></Button>
        </div>
    )
}

export default Speech;