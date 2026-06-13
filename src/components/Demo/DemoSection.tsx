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
    <div className="py-20 px-4 md:px-10 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            See the Magic in Action
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Experience how our AI transforms original footage into perfectly lip-synced content.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <demo.icon size={20} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-white">
                      {demo.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center relative group">
                    {demo.type === 'video' ? (
                      <video 
                        src={demo.src} 
                        controls 
                        className="w-full h-full object-cover"
                        poster="/lipsync-logo.png"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-zinc-800 to-zinc-900">
                        <Mic className="w-16 h-16 text-blue-500 mb-4 animate-pulse" />
                        <audio src={demo.src} controls className="w-full" />
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 italic text-center">
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
