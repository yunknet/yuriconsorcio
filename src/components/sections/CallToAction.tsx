import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { sectionIds } from "@/config/site";
import { ctaHighlights } from "@/content/home";

export function CallToAction() {
  return (
    <Section tone="dark" labelledBy="cta-title" containerClassName="max-w-4xl text-center">
      <h2 id="cta-title" className="text-3xl font-bold leading-tight sm:text-5xl">
        Chega de adiar o seu sonho.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
        Faça sua simulação e um de nossos especialistas entrará em contato para montar o perfil e o plano perfeito para você.
      </p>

      <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-white/80 sm:flex-row sm:gap-8">
        {ctaHighlights.map((item) => (
          <li key={item} className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden /> {item}
          </li>
        ))}
      </ul>

      <Button asChild variant="gold" size="xl" className="group mt-10 w-full sm:w-auto">
        <a href={`#${sectionIds.simulator}`}>
          Fazer simulação gratuita <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </Button>
    </Section>
  );
}
