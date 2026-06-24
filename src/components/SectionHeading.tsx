import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function SectionHeading({
  children,
  align = "left",
  tone = "default",
  size = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2
        className={cn(
          "font-bold leading-tight",
          size === "sm" ? "text-2xl" : size === "lg" ? "text-4xl md:text-5xl" : "text-3xl",
          tone === "light" ? "text-white" : "text-navy",
        )}
      >
        {children}
      </h2>
      <div
        className={cn(
          "mt-7 h-1 w-14",
          tone === "light" ? "bg-white" : "bg-primary",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}
