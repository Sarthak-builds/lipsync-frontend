import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import authBg from "../../assets/auth-bg.jpg";
import logoImage from "../../assets/logo.jpg";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") { setEmail(value) }
    if (name === "password") { setPassword(value) }
    if (name === "firstName") { setFirstName(value) }
    if (name === "lastName") { setLastName(value) }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password) {
      toast.error('All fields are required');
      return;
    }
    try {
      await register({ first_name, last_name, email, password });
      toast.success('Signup Successful! Please log in.');
      navigate("/login");
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      console.error("Signup Failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#faf8f5] dark:bg-[#0d0d0c] text-[#1c1c1c] dark:text-[#e5e1db] font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Grid Pattern Background for Form Area */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 left-6 z-50 lg:left-auto lg:right-6">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] bg-[#faf8f5]/50 dark:bg-[#0d0d0c]/50 hover:bg-[#f3eee5] dark:hover:bg-[#1a1917] transition-all cursor-pointer backdrop-blur-sm"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-zinc-400 hover:text-yellow-400 transition-colors" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-550 hover:text-blue-600 transition-colors" />
          )}
        </button>
      </div>

      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Logo / Brand Header */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Logo from assets */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#ebdcd0] dark:border-[#201f1c] shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img src={logoImage} className="w-full h-full object-cover" alt="LipSync Logo" />
              </div>
              <span className="font-semibold text-base tracking-tight font-sans text-[#1c1c1c] dark:text-[#e5e1db]">
                LIPSYNC AI
              </span>
            </Link>
            
            <div className="space-y-1.5">
              <h1 className="text-3xl font-normal tracking-tight text-[#1c1c1c] dark:text-white font-serif">
                Create an account
              </h1>
              <p className="text-sm text-[#5c5852] dark:text-[#a39e95]">
                Join creators making realistic synchronized videos in seconds.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold tracking-wide text-[#5c5852] dark:text-[#a39e95]">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={first_name}
                  onChange={handleChange}
                  placeholder="Spongebob"
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#ebdcd0] dark:border-[#201f1c] rounded-full text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] dark:text-white transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold tracking-wide text-[#5c5852] dark:text-[#a39e95]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={last_name}
                  onChange={handleChange}
                  placeholder="Squarepants"
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#ebdcd0] dark:border-[#201f1c] rounded-full text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] dark:text-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold tracking-wide text-[#5c5852] dark:text-[#a39e95]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#ebdcd0] dark:border-[#201f1c] rounded-full text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] dark:text-white transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold tracking-wide text-[#5c5852] dark:text-[#a39e95]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full px-3.5 py-2.5 bg-transparent border border-[#ebdcd0] dark:border-[#201f1c] rounded-full text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:border-[#385942] dark:focus:border-[#7ea68a] dark:text-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white dark:text-white h-11 rounded-full text-xs font-semibold tracking-wide transition-colors border border-transparent shadow-sm cursor-pointer"
            >
              Sign Up
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Bottom links */}
          <div className="space-y-4">
            <p className="text-center text-sm text-[#5c5852] dark:text-[#a39e95]">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[#385942] dark:text-[#7ea68a] hover:underline underline-offset-4">
                Log in
              </Link>
            </p>
            
            <div className="text-center border-t border-[#ebdcd0]/60 dark:border-[#201f1c] pt-4">
              <p className="text-xs text-zinc-450 dark:text-zinc-500 leading-normal">
                By registering, you agree to our{" "}
                <a href="#" className="underline hover:text-[#1c1c1c] dark:hover:text-zinc-205 transition-colors">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="underline hover:text-[#1c1c1c] dark:hover:text-zinc-205 transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Decorative Image Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#faf8f5] dark:bg-[#0d0d0c] relative overflow-hidden items-center justify-center border-l border-[#ebdcd0] dark:border-[#201f1c]">
        {/* Subtle grid pattern over the image */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        {/* The JPG Image in Assets */}
        <img 
          src={authBg} 
          alt="Auth background" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-85 dark:opacity-40 transition-all duration-1000 transform hover:scale-[1.02] hover:grayscale-0"
        />
        
        {/* Sleek Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
        
        <div className="relative z-20 p-16 text-white max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#7ea68a]" />
            <span>AI Editorial Suite</span>
          </div>
          
          <blockquote className="space-y-4">
            <p className="text-3xl font-normal leading-snug text-zinc-100 font-serif tracking-tight">
              "The rendering quality and natural acoustics of LipSync AI is unmatched. Getting lip movements to sync perfectly with synthetic voiceovers is *effortless*."
            </p>
            <footer className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-zinc-550"></span>
              <span>A Very Happy Creator</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;