import type { SpeechGeneratedResponse } from "../../types/speech";
import type { VoiceMetaData } from "../../types/voices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/table"; // Adjust the import path based on your project structure


interface TableProps {
   speechGeneratedResponseDisplay : SpeechGeneratedResponse[] | null;
   voicesCollection: VoiceMetaData[];
}
const TableSpeech: React.FC<TableProps> = ({speechGeneratedResponseDisplay, voicesCollection}) => {


    return (
        <div className="overflow-x-auto px-2 py-1 rounded-sm font-geist ">
      <Table className="w-full  border-1 rounded-sm  border-neutral-700">
        <TableHeader className="bg-black/50 h-12  rounded-md">
          <TableRow className="text-base bg-black hover:bg-[#1111139e] rounded-sm">
            <TableHead className="text-center text-white ">ID</TableHead>
            <TableHead className="text-center text-white">VOICE NAME</TableHead>
            <TableHead className="text-center text-white">CREATED AT</TableHead>
            <TableHead className="text-center text-white">TEXT PROMPT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#111113bb] rounded-t-md">
          {speechGeneratedResponseDisplay && speechGeneratedResponseDisplay.length > 0 ? (
            speechGeneratedResponseDisplay.map((speech) => (
              <TableRow key={speech.id} className="hover:bg-neutral-800">
                <TableCell className="text-center text-white">{speech.id}</TableCell>
                <TableCell className="text-center text-white">
                  {voicesCollection.find(v => v?.id === speech.voice)?.name || "Unknown"}
                </TableCell>
                <TableCell className="text-center text-white">
                  {speech.created_at ? speech.created_at.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell className="text-center text-white max-w-70 h-12 overflow-hidden text-ellipsis whitespace-nowrap">
                  {speech.text}
                </TableCell>
              </TableRow>
              
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white py-4">
                No speeches found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    )
}

export default TableSpeech;