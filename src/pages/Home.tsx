import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Video, 
  Mic, 
  Wand2, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Check, 
  Zap, 
  Shield, 
  Cpu, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../components/providers/ThemeProvider';
import { useAuthStore } from '../stores/authStore';
import DemoSection from '../components/Demo/DemoSection';
import { toast } from 'sonner';

const Home: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (id: string) => {
    setMobileNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-black/85 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              {/* Vercel Geometric Triangle Logo */}
              <div className="relative w-8 h-8 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 100 100" className="w-4.5 h-4.5 fill-current">
                  <polygon points="50,15 90,85 10,85" />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight font-sans text-zinc-900 dark:text-white">
                LIPSYNC AI
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <button onClick={() => scrollToSection('features')} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">How It Works</button>
              <button onClick={() => scrollToSection('demo')} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Showcase</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">Pricing</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-zinc-400 hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-650 hover:text-blue-600 transition-colors" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/clips"
                    className="flex items-center justify-center gap-1.5 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 px-4 py-1.5 rounded-md text-sm font-medium transition-colors border border-black dark:border-white shadow-sm"
                  >
                    Go to Workspace
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-zinc-655 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-3 py-1.5 cursor-pointer"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-3 py-1.5"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-150 px-4 py-1.5 rounded-md text-sm font-medium transition-colors border border-black dark:border-white shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Nav Button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-55 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-zinc-600 dark:text-zinc-400"
            >
              {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileNavOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 space-y-4 shadow-xl z-50 transition-colors"
          >
            <div className="flex flex-col gap-3.5">
              <button onClick={() => scrollToSection('features')} className="text-left font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-left font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('demo')} className="text-left font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">Showcase</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">Pricing</button>
            </div>
            <div className="border-t border-zinc-150 dark:border-zinc-900 pt-4 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/clips"
                    onClick={() => setMobileNavOpen(false)}
                    className="w-full flex items-center justify-center gap-1.5 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 py-2.5 rounded-md text-sm font-medium transition-colors border border-black dark:border-white shadow-sm"
                  >
                    Go to Workspace
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => { setMobileNavOpen(false); handleLogout(); }}
                    className="w-full text-center text-sm font-medium text-zinc-500 hover:text-zinc-900 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileNavOpen(false)}
                    className="w-full text-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileNavOpen(false)}
                    className="w-full text-center text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 py-2.5 rounded-md transition-colors border border-black dark:border-white shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 flex flex-col items-center text-center px-6 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none dark:from-blue-500/5 dark:to-indigo-500/5"></div>
        
        {/* Center Grid Highlight Mask */}
        <div className="absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-transparent via-white/80 to-white dark:via-black/80 dark:to-black z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Introducing LipSync AI 2.0</span>
            <span className="w-[1px] h-3 bg-zinc-300 dark:bg-zinc-750"></span>
            <span className="flex items-center gap-0.5 text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Read notes <ChevronRight className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] font-sans"
          >
            Make any video talk.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-400 dark:from-white dark:via-zinc-300 dark:to-zinc-600">
              Synchronized perfectly.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Turn voice clones, audio files, or plain text scripts into realistic videos with zero delay. Perfect mouth-syncing powered by next-gen generative AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
          >
            <Link
              to={isAuthenticated ? "/clips" : "/register"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 border border-black dark:border-white rounded-md font-medium text-base transition-colors shadow-lg cursor-pointer"
            >
              Start Creating Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => scrollToSection('demo')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 dark:bg-black dark:hover:bg-zinc-900 dark:text-white dark:border-zinc-800 rounded-md font-medium text-base transition-colors cursor-pointer"
            >
              Watch Showcase
            </button>
          </motion.div>
        </div>

        {/* APP MOCKUP GRAPHIC */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-16 md:mt-24 w-full max-w-5xl rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-2 backdrop-blur-md shadow-2xl z-10"
        >
          {/* Top window bar mock */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70"></span>
            </div>
            <div className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-900 px-3 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-800">
              lipsync-ai.vercel.app/workspace/clips
            </div>
            <div className="w-12"></div>
          </div>
          
          {/* Main content grid mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white dark:bg-zinc-950 rounded-b-lg overflow-hidden min-h-[300px] sm:min-h-[450px]">
            {/* Sidebar menu */}
            <div className="border-r border-zinc-100 dark:border-zinc-900 p-4 space-y-4 hidden sm:block text-left bg-zinc-50/50 dark:bg-zinc-950/20">
              <div className="h-6 w-24 bg-zinc-100 dark:bg-zinc-900 rounded"></div>
              <div className="space-y-2 pt-2">
                <div className="h-8 w-full bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200/30 dark:border-zinc-800 flex items-center px-3 gap-2">
                  <Video className="w-3.5 h-3.5 text-zinc-400" />
                  <div className="h-2 w-16 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
                </div>
                <div className="h-8 w-full bg-zinc-50/20 dark:bg-transparent rounded-md flex items-center px-3 gap-2">
                  <Mic className="w-3.5 h-3.5 text-zinc-400" />
                  <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
                <div className="h-8 w-full bg-zinc-50/20 dark:bg-transparent rounded-md flex items-center px-3 gap-2">
                  <Wand2 className="w-3.5 h-3.5 text-zinc-400" />
                  <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
              </div>
            </div>

            {/* Video preview pane */}
            <div className="col-span-2 p-6 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-2">
                <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                <div className="h-3 w-56 bg-zinc-100 dark:bg-zinc-900 rounded"></div>
              </div>
              
              <div className="aspect-video w-full max-w-lg mx-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center overflow-hidden relative group">
                {/* Simulated play button */}
                <div className="w-12 h-12 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-md group-hover:scale-105 transition-transform z-10">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                {/* Waveform graphic overlay */}
                <div className="absolute bottom-4 inset-x-4 h-10 flex items-end justify-center gap-[3px] opacity-40 dark:opacity-20 z-0">
                  {[40, 60, 20, 80, 50, 70, 30, 90, 45, 60, 85, 30, 50, 70, 95, 40, 60, 25, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-zinc-900 dark:bg-white rounded-t" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-4">
                <div className="h-6 w-24 bg-zinc-100 dark:bg-zinc-900 rounded"></div>
                <div className="h-8 w-28 bg-black dark:bg-white rounded-md"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* DETAILED FEATURES SECTION */}
      <section id="features" className="py-20 md:py-28 px-6 border-t border-zinc-200/80 dark:border-zinc-800/80 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold font-mono tracking-widest text-zinc-500 uppercase">
              Engineered For Excellence
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Powerful tools, built to optimize your creative pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Wand2,
                title: "One-Click Sync Engine",
                desc: "Simply drop your video and audio. Our deep neural network aligns the lip movements instantly with sub-frame precision.",
                badge: "Core"
              },
              {
                icon: Mic,
                title: "Premium AI Voice Library",
                desc: "Gain access to 100+ hyper-realistic text-to-speech models covering multiple accents, ages, and languages.",
                badge: "Updated"
              },
              {
                icon: Video,
                title: "HD Video Rendering",
                desc: "Export final videos in full crystal-clear 1080p output. Perfect details, lighting, and texture maps preserved.",
                badge: "1080p"
              },
              {
                icon: Zap,
                title: "Lightning Rendering Speed",
                desc: "Powered by cluster of high-end NVIDIA H100 GPUs, processing outputs 5x faster than average render queues.",
                badge: "GPU"
              },
              {
                icon: Shield,
                title: "Secure Data Isolation",
                desc: "Your source assets are processed with end-to-end encryption. Content is never reused for model pretraining.",
                badge: "Security"
              },
              {
                icon: Cpu,
                title: "Voice Cloning Module",
                desc: "Record a short 10-second reference clip to synthesize an exact digital replica of your voice in multiple languages.",
                badge: "Beta"
              }
            ].map((feat, idx) => (
              <div 
                key={idx} 
                className="group relative flex flex-col justify-between p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-350 cursor-default"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 bg-transparent">
                      {feat.badge}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-base text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform duration-300">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-zinc-550 dark:text-zinc-450 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 border-t border-zinc-200/80 dark:border-zinc-800/80 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold font-mono tracking-widest text-zinc-500 uppercase">
              Simple Workflow
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Create lipsynced videos in three steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Source Video",
                desc: "Choose an existing MP4 template or upload your own video clip of any length containing a clear speaker view."
              },
              {
                step: "02",
                title: "Provide Audio or Script",
                desc: "Upload an audio file (.mp3, .wav), clone your voice, or simply type your script and select one of our premium AI speaker models."
              },
              {
                step: "03",
                title: "Generate and Download",
                desc: "Review your options and hit 'Generate'. Our backend matches the lip geometry and renders your video ready in seconds."
              }
            ].map((step, idx) => (
              <div key={idx} className="space-y-4 p-6 rounded-lg border border-zinc-150 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950/20 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40 transition-colors">
                <div className="text-3xl font-mono font-bold text-zinc-350 dark:text-zinc-700">
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE / DEMO SECTION */}
      <section id="demo" className="border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-300">
        <DemoSection />
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 md:py-28 px-6 border-t border-zinc-200/80 dark:border-zinc-800/80 relative transition-colors duration-300 bg-zinc-50/30 dark:bg-zinc-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold font-mono tracking-widest text-zinc-500 uppercase">
              Flexible Pricing
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Pay only for what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black flex flex-col justify-between space-y-8">
              <div className="space-y-4 text-left">
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">Hobby</h3>
                <p className="text-xs text-zinc-500">For creators starting out</p>
                <div className="text-3xl font-bold font-sans text-zinc-900 dark:text-white">
                  $0 <span className="text-sm font-normal text-zinc-500">/mo</span>
                </div>
                <ul className="space-y-2.5 text-sm pt-4">
                  {["3 Video Generations / mo", "10 Premium AI Voices", "Standard 720p Exports", "No Voice Cloning"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to={isAuthenticated ? "/clips" : "/register"}
                className="w-full text-center py-2 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md text-sm font-medium text-zinc-900 dark:text-white transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-6 rounded-lg border-2 border-zinc-900 dark:border-white bg-white dark:bg-black flex flex-col justify-between space-y-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-semibold tracking-wider uppercase">
                Most Popular
              </div>
              <div className="space-y-4 text-left">
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">Pro</h3>
                <p className="text-xs text-zinc-500">For professional content creators</p>
                <div className="text-3xl font-bold font-sans text-zinc-900 dark:text-white">
                  $29 <span className="text-sm font-normal text-zinc-500">/mo</span>
                </div>
                <ul className="space-y-2.5 text-sm pt-4">
                  {["Unlimited MP4 Uploads", "100+ Ultra-Realistic Voices", "Full 1080p HD Exports", "3 Custom Voice Clones", "Priority Rendering Queue"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to={isAuthenticated ? "/clips" : "/register"}
                className="w-full text-center py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 rounded-md text-sm font-medium transition-colors border border-black dark:border-white shadow-sm"
              >
                Start Pro Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black flex flex-col justify-between space-y-8">
              <div className="space-y-4 text-left">
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">Enterprise</h3>
                <p className="text-xs text-zinc-500">For teams and organizations</p>
                <div className="text-3xl font-bold font-sans text-zinc-900 dark:text-white">
                  Custom
                </div>
                <ul className="space-y-2.5 text-sm pt-4">
                  {["Dedicated GPU Allocations", "Unlimited Voice Cloning", "Custom API Access Integrations", "SLA & 24/7 Priority Support", "Shared Team Dashboards"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="mailto:contact@sarthakbuilds.in"
                className="w-full text-center py-2 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md text-sm font-medium text-zinc-900 dark:text-white transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-16 pb-12 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2 group w-fit">
                <div className="relative w-7.5 h-7.5 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-md overflow-hidden transition-transform duration-300">
                  <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current">
                    <polygon points="50,15 90,85 10,85" />
                  </svg>
                </div>
                <span className="font-semibold text-base tracking-tight text-zinc-900 dark:text-white font-sans">
                  LIPSYNC AI
                </span>
              </Link>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                An advanced AI-powered video editing platform designed for creating viral video content with lifelike synthetic voices.
              </p>
              <div className="pt-2">
                <a 
                  href="https://x.com/Sarthakbuilds" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all"
                >
                  <span>Built by @sarthakbuilds</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Features</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">How It Works</button></li>
                <li><button onClick={() => scrollToSection('demo')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Showcase</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Pricing</button></li>
              </ul>
            </div>

            {/* Developer Links */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest">Developers</h4>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom copyright */}
          <div className="border-t border-zinc-150 dark:border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <div>
              &copy; {new Date().getFullYear()} LipSync AI Inc. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Security</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;