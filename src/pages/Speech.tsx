import React from "react";
import SpeechTable from "../components/Speech/SpeechTable";
import { Mic } from "lucide-react";

const Speech: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5] dark:bg-[#0d0d0c] text-[#1c1c1c] dark:text-[#e5e1db] p-4 md:p-8 font-sans transition-colors duration-300 relative">
      <div className="flex items-center justify-between mb-8 border-b border-[#ebdcd0]/30 dark:border-[#201f1c] pb-6">
        <div>
          <h1 className="text-3xl font-normal flex items-center gap-2.5 font-serif text-[#1c1c1c] dark:text-white uppercase tracking-tight">
            <Mic className="w-7 h-7 text-[#385942] dark:text-[#7ea68a]" />
            Speeches
          </h1>
          <p className="text-[#5c5852] dark:text-[#a39e95] text-xs mt-1">Manage and audit synthesized speeches.</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <SpeechTable />
      </div>
    </div>
  );
};

export default Speech;