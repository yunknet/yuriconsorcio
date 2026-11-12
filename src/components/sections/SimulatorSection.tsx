import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/SectionHeading";
import { sectionIds } from "@/config/site";
import { simulatorPerks } from "@/content/home";
import { Simulator } from "@/features/simulator";

/**
 * O id da âncora fica no próprio card do simulador: assim, no celular,
 * "Fazer simulação" leva direto ao formulário (e não ao texto de introdução).
 * No mobile a ordem é: título → simulador → benefícios.
 */
export function SimulatorSection() {
  return (
    <Section tone="dark" labelledBy="simulator-title" className="-mt-px">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-6">
        <div className="lg:col-span-5 lg:row-start-1 lg:self-end">
          <Eyebrow tone="dark">Simulador de consórcio</Eyebrow>
          <h2 id="simulator-title" className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Simule e realize seu sonho hoje
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            Sem juros abusivos e sem entrada. Descubra o melhor plano para o seu momento de vida com uma simulação rápida e prática.
          </p>
        </div>

        <div id={sectionIds.simulator} className="lg:col-span-7 lg:row-span-2 lg:row-start-1">
          <Simulator />
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:row-start-2 lg:grid-cols-1 lg:self-start">
          {simulatorPerks.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl bg-white/5 p-3.5 text-[15px] font-medium text-white/85 ring-1 ring-white/10 lg:bg-transparent lg:p-0 lg:ring-0">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
