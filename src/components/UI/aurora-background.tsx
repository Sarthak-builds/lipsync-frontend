"use client";
import { cn } from "../../components/lib/utils";
import React from "react";
import type { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex h-screen flex-col items-center justify-center bg-black text-white pointer-events-auto z-0",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden z-10"
          style={
            {
              "--aurora": "repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)",
              "--gradient": "repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%)",
              "--blue-500": "#3b82f6",
              "--indigo-300": "#a5b4fc",
              "--blue-300": "#93c5fd",
              "--violet-200": "#ddd6fe",
              "--blue-400": "#60a5fa",
              "--black": "#000",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              "absolute -inset-[10px] [background-image:var(--gradient),var(--aurora)] [background-size:300%,200%] [background-position:50% 50%,50% 50%] opacity-50 blur-[10px] filter will-change-transform",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
            )}
          ></div>
        </div>
        <div className="relative z-20 flex justify-center items-center w-full h-full font-grotesk">
          {children}
        </div>
      </div>
    </main>
  );
};