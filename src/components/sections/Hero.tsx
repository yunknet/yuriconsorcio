import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";
import heroImage from "@/assets/yuri-hero.webp";
import { Button } from "@/components/ui/button";
import { sectionIds, siteConfig } from "@/config/site";
import { heroHighlights } from "@/content/home";

/**
 * Hero com a foto do Yuri ao fundo, em transparência (mix-blend-luminosity)
 * e suavizada por degradês na cor da marca.
 */
export function Hero() {
  return (
    <section
      id={sectionIds.home}
      aria-labelledby="hero-title"
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-primary pb-14 pt-[calc(var(--header-height)+11rem)] text-white sm:pt-[calc(var(--header-height)+3rem)] sm:min-h-[100svh] lg:items-center lg:pb-20"
    >
      {/* Foto de fundo + degradês */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
          <img
            src={heroImage}
            alt=""
            width={473}
            height={919}
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_top] opacity-90 mix-blend-luminosity"
          />
          {/* Suaviza o topo da foto (atrás do header) */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary via-primary/70 to-transparent md:h-64" />
          {/* Desktop: funde a foto com o fundo à esquerda, onde fica o texto */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-primary via-primary/40 to-transparent lg:block" />
        </div>
        {/* Celular: escurece de baixo para cima para o texto ficar legível */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/10 lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary to-transparent" />
      </div>

      <div className="container relative">
        <div className="max-w-2xl duration-700 animate-in fade-in slide-in-from-bottom-4">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent ring-1 ring-white/15 backdrop-blur-sm">
            <Trophy className="h-4 w-4" aria-hidden /> {siteConfig.role}
          </p>

          <h1 id="hero-title" className="text-[2.6rem] font-extrabold leading-[1.05] drop-shadow-lg sm:text-6xl lg:text-7xl">
            Invista no seu futuro <span className="text-gold-gradient">comigo</span>.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 drop-shadow sm:text-xl">
            Realize seus sonhos sem juros e sem entrada. Parcelas que cabem no seu bolso, com toda a segurança.
          </p>

          <Button asChild variant="gold" size="xl" className="group mt-8 w-full sm:w-auto">
            <a href={`#${sectionIds.simulator}`}>
              Fazer simulação gratuita
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </Button>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/85">
            {heroHighlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
