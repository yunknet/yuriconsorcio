import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { sectionIds } from "@/config/site";
import { goals } from "@/content/home";
import { consortiumTypes, useSimulatorContext } from "@/features/simulator";
import { scrollToId } from "@/lib/scroll";

/** Cada card leva ao simulador já com o tipo de consórcio selecionado. */
export function Goals() {
  const { selectType, goTo } = useSimulatorContext();

  const simulate = (typeId: string) => {
    selectType(typeId);
    goTo(1);
    scrollToId(sectionIds.simulator);
  };

  return (
    <Section id={sectionIds.goals} tone="muted" labelledBy="goals-title">
      <SectionHeading id="goals-title" eyebrow="Possibilidades" title="O que você vai conquistar?" description="Escolha seu objetivo e simule agora mesmo." />

      <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {goals.map((goal) => {
          const Icon = consortiumTypes.find((type) => type.id === goal.typeId)?.icon;
          return (
            <li key={goal.typeId}>
              <button
                type="button"
                onClick={() => simulate(goal.typeId)}
                className="group flex h-full w-full items-start gap-4 rounded-2xl border border-border/70 bg-white p-6 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-col sm:p-7"
              >
                {Icon && (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-accent">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                )}
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-primary sm:text-xl">{goal.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{goal.description}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
                    Simular <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
