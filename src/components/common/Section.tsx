import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "muted" | "dark";

const toneClasses: Record<Tone, string> = {
  light: "bg-white text-foreground",
  muted: "bg-secondary text-foreground",
  dark: "bg-navy-gradient text-white",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
}

/** Bloco padrão de seção: espaçamento vertical e container consistentes em toda a página. */
export function Section({ id, tone = "light", className, containerClassName, labelledBy, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}
