import React, { useState } from "react";
import { Mic, Plus, Play, Music } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/card";

interface VoiceItem {
  id: number;
  name: string;
  source: string;
}

const VoicePage: React.FC = () => {
  const [voices, setVoices] = useState<VoiceItem[]>([
    { id: 1, name: "Narrative - Deep Male", source: "pre-made" },
    { id: 2, name: "Friendly Female", source: "pre-made" },
    { id: 3, name: "News Anchor", source: "cloned" },
  ]);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [newVoiceName, setNewVoiceName] = useState("");

  const handleCreateVoice = () => {
    if (!newVoiceName.trim()) {
      toast.error("Please enter a voice name");
      return;
    }

    toast.info("We are building this functionality.", {
      description: "Simulating voice creation for demo workflow.",
      duration: 5000,
    });

    const newVoice = {
      id: Date.now(),
      name: newVoiceName,
      source: "custom-cloned"
    };
    setVoices([newVoice, ...voices]);
    setNewVoiceName("");
    setShowCreatePanel(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5] dark:bg-[#0d0d0c] text-[#1c1c1c] dark:text-[#e5e1db] p-4 md:p-8 font-sans transition-colors duration-300 relative">
      <div className="flex items-center justify-between mb-8 border-b border-[#ebdcd0]/30 dark:border-[#201f1c] pb-6">
        <div>
          <h1 className="text-3xl font-normal flex items-center gap-2.5 font-serif text-[#1c1c1c] dark:text-white">
            <Mic className="w-7 h-7 text-[#385942] dark:text-[#7ea68a]" />
            Voice Lab
          </h1>
          <p className="text-[#5c5852] dark:text-[#a39e95] text-xs mt-1">Clone voices or choose from our premium library.</p>
        </div>
        <button
          onClick={() => setShowCreatePanel(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white dark:text-black rounded-full transition-colors text-xs font-semibold tracking-wide shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          New Voice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {voices.map((voice) => (
          <div key={voice.id} className="bg-[#fdfdfc] dark:bg-[#121211] border border-[#ebdcd0] dark:border-[#201f1c] rounded-xl p-5 flex items-center justify-between hover:border-[#385942] dark:hover:border-[#7ea68a] transition-all group shadow-sm">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center border",
                voice.source === 'pre-made' 
                  ? "bg-[#385942]/10 border-[#385942]/20 text-[#385942] dark:text-[#7ea68a]" 
                  : "bg-purple-100 dark:bg-purple-500/10 border-purple-200/30 text-purple-650 dark:text-purple-400"
              )}>
                <Mic className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1c1c1c] dark:text-zinc-200">{voice.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#5c5852] dark:text-[#a39e95] border border-[#ebdcd0] dark:border-[#201f1c] px-2 py-0.5 rounded-full">{voice.source}</span>
                </div>
              </div>
            </div>
            <button className="p-2.5 text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white rounded-full hover:bg-[#faf8f5] dark:hover:bg-[#1a1917] transition-colors cursor-pointer border border-transparent hover:border-[#ebdcd0] dark:hover:border-[#201f1c]">
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        ))}
      </div>

      {showCreatePanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-md bg-[#faf8f5] dark:bg-[#121211] border-[#ebdcd0] dark:border-[#201f1c] text-[#1c1c1c] dark:text-[#e5e1db] shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-[#ebdcd0]/60 dark:border-[#201f1c] pb-4">
              <CardTitle className="text-lg font-normal font-serif flex items-center gap-2.5 text-[#1c1c1c] dark:text-white">
                <Plus className="w-4.5 h-4.5 text-[#385942] dark:text-[#7ea68a]" />
                Create New Voice
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 font-sans">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#5c5852] dark:text-[#a39e95]">Voice Name</label>
                <input
                  type="text"
                  value={newVoiceName}
                  onChange={(e) => setNewVoiceName(e.target.value)}
                  placeholder="e.g. Spongebob AI"
                  className="w-full bg-[#fdfdfc] dark:bg-[#0d0d0c] border border-[#ebdcd0] dark:border-[#201f1c] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 dark:text-white"
                  autoFocus
                />
              </div>

              <div className="p-5 border border-dashed border-[#ebdcd0] dark:border-[#201f1c] rounded-2xl bg-[#fdfdfc] dark:bg-[#0d0d0c]/30 flex flex-col items-center justify-center text-center space-y-2.5 cursor-pointer hover:border-[#385942] dark:hover:border-[#7ea68a] transition-colors group">
                <div className="p-3 bg-[#faf8f5] dark:bg-[#1c1c1a]/50 rounded-full text-[#5c5852] group-hover:bg-[#385942] group-hover:text-white dark:text-[#a39e95] dark:group-hover:bg-[#4b7358] dark:group-hover:text-black transition-colors">
                  <Music className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1c1c1c] dark:text-zinc-200">Upload voice sample</p>
                  <p className="text-[10px] text-[#5c5852] dark:text-[#a39e95] mt-0.5">MP3 or WAV files up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreatePanel(false)}
                  className="flex-1 px-4 py-2.5 border border-[#ebdcd0] dark:border-[#201f1c] hover:bg-[#f3eee5] dark:hover:bg-[#1a1917] rounded-full text-xs font-semibold tracking-wide transition-colors text-[#5c5852] dark:text-[#a39e95] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateVoice}
                  className="flex-1 px-4 py-2.5 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white dark:text-black rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  Create Voice
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VoicePage;