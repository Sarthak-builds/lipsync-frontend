import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import authBg from "../../assets/auth-bg.jpg";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") { setEmail(value) }
    if (name === "password") { setPassword(value) }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await login({ email, password });
      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-black font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Grid Pattern Background for Form Area */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 left-6 z-50 lg:left-auto lg:right-6">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer backdrop-blur-sm"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-zinc-400 hover:text-yellow-400 transition-colors" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-500 hover:text-blue-600 transition-colors" />
          )}
        </button>
      </div>

      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Logo / Brand Header */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              {/* Vercel-style geometric triangle logo */}
              <div className="relative w-8 h-8 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current">
                  <polygon points="50,15 90,85 10,85" />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
                LIPSYNC AI
              </span>
            </Link>
            
            <div className="space-y-1.5">
              <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Welcome back
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Enter your credentials to access your dashboard.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 dark:text-white transition-colors"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Password
                  </label>
                  <a href="#" className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 dark:text-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 h-10 rounded-md text-sm font-medium transition-colors border border-black dark:border-white shadow-sm cursor-pointer"
            >
              Sign In
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Bottom links */}
          <div className="space-y-4">
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-zinc-900 dark:text-white hover:underline underline-offset-4">
                Sign up
              </Link>
            </p>
            
            <div className="text-center border-t border-zinc-100 dark:border-zinc-900 pt-4">
              <p className="text-xs text-zinc-400 leading-normal">
                By signing in, you agree to our{" "}
                <a href="#" className="underline hover:text-zinc-950 dark:hover:text-zinc-200 transition-colors">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="underline hover:text-zinc-950 dark:hover:text-zinc-200 transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Decorative Image Panel */}
      <div className="hidden lg:flex w-1/2 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden items-center justify-center border-l border-zinc-200 dark:border-zinc-800">
        {/* Subtle grid pattern over the image */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        {/* The JPG Image in Assets */}
        <img 
          src={authBg} 
          alt="Auth background" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-85 dark:opacity-40 transition-all duration-1000 transform hover:scale-[1.02] hover:grayscale-0"
        />
        
        {/* Sleek Vercel-style Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
        
        <div className="relative z-20 p-16 text-white max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>AI Video Suite</span>
          </div>
          
          <blockquote className="space-y-4">
            <p className="text-2xl font-normal leading-snug text-zinc-100 font-sans tracking-tight">
              "Lipsync AI has revolutionized how we create localized content. It's incredibly fast, accurate, and saves us hundreds of editing hours."
            </p>
            <footer className="text-sm font-mono text-zinc-400 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-zinc-500"></span>
              <span>Sarthak, Fullstack Creator</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;