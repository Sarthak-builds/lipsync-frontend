import SpeechTable from "../components/Speech/SpeechTable";
import Button from "../components/UI/Button";
import { generateSpeech } from "../services/apiSpeech";
import { useSpeechStore } from "../stores/speechStore";
import type { SpeechRequest } from "../types/speech";

const Speech: React.FC = () => {

    const { getAllSpeechesGenerated, generateSpeech} = useSpeechStore();

const handleSpeechGetClick = async () => {
const response = await getAllSpeechesGenerated();
console.log(response);
}

const handleSpeechGenerate = async () => {
    const speechPayload: SpeechRequest = {
        text:"hi, what's up? Do you know nizzy bhai? He's the founder of 0mail.com. It's an AI powered Gmail alternative. It's good, you should try it too",
        voice: 25,
    }
    const response = await generateSpeech(speechPayload);
    console.log(response);
}

    return (
        <div className="flex px-30 py-10 bg-neutral-800 mx-1 rounded-2xl text-white w-full h-full  min-h-screen flex-col gap-10">
            <SpeechTable></SpeechTable>
            <Button type="button" onClick={handleSpeechGetClick} text="speech Get"></Button>
            <Button type="button" onClick={handleSpeechGenerate} text="speech post"></Button>
        </div>
    )
}

export default Speech;