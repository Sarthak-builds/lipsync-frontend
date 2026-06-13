import { useEffect } from "react";
import TableSpeech from "./TableComponentForSpeech";
import { useSpeechStore } from "../../stores/speechStore";
import { useVoiceStore } from "../../stores/voicesStore";

const SpeechTable: React.FC = () => {
  const { allSpeechGenerated, getAllSpeechesGenerated } = useSpeechStore();
  const { voicesCollection, getAllVoices } = useVoiceStore();

  useEffect(() => {
    const fetchData = async () => {
      await getAllVoices();
      await getAllSpeechesGenerated();
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-[#ebdcd0] dark:border-[#201f1c] text-[#5c5852] bg-[#fdfdfc] dark:bg-[#121211]">
          History
        </span>
        <h2 className="text-sm font-semibold tracking-tight text-[#1c1c1c] dark:text-zinc-200">
          Synthesized Collection
        </h2>
      </div>
      <TableSpeech speechGeneratedResponseDisplay={allSpeechGenerated} voicesCollection={voicesCollection} />
    </div>
  );
};

export default SpeechTable;