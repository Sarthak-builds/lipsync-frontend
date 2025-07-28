import VoicesTable from "../components/Voices/VoicesTable";


const VoicePage:React.FC = () => {




    return (
       <div className="flex px-30 py-10 bg-neutral-800 mx-1 rounded-2xl text-white w-full h-full  min-h-screen flex-col gap-10 "> 
       <div>
        <h1>VOICES</h1>
       </div>
            <div>
                <VoicesTable></VoicesTable>
            </div>
        </div>
    )
}

export default VoicePage;