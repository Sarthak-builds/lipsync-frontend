import { NavLink } from "react-router-dom";
import { Home, Video, Mic, Clapperboard, Menu, ChevronLeft, Sun, Moon, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";
import logoImage from "../../assets/logo.jpg";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Videos", path: "/videos", icon: Video },
    { name: "Voices", path: "/voices", icon: Mic },
    { name: "Generate Clips", path: "/clips", icon: Clapperboard },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 md:hidden",
          className?.includes("translate-x-0") ? "block" : "hidden"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-screen border-r border-[#ebdcd0]/60 dark:border-[#201f1c] bg-[#fdfdfc] dark:bg-[#121211] text-[#1c1c1c] dark:text-[#e5e1db] flex flex-col transition-all duration-300 md:translate-x-0 md:static md:inset-auto",
          isCollapsed ? "md:w-20" : "md:w-64",
          "w-64",
          className
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#ebdcd0]/40 dark:border-[#201f1c] mb-6">
          {(!isCollapsed || window.innerWidth < 768) && (
            <div className="flex items-center gap-2.5 font-bold text-base tracking-tight font-sans text-[#1c1c1c] dark:text-white">
              <img src={logoImage} className="w-6.5 h-6.5 rounded-full object-cover border border-[#ebdcd0] dark:border-[#201f1c]" alt="Logo" />
              LIPSYNC AI
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-full hover:bg-[#faf8f5] dark:hover:bg-[#0d0d0c] text-[#5c5852] dark:text-[#a39e95] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "hidden md:block p-2 rounded-full hover:bg-[#faf8f5] dark:hover:bg-[#0d0d0c] text-[#5c5852] dark:text-[#a39e95] transition-colors cursor-pointer",
                isCollapsed ? "mx-auto" : ""
              )}
            >
              {isCollapsed ? <Menu className="w-4.5 h-4.5" /> : <ChevronLeft className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1.5 font-sans">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && onClose?.()}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 group border border-transparent",
                  isActive
                    ? "bg-[#385942]/10 text-[#385942] dark:bg-[#4b7358]/10 dark:text-[#7ea68a] border-[#385942]/20 dark:border-[#4b7358]/20"
                    : "text-[#5c5852] dark:text-[#a39e95] hover:bg-[#faf8f5] dark:hover:bg-[#0d0d0c] hover:text-[#1c1c1c] dark:hover:text-white",
                  isCollapsed && "md:justify-center md:px-2"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn(
                    "w-4.5 h-4.5 transition-colors shrink-0", 
                    isActive 
                      ? "text-[#385942] dark:text-[#7ea68a]" 
                      : "text-[#5c5852] dark:text-[#a39e95] group-hover:text-[#1c1c1c] dark:group-hover:text-white"
                  )} />
                  <span className={cn("md:block", isCollapsed ? "md:hidden" : "block")}>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer options */}
        <div className="p-4 border-t border-[#ebdcd0]/40 dark:border-[#201f1c] space-y-2 font-sans">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "flex items-center gap-3 p-2 rounded-full text-[11px] font-semibold text-[#5c5852] dark:text-[#a39e95] hover:bg-[#faf8f5] dark:hover:bg-[#0d0d0c] hover:text-[#1c1c1c] dark:hover:text-white transition-colors w-full group cursor-pointer",
              isCollapsed && "md:justify-center"
            )}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
            ) : (
              <Moon className="w-4 h-4 group-hover:text-[#385942] transition-colors" />
            )}
            <span className={cn("md:block", isCollapsed ? "md:hidden" : "block")}>Toggle Theme</span>
          </button>

          <a
            href="https://x.com/Sarthakbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 p-2 rounded-full text-[11px] font-semibold text-[#5c5852] dark:text-[#a39e95] hover:bg-[#faf8f5] dark:hover:bg-[#0d0d0c] hover:text-[#1c1c1c] dark:hover:text-white transition-colors group",
              isCollapsed && "md:justify-center"
            )}
          >
            <div className="w-5 h-5 rounded-full bg-[#f3eee5] dark:bg-[#1a1917] flex items-center justify-center shrink-0 border border-[#ebdcd0]/60 dark:border-[#201f1c]">
              <span className="text-[9px] font-bold text-[#385942] dark:text-[#7ea68a]">S</span>
            </div>
            <div className={cn("flex flex-col md:block", isCollapsed ? "md:hidden" : "block")}>
              <span className="group-hover:text-[#385942] dark:group-hover:text-[#7ea68a] transition-colors">@sarthakbuilds</span>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;