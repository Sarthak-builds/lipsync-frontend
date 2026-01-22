import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") { setEmail(value) };
    if (name === "password") { setPassword(value) };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      console.log("Login Failed", error);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-black font-sans transition-colors duration-300 relative">
      {/* Theme Toggle */}
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-zinc-400 hover:text-yellow-400 transition-colors" />
          ) : (
            <Moon className="w-6 h-6 text-zinc-500 hover:text-blue-600 transition-colors" />
          )}
        </button>
      </div>

      {/* Left: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-bold text-xl tracking-wide text-zinc-900 dark:text-white mb-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              LIPSYNC AI
            </div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Welcome back</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Enter your details to access your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 dark:text-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 dark:text-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 h-10 rounded-md text-sm font-medium transition-colors"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-zinc-900 dark:text-white hover:underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="hidden lg:flex w-1/2 bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden items-center justify-center border-l border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-90 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-105"></div>
        <div className="relative z-10 p-12 text-white max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed drop-shadow-md">
              "Lipsync AI has revolutionized how we create content. It's incredibly fast, accurate, and simply beautiful to use."
            </p>
            <footer className="text-sm opacity-80 drop-shadow-sm">— Sarthak, Content Creator</footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
export default LoginForm;