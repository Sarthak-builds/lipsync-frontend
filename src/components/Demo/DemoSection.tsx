import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card';

const DemoSection: React.FC = () => {
  const demos = [
    {
      title: "Original Video Sample",
      type: "video",
      src: "/original_video.mp4",
      icon: Video,
      description: "The source video before AI processing."
    },
    {
      title: "AI Voice Demo (Zuck)",
      type: "audio",
      src: "/(Audio) zuck.m4a",
      icon: Mic,
      description: "Sample AI-generated voice used for lip-syncing."
    },
    {
      title: "Generated Result 01",
      type: "video",
      src: "/generated_video_13.mp4",
      icon: Wand2,
      description: "Script: 'Hi, I am Sarthak, I am a fullstack developer'"
    },
    {
      title: "Generated Result 02",
      type: "video",
      src: "/generated_video_20.mp4",
      icon: Wand2,
      description: "High-fidelity generated output with perfect sync."
    }
  ];

  return (
    <div className="py-20 px-6 bg-[#edf2ee] dark:bg-[#0f1411] transition-colors duration-300 relative overflow-hidden">
      {/* Decorative calm green ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] bg-[#608c6c]/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-xs font-semibold font-mono tracking-widest text-[#385942] dark:text-[#7ea68a] uppercase">
            Showcase
          </h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-normal tracking-tight text-[#1c1c1c] dark:text-white font-serif"
          >
            See the magic in <span className="italic text-[#385942] dark:text-[#7ea68a]">perfect action</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#5c5852] dark:text-[#a39e95] text-base sm:text-lg max-w-xl mx-auto font-sans"
          >
            Experience how our AI transforms original footage into naturally spoken clips.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="overflow-hidden border-[#ebdcd0] dark:border-[#201f1c] bg-[#fdfdfc]/80 dark:bg-[#121211]/80 backdrop-blur-md hover:border-[#385942] dark:hover:border-[#7ea68a] transition-all duration-350 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] text-[#385942] dark:text-[#7ea68a] bg-[#faf8f5] dark:bg-[#0d0d0c]">
                      <demo.icon size={18} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#1c1c1c] dark:text-white font-sans">
                      {demo.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center relative group border border-[#ebdcd0]/40 dark:border-[#201f1c]/45">
                    {demo.type === 'video' ? (
                      <video 
                        src={demo.src} 
                        controls 
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#fdfdfc] dark:bg-[#121211] relative">
                        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <Mic className="w-12 h-12 text-[#385942] dark:text-[#7ea68a] mb-4 animate-pulse relative z-10" />
                        <audio src={demo.src} controls className="w-full relative z-10" />
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-xs text-[#5c5852] dark:text-[#a39e95] italic text-center font-sans">
                    {demo.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
