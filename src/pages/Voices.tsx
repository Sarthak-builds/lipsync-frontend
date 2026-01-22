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

    toast.info("We are building, this functionality cost us due api of ai message.", {
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
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#0d0d0f] text-zinc-900 dark:text-white p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Mic className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            Voice Lab
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Clone voices or choose from our premium library.</p>
        </div>
        <button
          onClick={() => setShowCreatePanel(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          New Voice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {voices.map((voice) => (
          <div key={voice.id} className="bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-blue-500/30 transition-colors group shadow-sm">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                voice.source === 'pre-made' ? "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
              )}>
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{voice.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 border border-zinc-300 dark:border-zinc-800 px-1.5 rounded">{voice.source}</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-200 dark:hover:bg-white/5 transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        ))}
      </div>

      {showCreatePanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md bg-white dark:bg-[#09090b] border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-2xl">
            <CardHeader className="border-b border-zinc-100 dark:border-white/5 pb-4">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                Create New Voice
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-600 dark:text-zinc-400">Voice Name</label>
                <input
                  type="text"
                  value={newVoiceName}
                  onChange={(e) => setNewVoiceName(e.target.value)}
                  placeholder="e.g. Spongebob AI"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 dark:text-white"
                  autoFocus
                />
              </div>

              <div className="p-4 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:border-blue-500/50 transition-colors">
                <div className="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Upload sample audio</p>
                  <p className="text-xs text-zinc-500">MP3, WAV up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreatePanel(false)}
                  className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors text-zinc-900 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateVoice}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
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