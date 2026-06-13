import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
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
import logoImage from '../assets/logo.jpg';
import { WavyBackground } from '../components/UI/wavy-background';

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

  // Micro-animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  const titleText = "Speak in any voice, synchronized instantly.";

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0d0d0c] text-[#1c1c1c] dark:text-[#e5e1db] font-sans selection:bg-[#e6dfd5] dark:selection:bg-[#2e2d2a] selection:text-[#1c1c1c] dark:selection:text-[#e5e1db] transition-colors duration-300 relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#ebdcd0]/40 dark:border-[#201f1c]/80 bg-[#faf8f5]/90 dark:bg-[#0d0d0c]/90 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#ebdcd0] dark:border-[#201f1c] shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img src={logoImage} className="w-full h-full object-cover" alt="LipSync Logo" />
              </div>
              <span className="font-semibold text-base tracking-tight font-sans text-[#1c1c1c] dark:text-[#e5e1db]">
                LIPSYNC AI
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5c5852] dark:text-[#a39e95]">
              <button onClick={() => scrollToSection('features')} className="hover:text-[#1c1c1c] dark:hover:text-[#e5e1db] transition-colors cursor-pointer">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#1c1c1c] dark:hover:text-[#e5e1db] transition-colors cursor-pointer">How It Works</button>
              <button onClick={() => scrollToSection('demo')} className="hover:text-[#1c1c1c] dark:hover:text-[#e5e1db] transition-colors cursor-pointer">Showcase</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-[#1c1c1c] dark:hover:text-[#e5e1db] transition-colors cursor-pointer">Pricing</button>
            </nav>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] bg-transparent hover:bg-[#f3eee5] dark:hover:bg-[#1a1917] transition-all cursor-pointer text-[#5c5852] dark:text-[#a39e95]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-zinc-400 hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-zinc-650 hover:text-blue-600 transition-colors" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-3.5">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/clips"
                    className="flex items-center justify-center gap-1.5 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm group"
                  >
                    Go to Workspace
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-semibold tracking-wide text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white transition-colors px-3 py-2 cursor-pointer"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs font-semibold tracking-wide text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white transition-colors px-3 py-2"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Nav Button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] bg-transparent hover:bg-[#f3eee5] dark:hover:bg-[#1a1917] transition-colors cursor-pointer text-[#5c5852] dark:text-[#a39e95]"
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
            className="md:hidden absolute top-16 left-0 w-full border-b border-[#ebdcd0] dark:border-[#201f1c] bg-[#faf8f5] dark:bg-[#0d0d0c] p-6 space-y-4 shadow-xl z-50 transition-colors"
          >
            <div className="flex flex-col gap-3.5">
              <button onClick={() => scrollToSection('features')} className="text-left font-semibold text-sm text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-left font-semibold text-sm text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('demo')} className="text-left font-semibold text-sm text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white transition-colors">Showcase</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left font-semibold text-sm text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white transition-colors">Pricing</button>
            </div>
            <div className="border-t border-[#ebdcd0]/60 dark:border-[#201f1c] pt-4 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/clips"
                    onClick={() => setMobileNavOpen(false)}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors shadow-sm"
                  >
                    Go to Workspace
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => { setMobileNavOpen(false); handleLogout(); }}
                    className="w-full text-center text-xs font-semibold tracking-wide text-[#5c5852] hover:text-[#1c1c1c] py-2.5 border border-[#ebdcd0] dark:border-[#201f1c] rounded-full bg-transparent dark:text-[#a39e95] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileNavOpen(false)}
                    className="w-full text-center text-xs font-semibold tracking-wide text-[#5c5852] dark:text-[#a39e95] hover:text-[#1c1c1c] dark:hover:text-white py-2.5 border border-[#ebdcd0] dark:border-[#201f1c] rounded-full bg-transparent transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileNavOpen(false)}
                    className="w-full text-center text-xs font-semibold tracking-wide bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white py-2.5 rounded-full transition-colors border border-[#385942] dark:border-[#4b7358] shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION - Wavy Background and Cream Canvas */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center z-10 bg-[#faf8f5] dark:bg-[#0d0d0c] transition-colors duration-300 border-b border-[#ebdcd0]/30 dark:border-[#201f1c]/30">
        <WavyBackground 
          colors={["#2e4735", "#385942", "#4a7056", "#608c6c", "#7ea68a"]} 
          backgroundFill={theme === "dark" ? "#0d0d0c" : "#faf8f5"}
          waveOpacity={theme === "dark" ? 0.35 : 0.25}
          blur={14}
          speed="slow"
          containerClassName="relative w-full h-auto min-h-[75vh] flex flex-col items-center justify-center bg-transparent py-16 px-6"
          className="max-w-4xl mx-auto z-10 flex flex-col items-center space-y-8"
        >
          {/* Top Pill badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] bg-[#fdfdfc]/80 dark:bg-[#121211]/80 text-xs font-medium text-[#5c5852] dark:text-[#a39e95] backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#385942] dark:text-[#7ea68a]" />
            <span>AI Voice Localization</span>
            <span className="w-[1px] h-3 bg-[#ebdcd0] dark:bg-[#201f1c]"></span>
            <span className="flex items-center gap-0.5 text-[#1c1c1c] dark:text-[#e5e1db] hover:text-[#385942] dark:hover:text-[#608c6c] transition-colors cursor-pointer">
              Explore templates <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* Wispr Flow Editorial Styled Headline */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-[#1c1c1c] dark:text-white leading-[1.1] font-serif max-w-3xl mx-auto"
          >
            {titleText.split(" ").map((word, wordIdx) => {
              const isItalic = word.toLowerCase().includes("synchronized") || word.toLowerCase().includes("instantly.");
              return (
                <span key={wordIdx} className="inline-block mr-3.5 sm:mr-4.5 last:mr-0">
                  {word.split("").map((letter, letterIdx) => (
                    <motion.span
                      key={letterIdx}
                      variants={letterVariants}
                      className={isItalic ? "italic font-normal text-[#385942] dark:text-[#7ea68a]" : ""}
                      style={{ display: "inline-block" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-[#5c5852] dark:text-[#a39e95] max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Flow brings voices to life. Transform standard recordings into perfectly synchronized visuals. Create localized videos with editorial precision and zero effort.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              to={isAuthenticated ? "/clips" : "/register"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white rounded-full font-semibold text-sm tracking-wide transition-all shadow-md group cursor-pointer"
            >
              Start Creating Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button
              onClick={() => scrollToSection('demo')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#fdfdfc]/80 hover:bg-[#f3eee5] border border-[#ebdcd0] text-[#1c1c1c] dark:bg-[#121211]/80 dark:hover:bg-[#1a1917] dark:text-[#e5e1db] dark:border-[#201f1c] rounded-full font-semibold text-sm tracking-wide transition-colors cursor-pointer"
            >
              Watch Video Demo
            </button>
          </motion.div>
        </WavyBackground>

        {/* INTERACTIVE VIDEO DECK MOCKUP */}
        <div className="relative pb-20 w-full max-w-4xl px-6 mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full rounded-2xl border border-[#ebdcd0] dark:border-[#201f1c] bg-[#fdfdfc] dark:bg-[#121211] p-3 shadow-xl"
          >
            <div className="rounded-xl overflow-hidden border border-[#ebdcd0]/50 dark:border-[#201f1c]/50 bg-[#faf8f5] dark:bg-[#0d0d0c] aspect-video flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#385942]/5 via-transparent to-transparent opacity-60 pointer-events-none"></div>
              
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 animate-ping"></span>
                <span className="font-mono text-[10px] tracking-widest text-[#5c5852] dark:text-[#a39e95] uppercase">Live Sync Deck</span>
              </div>

              {/* Circular waveform visualizer */}
              <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-xs px-6">
                {[35, 50, 25, 75, 45, 90, 60, 30, 80, 55, 70, 40, 95, 50, 65, 30, 85, 45, 60, 35].map((h, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 bg-[#385942] dark:bg-[#7ea68a] rounded-full"
                    animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                    transition={{ duration: 1.5 + (i % 3) * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ minHeight: "4px" }}
                  />
                ))}
              </div>

              {/* Big Elegant Play Button */}
              <button 
                onClick={() => scrollToSection('demo')}
                className="absolute w-16 h-16 rounded-full bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white flex items-center justify-center shadow-lg group transition-transform duration-300 hover:scale-105 cursor-pointer z-10"
                aria-label="Play showcase"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DETAILED FEATURES SECTION - Contrasting Cream-Beige Background */}
      <section id="features" className="py-20 md:py-24 px-6 border-t border-[#ebdcd0]/40 dark:border-[#201f1c]/80 bg-[#f4efe8] dark:bg-[#121210] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold font-mono tracking-widest text-[#385942] dark:text-[#7ea68a] uppercase">
              Quiet Luxury Core
            </h2>
            <p className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1c1c1c] dark:text-white font-serif">
              Carefully crafted features to elevate your localization pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Wand2,
                title: "One-Click Alignment",
                desc: "Drop your visual footage alongside any audio sample. Our alignment algorithm maps lip profiles to speech cycles instantly.",
                badge: "AI Sync"
              },
              {
                icon: Mic,
                title: "Warm Acoustic Speaker Models",
                desc: "Synthesize sentences in 100+ natural voice models that retain vocal nuances, breath pauses, and organic tones.",
                badge: "Accoustics"
              },
              {
                icon: Video,
                title: "HD Editorial Preserves",
                desc: "Render final outcomes in crisp 1080p, preserving skin textures, camera noise levels, and ambient illumination.",
                badge: "1080p HD"
              },
              {
                icon: Zap,
                title: "Calm Rendering Pipeline",
                desc: "Background tasks process smoothly on our priority server blocks. Build localized content without heating up your local setup.",
                badge: "Serverless"
              },
              {
                icon: Shield,
                title: "Private Asset Locker",
                desc: "Your recordings are locked to your dashboard. Assets are never analyzed or shared for commercial foundational model runs.",
                badge: "ISO Secure"
              },
              {
                icon: Cpu,
                title: "Micro Vocal Replication",
                desc: "Provide a quick 10-second reference speech snippet to clone voice patterns for cross-lingual localization.",
                badge: "Beta V2"
              }
            ].map((feat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                className="group relative flex flex-col justify-between p-7 rounded-xl border border-[#ebdcd0]/70 dark:border-[#201f1c] bg-[#fdfdfc]/80 dark:bg-[#1c1c1a]/50 transition-all duration-300 cursor-default"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="p-2.5 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] bg-transparent text-[#385942] dark:text-[#7ea68a] group-hover:bg-[#385942] group-hover:text-white dark:group-hover:bg-[#4b7358] dark:group-hover:text-black transition-colors duration-300">
                      <feat.icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] text-[#5c5852] dark:text-[#a39e95] bg-[#fdfdfc] dark:bg-[#121211]">
                      {feat.badge}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-base text-[#1c1c1c] dark:text-white font-sans">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-[#5c5852] dark:text-[#a39e95] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - Warm Sand Background */}
      <section id="how-it-works" className="py-20 md:py-24 px-6 border-t border-[#ebdcd0]/40 dark:border-[#201f1c]/80 bg-[#faf8f5] dark:bg-[#0d0d0c] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold font-mono tracking-widest text-[#385942] dark:text-[#7ea68a] uppercase">
              The Process
            </h2>
            <p className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1c1c1c] dark:text-white font-serif">
              Dictate your visual direction in three phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "I",
                title: "Vocal Reference & Scripts",
                desc: "Input your text scripts, choose preset actors, or clone individual vocals with brief audio submissions."
              },
              {
                step: "II",
                title: "Footage Drop",
                desc: "Drag and drop any speaking video file. Our layout handles vertical shorts, landscape reels, and cinema cuts."
              },
              {
                step: "III",
                title: "Natural Translation",
                desc: "Hit render. Our speech-sync pipeline computes vocal shifts and matches your screen movements seamlessly."
              }
            ].map((step, idx) => (
              <div key={idx} className="space-y-4 p-6.5 rounded-xl border border-[#ebdcd0]/40 dark:border-[#201f1c] bg-[#fdfdfc]/50 dark:bg-[#121211]/30 hover:bg-[#fdfdfc] dark:hover:bg-[#121211] transition-all duration-300">
                <div className="text-2xl font-serif font-bold text-[#385942]/70 dark:text-[#7ea68a]/70">
                  {step.step}
                </div>
                <h3 className="font-semibold text-base text-[#1c1c1c] dark:text-white font-sans">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5c5852] dark:text-[#a39e95] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE / DEMO SECTION - Contrasting Soft Sage Green Background */}
      <section id="demo" className="border-t border-[#ebdcd0]/40 dark:border-[#201f1c]/80 transition-colors duration-300">
        <DemoSection />
      </section>

      {/* PRICING SECTION - Contrasting Warm Sand Background */}
      <section id="pricing" className="py-20 md:py-24 px-6 border-t border-[#ebdcd0]/40 dark:border-[#201f1c]/80 relative transition-colors duration-300 bg-[#f5f2eb] dark:bg-[#11110f]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold font-mono tracking-widest text-[#385942] dark:text-[#7ea68a] uppercase">
              Calm Tiers
            </h2>
            <p className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1c1c1c] dark:text-white font-serif">
              Simple plans for editorial workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="p-7.5 rounded-xl border border-[#ebdcd0] dark:border-[#201f1c] bg-[#fdfdfc] dark:bg-[#1c1c1a]/50 flex flex-col justify-between space-y-8">
              <div className="space-y-4 text-left">
                <h3 className="font-semibold text-lg text-[#1c1c1c] dark:text-white font-sans">Hobby</h3>
                <p className="text-xs text-[#5c5852] dark:text-[#a39e95]">For starting creator sets</p>
                <div className="text-3xl font-normal font-serif text-[#1c1c1c] dark:text-white">
                  $0 <span className="text-sm font-normal text-[#5c5852] dark:text-[#a39e95]">/mo</span>
                </div>
                <ul className="space-y-3 text-sm pt-4">
                  {["3 Synchronizations / mo", "10 Default Acoustics", "720p Rendering outputs", "Shared GPU clusters"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[#5c5852] dark:text-[#a39e95]">
                      <Check className="w-3.5 h-3.5 text-[#385942] dark:text-[#7ea68a]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to={isAuthenticated ? "/clips" : "/register"}
                className="w-full text-center py-2.5 border border-[#ebdcd0] dark:border-[#201f1c] hover:border-[#385942] dark:hover:border-[#7ea68a] hover:bg-[#faf8f5] dark:hover:bg-[#1a1917] rounded-full text-xs font-semibold tracking-wide text-[#1c1c1c] dark:text-[#e5e1db] transition-colors"
              >
                Start Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-7.5 rounded-xl border-2 border-[#385942] dark:border-[#7ea68a] bg-[#fdfdfc] dark:bg-[#1c1c1a]/50 flex flex-col justify-between space-y-8 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#385942] dark:bg-[#7ea68a] text-white dark:text-black text-[9px] font-mono font-bold tracking-wider uppercase">
                Editor Choice
              </div>
              <div className="space-y-4 text-left">
                <h3 className="font-semibold text-lg text-[#1c1c1c] dark:text-white font-sans">Pro</h3>
                <p className="text-xs text-[#5c5852] dark:text-[#a39e95]">For regular localized builders</p>
                <div className="text-3xl font-normal font-serif text-[#1c1c1c] dark:text-white">
                  $29 <span className="text-sm font-normal text-[#5c5852] dark:text-[#a39e95]">/mo</span>
                </div>
                <ul className="space-y-3 text-sm pt-4">
                  {["Unlimited MP4 Localizations", "100+ Custom Acoustic Speakers", "Full 1080p HD Outputs", "3 Private cloned vocals", "Priority rendering runs"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[#5c5852] dark:text-[#a39e95]">
                      <Check className="w-3.5 h-3.5 text-[#385942] dark:text-[#7ea68a]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to={isAuthenticated ? "/clips" : "/register"}
                className="w-full text-center py-2.5 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                Claim Pro Trial 🎁
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="p-7.5 rounded-xl border border-[#ebdcd0] dark:border-[#201f1c] bg-[#fdfdfc] dark:bg-[#1c1c1a]/50 flex flex-col justify-between space-y-8">
              <div className="space-y-4 text-left">
                <h3 className="font-semibold text-lg text-[#1c1c1c] dark:text-white font-sans">Enterprise</h3>
                <p className="text-xs text-[#5c5852] dark:text-[#a39e95]">For studio hubs & teams</p>
                <div className="text-3xl font-normal font-serif text-[#1c1c1c] dark:text-white">
                  Custom
                </div>
                <ul className="space-y-3 text-sm pt-4">
                  {["Dedicated computing blades", "Unlimited replicated cloned sets", "Dedicated API credentials", "24/7 Priority support lines"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[#5c5852] dark:text-[#a39e95]">
                      <Check className="w-3.5 h-3.5 text-[#385942] dark:text-[#7ea68a]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="mailto:contact@sarthakbuilds.in"
                className="w-full text-center py-2.5 border border-[#ebdcd0] dark:border-[#201f1c] hover:border-[#385942] dark:hover:border-[#7ea68a] hover:bg-[#faf8f5] dark:hover:bg-[#1a1917] rounded-full text-xs font-semibold tracking-wide text-[#1c1c1c] dark:text-[#e5e1db] transition-colors"
              >
                Inquire Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Contrasting Dark Charcoal Background */}
      <footer className="border-t border-[#ebdcd0]/30 dark:border-[#201f1c]/80 pt-16 pb-12 px-6 bg-[#1a1917] dark:bg-[#080808] text-[#e5e1db] dark:text-[#a39e95] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3 group w-fit">
                <div className="relative w-7.5 h-7.5 rounded-full overflow-hidden border border-[#ebdcd0]/30 dark:border-[#201f1c] shadow-sm">
                  <img src={logoImage} className="w-full h-full object-cover" alt="LipSync Logo" />
                </div>
                <span className="font-semibold text-base tracking-tight text-white dark:text-[#e5e1db] font-sans">
                  LIPSYNC AI
                </span>
              </Link>
              <p className="text-sm text-[#a39e95] dark:text-[#77746d] max-w-xs leading-relaxed font-sans">
                An advanced speech-sync video suite built for editorial creators, offering hyper-realistic localization out of simple scripts.
              </p>
              <div className="pt-2">
                <a 
                  href="https://x.com/Sarthakbuilds" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ebdcd0]/20 dark:border-[#201f1c] hover:bg-white/5 text-xs font-mono text-[#a39e95] hover:text-white transition-all"
                >
                  <span>Built by @sarthakbuilds</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-mono font-semibold text-[#a39e95] uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-sm text-[#77746d] hover:text-zinc-205 font-sans">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">Features</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">How It Works</button></li>
                <li><button onClick={() => scrollToSection('demo')} className="hover:text-white transition-colors cursor-pointer">Showcase</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</button></li>
              </ul>
            </div>

            {/* Developer Links */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-mono font-semibold text-[#a39e95] uppercase tracking-widest">Developers</h4>
              <ul className="space-y-2 text-sm text-[#77746d] font-sans">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-xs font-mono font-semibold text-[#a39e95] uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-sm text-[#77746d] font-sans">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security Details</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Portal</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom copyright */}
          <div className="border-t border-[#ebdcd0]/10 dark:border-[#201f1c] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a39e95] dark:text-[#77746d] gap-4 font-sans">
            <div>
              &copy; {new Date().getFullYear()} LipSync AI Inc. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Security</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;