import { NavLink } from "react-router-dom";
import { Home, Video, Mic, Clapperboard, Sparkles, Menu, ChevronLeft, Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { theme, setTheme } = useTheme();

    const navItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "Videos", path: "/videos", icon: Video },
        { name: "Voices", path: "/voices", icon: Mic },
        { name: "Generate Clips", path: "/clips", icon: Clapperboard },
    ];

    return (
        <aside
            className={cn(
                "h-screen border-r border-white/5 bg-[#09090b] dark:bg-[#09090b] bg-white text-zinc-900 dark:text-white flex flex-col sticky top-0 font-sans z-50 transition-all duration-300",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-white/5 mb-6">
                {!isCollapsed && (
                    <div className="flex items-center gap-2 font-bold text-xl tracking-wide bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        LIPSYNC AI
                    </div>
                )}

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        "p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 transition-colors",
                        isCollapsed ? "mx-auto" : ""
                    )}
                >
                    {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100",
                                isCollapsed && "justify-center px-2"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("w-5 h-5 transition-colors shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300")} />
                                {!isCollapsed && <span>{item.name}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-zinc-200 dark:border-white/5 space-y-2">
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className={cn(
                        "flex items-center gap-3 p-2 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors w-full group",
                        isCollapsed && "justify-center"
                    )}
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                    ) : (
                        <Moon className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                    )}
                    {!isCollapsed && <span className="font-medium">Toggle Theme</span>}
                </button>

                <a
                    href="https://x.com/Sarthakbuilds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "flex items-center gap-3 p-2 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group",
                        isCollapsed && "justify-center"
                    )}
                >
                    <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 transition-colors">
                        <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">S</span>
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors font-medium">@sarthakbuilds</span>
                        </div>
                    )}
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;