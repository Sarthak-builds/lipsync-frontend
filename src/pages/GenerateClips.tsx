import React, { useState } from 'react';
import { Clapperboard, Sparkles, Video, Volume2, Wand2, Play } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '../components/UI/card';

const GenerateClips: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!selectedVideo || !selectedVoice || !text.trim()) {
      toast.error("Please select a video, voice, and enter text.");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.info("We are building this pipeline.", {
        description: "The AI generation pipeline is simulated for demo purposes.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5] dark:bg-[#0d0d0c] text-[#1c1c1c] dark:text-[#e5e1db] p-4 md:p-8 font-sans transition-colors duration-300 relative">
      <div className="flex items-center gap-3.5 mb-8 border-b border-[#ebdcd0]/30 dark:border-[#201f1c] pb-6">
        <div className="p-2.5 bg-[#385942] dark:bg-[#4b7358] rounded-full text-white dark:text-black shadow-sm">
          <Clapperboard className="w-5.5 h-5.5" />
        </div>
        <div>
          <h1 className="text-3xl font-normal font-serif text-[#1c1c1c] dark:text-white">Generate Content</h1>
          <p className="text-[#5c5852] dark:text-[#a39e95] text-xs mt-0.5">Synchronize audio and video with AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Config Form Card */}
        <Card className="col-span-1 bg-[#fdfdfc] dark:bg-[#121211] border-[#ebdcd0] dark:border-[#201f1c] h-fit shadow-md rounded-2xl">
          <CardHeader className="border-b border-[#ebdcd0]/60 dark:border-[#201f1c] pb-4">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#5c5852] dark:text-[#a39e95] flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[#385942] dark:text-[#7ea68a]" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-[#5c5852] dark:text-[#a39e95] flex items-center gap-2">
                <Video className="w-4 h-4" /> Source Video
              </label>
              <select
                value={selectedVideo}
                onChange={(e) => setSelectedVideo(e.target.value)}
                className="w-full bg-[#fdfdfc] dark:bg-[#0d0d0c] border border-[#ebdcd0] dark:border-[#201f1c] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] text-[#1c1c1c] dark:text-white transition-colors cursor-pointer"
              >
                <option value="">Select a video...</option>
                <option value="v1">Demo_Product_Launch.mp4</option>
                <option value="v2">Tutorial_Part1.mp4</option>
                <option value="v3">Customer_Testimonial.mp4</option>
              </select>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-[#5c5852] dark:text-[#a39e95] flex items-center gap-2">
                <Volume2 className="w-4 h-4" /> AI Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full bg-[#fdfdfc] dark:bg-[#0d0d0c] border border-[#ebdcd0] dark:border-[#201f1c] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] text-[#1c1c1c] dark:text-white transition-colors cursor-pointer"
              >
                <option value="">Select a voice...</option>
                <option value="voice1">Narrative - Deep Male</option>
                <option value="voice2">Friendly Female</option>
                <option value="voice3">News Anchor</option>
              </select>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-[#5c5852] dark:text-[#a39e95]">Script / Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 bg-[#fdfdfc] dark:bg-[#0d0d0c] border border-[#ebdcd0] dark:border-[#201f1c] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] text-[#1c1c1c] dark:text-white resize-none transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                placeholder="Enter the text you want the video to speak..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white dark:text-black rounded-full font-semibold text-xs tracking-wide shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer border border-transparent"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Clip
                </>
              )}
            </button>
          </CardContent>
        </Card>

        {/* Video Preview Column */}
        <div className="col-span-1 lg:col-span-2 bg-[#fdfdfc] dark:bg-[#121211]/30 border border-[#ebdcd0] dark:border-[#201f1c] rounded-2xl flex items-center justify-center relative overflow-hidden min-h-[300px]">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 z-0 opacity-[0.02] bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

          <div className="text-center space-y-4 relative z-10">
            <button 
              onClick={handleGenerate}
              className="w-14 h-14 bg-[#faf8f5] dark:bg-[#0d0d0c] rounded-full flex items-center justify-center mx-auto border border-[#ebdcd0] dark:border-[#201f1c] shadow-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <Play className="w-5 h-5 text-[#385942] dark:text-[#7ea68a] ml-0.5 fill-current" />
            </button>
            <p className="text-xs text-[#5c5852] dark:text-[#a39e95] font-semibold">Preview will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateClips;