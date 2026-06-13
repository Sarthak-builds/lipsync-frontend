import type { SpeechGeneratedResponse } from "../../types/speech";
import type { VoiceMetaData } from "../../types/voices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/table";

interface TableProps {
  speechGeneratedResponseDisplay: SpeechGeneratedResponse[] | null;
  voicesCollection: VoiceMetaData[];
}

const TableSpeech: React.FC<TableProps> = ({ speechGeneratedResponseDisplay, voicesCollection }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#ebdcd0] dark:border-[#201f1c] bg-[#fdfdfc] dark:bg-[#121211]">
      <Table className="w-full">
        <TableHeader className="bg-[#faf8f5] dark:bg-[#0d0d0c]">
          <TableRow className="border-b border-[#ebdcd0] dark:border-[#201f1c] hover:bg-transparent">
            <TableHead className="text-center font-semibold text-xs tracking-wider text-[#5c5852] dark:text-[#a39e95] h-11">ID</TableHead>
            <TableHead className="text-center font-semibold text-xs tracking-wider text-[#5c5852] dark:text-[#a39e95]">VOICE NAME</TableHead>
            <TableHead className="text-center font-semibold text-xs tracking-wider text-[#5c5852] dark:text-[#a39e95]">CREATED AT</TableHead>
            <TableHead className="text-center font-semibold text-xs tracking-wider text-[#5c5852] dark:text-[#a39e95]">TEXT PROMPT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {speechGeneratedResponseDisplay && speechGeneratedResponseDisplay.length > 0 ? (
            speechGeneratedResponseDisplay.map((speech) => (
              <TableRow 
                key={speech.id} 
                className="border-b border-[#ebdcd0]/60 dark:border-[#201f1c] last:border-0 hover:bg-[#faf8f5] dark:hover:bg-[#0d0d0c]/50 transition-colors"
              >
                <TableCell className="text-center text-xs font-mono text-[#5c5852] dark:text-[#a39e95] py-3">{speech.id}</TableCell>
                <TableCell className="text-center text-sm font-medium text-[#1c1c1c] dark:text-zinc-200">
                  {voicesCollection.find(v => v?.id === speech.voice)?.name || "Unknown"}
                </TableCell>
                <TableCell className="text-center text-xs text-[#5c5852] dark:text-[#a39e95] font-mono">
                  {speech.created_at ? speech.created_at.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell className="text-center text-xs text-[#5c5852] dark:text-[#a39e95] max-w-70 overflow-hidden text-ellipsis whitespace-nowrap">
                  {speech.text}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-sm text-[#5c5852] dark:text-[#a39e95] py-8">
                No speeches found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSpeech;