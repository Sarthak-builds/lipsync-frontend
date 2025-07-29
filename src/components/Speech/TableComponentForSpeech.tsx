
import type { SpeechGeneratedResponse } from "../../types/speech";


interface TableProps {
   speechGeneratedResponseDisplay : SpeechGeneratedResponse[] | null;
}
const TableSpeech: React.FC<TableProps> = ({speechGeneratedResponseDisplay}) => {


    return (
        <div className="overflow-x-auto px-2 py-1">
            <table className="w-full text-center rounded-2xl">
                <thead className="bg-black/80 h-12 rounded-2xl">
                <tr>
                    <th>ID</th>
                    <th>VOICE ID</th>
                    <th> Created at:</th>
                    <th>TEXT PROMPT</th>
                    </tr>
                </thead>
                <tbody className="h-fit border-1">
                    {speechGeneratedResponseDisplay && speechGeneratedResponseDisplay.length > 0 ? (
            speechGeneratedResponseDisplay.map((speech) => (
              <tr key={speech.id} className="border-b border-gray-600">
                <td className="p-2">{speech.id}</td>
                <td className="p-2">{speech.voice}</td>
                <td className="p-2">{speech.created_at}</td>
                <td className="p-2">{speech.text}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-2 text-gray-400">
                No speeches available
              </td>
            </tr>
          )}
                </tbody>
            </table>
        </div>
    )
}

export default TableSpeech;