import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/** Título de seção padronizado: selo (eyebrow), título e descrição. */
export function SectionHeading({ id, eyebrow, title, description, align = "center", tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn("text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-primary")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/75" : "text-muted-foreground")}>{description}</p>
      )}
    </div>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]",
        tone === "dark" ? "bg-accent/15 text-accent" : "bg-accent/10 text-accent-strong",
      )}
    >
      {children}
    </span>
  );
}
