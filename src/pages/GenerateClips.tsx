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
    // Simulate a delay then show the message
    setTimeout(() => {
      setIsGenerating(false);
      toast.info("We are building, this functionality cost us due api of ai message.", {
        description: "The AI generation pipeline is currently restricted.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#0d0d0f] text-zinc-900 dark:text-white p-6 font-sans transition-colors duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/20">
          <Clapperboard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Generate Content</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Synchronize audio and video with AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Control Panel */}
        <Card className="col-span-1 bg-zinc-50 dark:bg-[#121214] border-zinc-200 dark:border-white/5 h-fit shadow-lg">
          <CardHeader className="border-b border-zinc-200 dark:border-white/5 pb-4">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Video Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Video className="w-4 h-4 text-zinc-500" /> Source Video
              </label>
              <select
                value={selectedVideo}
                onChange={(e) => setSelectedVideo(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-zinc-900 dark:text-white"
              >
                <option value="">Select a video...</option>
                <option value="v1">Demo_Product_Launch.mp4</option>
                <option value="v2">Tutorial_Part1.mp4</option>
                <option value="v3">Customer_Testimonial.mp4</option>
              </select>
            </div>

            {/* Voice Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-zinc-500" /> AI Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-zinc-900 dark:text-white"
              >
                <option value="">Select a voice...</option>
                <option value="voice1">Narrative - Deep Male</option>
                <option value="voice2">Friendly Female</option>
                <option value="voice3">News Anchor</option>
              </select>
            </div>

            {/* Script Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Script / Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-zinc-900 dark:text-white resize-none"
                placeholder="Enter the text you want the video to speak..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Processing...
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

        {/* Preview Area */}
        <div className="col-span-1 lg:col-span-2 bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 pointer-events-none"></div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white dark:bg-zinc-900/80 rounded-full flex items-center justify-center mx-auto border border-zinc-200 dark:border-white/5 shadow-sm">
              <Play className="w-6 h-6 text-zinc-400 dark:text-zinc-600 ml-1" />
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 font-medium">Preview will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateClips;