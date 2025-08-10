import type { VoicesData } from "../../types/voices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/table"; // Adjust the import path based on your project structure

interface TableProps {
  voiceDataDisplay: VoicesData[];
}

const VoicesTableComponent: React.FC<TableProps> = ({ voiceDataDisplay }) => {
  return (
    <div className="overflow-x-auto px-2 py-1 font-grotesk ">
      <Table className="w-full rounded-2xl  border-neutral-700 ">
        <TableHeader className="bg-black/80 h-12  rounded-t-2xl">
          <TableRow className="text-base bg-indigo-600/60 hover:bg-indigo-700/70">
            <TableHead className="text-center text-white ">ID</TableHead>
            <TableHead className="text-center text-white">NAME</TableHead>
            <TableHead className="text-center text-white">CREATED AT</TableHead>
            <TableHead className="text-center text-white">FILES UPLOADED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border border-neutral-700">
          {voiceDataDisplay.length > 0 ? (
            voiceDataDisplay.map((voice) => (
              <TableRow key={voice.id} className="hover:bg-neutral-900">
                <TableCell className="text-center text-white">{voice.id}</TableCell>
                <TableCell className="text-center text-white">
                  {voice.name || "N/A"}
                </TableCell>
                <TableCell className="text-center text-white">
                  {voice.created_at ? voice.created_at.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell className="text-center text-white">
                  {voice.files?.length || 0}
                </TableCell>
              </TableRow>
              
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white py-4">
                No voices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VoicesTableComponent;