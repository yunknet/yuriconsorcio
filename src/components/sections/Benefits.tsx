import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { sectionIds } from "@/config/site";
import { benefits } from "@/content/home";

export function Benefits() {
  return (
    <Section id={sectionIds.benefits} tone="muted" labelledBy="benefits-title">
      <SectionHeading
        id="benefits-title"
        eyebrow="Por que consórcio?"
        title="Por que parar de perder dinheiro?"
        description={
          <>
            Você sabia que em um financiamento comum você chega a pagar o valor de <strong className="text-destructive">dois bens</strong> por causa
            dos juros abusivos?
          </>
        }
      />

      <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-6">
        {benefits.map(({ icon: Icon, title, description }) => (
          <li key={title} className="rounded-2xl border border-border/70 bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:p-8">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mb-2 text-xl font-bold text-primary">{title}</h3>
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
