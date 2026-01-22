import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '../components/UI/aurora-background';
import { Sparkles, ArrowRight, Video, Mic, Wand2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/providers/ThemeProvider';

const Home: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <AuroraBackground>
      {/* Theme Toggle */}
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-zinc-400 hover:text-yellow-400 transition-colors" />
          ) : (
            <Moon className="w-6 h-6 text-zinc-600 hover:text-blue-600 transition-colors" />
          )}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 font-sans text-zinc-900 dark:text-white">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 dark:bg-white/10 dark:border-white/10 text-xs font-medium text-blue-600 dark:text-blue-300 mb-4 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3" />
            <span>AI-Powered Video Creation</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-zinc-900 dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:to-white/60">
            Create Viral Videos <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">
              In Seconds
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Turn your ideas into engaging video content with lifelike AI voices and perfectly synced visuals. No editing skills required.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/clips"
              className="group flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              Start Creating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/videos"
              className="flex items-center gap-2 px-8 py-3.5 bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10 rounded-full font-medium transition-all backdrop-blur-sm"
            >
              View Gallery
            </Link>
          </motion.div>
        </motion.div>

        {/* Mini Features / Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { icon: Video, label: "HD Video Export", desc: "Crystal clear 1080p output covering every detail." },
            { icon: Mic, label: "Ultra-Realistic Voices", desc: "Choose from 100+ premium AI voices." },
            { icon: Wand2, label: "One-Click Sync", desc: "Perfect lip-syncing powered by advanced AI." },
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-default">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white/90">{feature.label}</h3>
              <p className="text-sm text-zinc-500">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </AuroraBackground>
  );
};

export default Home;