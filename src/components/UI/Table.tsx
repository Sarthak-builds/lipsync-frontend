
import type { VoicesData } from "../../types/voices";


interface TableProps {
    voiceDataDisplay: VoicesData[];
}
const Table: React.FC<TableProps> = ({voiceDataDisplay}) => {


    return (
        <div className="overflow-x-auto px-2 py-1">
            <table className="w-full text-center rounded-2xl">
                <thead className="bg-black/80 h-12 rounded-2xl">
                <tr>
                    <th>ID</th>
                    <th> NAME</th>
                    <th> Created at:</th>
                    <th> Generations</th>
                    </tr>
                </thead>
                <tbody className="h-fit border-1">
                    {voiceDataDisplay.map((voice) => {
                        return (
                          <tr key={voice.id}>
                          <td>{voice.id}</td>
                          <td>{voice.name}</td>
                          <td>{voice.created_at?.split('T')[0]}</td>
                           <td>{voice.files?.length}</td>
                               </tr>
                                  );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table