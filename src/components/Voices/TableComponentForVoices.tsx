import type { VoicesData } from "../../types/voices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/table";
import { useVoiceStore } from "../../stores/voicesStore";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../UI/card";
import Button from "../UI/Button";
import ButtonRed from "../UI/ButtonRed";

interface TableProps {
  voiceDataDisplay: VoicesData[];
}

const VoicesTableComponent: React.FC<TableProps> = ({ voiceDataDisplay }) => {
const {deleteVoiceById, getAllVoices}= useVoiceStore();
 const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [voiceToDelete, setVoiceToDelete] = useState<number | null>(null);

  const handleDelete = (voiceId: number) => {
setVoiceToDelete(voiceId);
setShowDeletePopup(true);
  } 
const confirmDelete = async () => {
    if (voiceToDelete) {
      try {
       await deleteVoiceById(voiceToDelete);
        setShowDeletePopup(false);
        setVoiceToDelete(null);
        await getAllVoices();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };
  const cancelDelete = () => {
    setShowDeletePopup(false);
    setVoiceToDelete(null);
  };


  return (
    <div className="overflow-x-auto px-2 py-1 rounded-sm font-geist">
      <Table className="w-full  border-1 rounded-sm  border-neutral-700 ">
        <TableHeader className="bg-black/50 h-12  rounded-md">
          <TableRow className="text-base bg-black  hover:bg-[#1111139e] rounded-sm">
            <TableHead className="text-center text-white ">ID</TableHead>
            <TableHead className="text-center text-white">NAME</TableHead>
            <TableHead className="text-center text-white">CREATED AT</TableHead>
            <TableHead className="text-center text-white">FILES UPLOADED</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#111113bb] rounded-t-md">
          {voiceDataDisplay.length > 0 ? (
            voiceDataDisplay.map((voice) => (
              <TableRow key={voice.id} className="hover:bg-neutral-800">
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
                <TableCell onClick={()=>handleDelete(voice.id)} className="text-center cursor-pointer"><i className="ri-delete-bin-6-line text-red-500"></i></TableCell>
              </TableRow>
              
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-white py-4">
                No voices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showDeletePopup && (
        <div className="fixed inset-0 bg=black/50 flex items-center justify-center z-50">
          <Card className="bg-black rounded-2xl border-1 border-neutral-700 p-6 w-96 text-white font-geist">
            <CardHeader>
              <CardTitle className="text-lg">Confirm Delete</CardTitle>
              <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p>Are you sure you want to delete this voice file?</p>
              <div className="flex gap-4 justify-end">
                <ButtonRed type="button" text="Cancel" onClick={cancelDelete} />
                <Button type="button" text="Delete" onClick={confirmDelete} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VoicesTableComponent;