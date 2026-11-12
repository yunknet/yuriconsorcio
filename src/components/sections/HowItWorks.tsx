import strategyImage from "@/assets/yuri-strategy.webp";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { sectionIds, siteConfig } from "@/config/site";
import { contemplationMethods } from "@/content/home";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  return (
    <Section id={sectionIds.howItWorks} tone="dark" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        tone="dark"
        eyebrow="Contemplação"
        title="4 formas de pegar seu crédito rápido"
        description={
          <>
            No nosso grupo, você não depende apenas da sorte. Trabalhamos com <strong className="text-white">estratégias reais</strong> para acelerar a
            sua conquista.
          </>
        }
      />

      <div className="mt-10 grid items-center gap-8 sm:mt-12 lg:grid-cols-12 lg:gap-10">
        <div className="mx-auto w-full max-w-[15rem] sm:max-w-xs lg:col-span-4 lg:max-w-none">
          <img
            src={strategyImage}
            alt={`${siteConfig.name} — estratégias de investimento`}
            width={640}
            height={756}
            loading="lazy"
            decoding="async"
            className="w-full rounded-3xl shadow-float ring-1 ring-white/10"
          />
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {contemplationMethods.map((method, index) => (
            <li
              key={method.title}
              className={cn(
                "flex flex-col rounded-2xl p-5 transition-colors sm:p-7",
                method.featured ? "bg-gold-gradient text-accent-foreground shadow-lg" : "bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/10",
              )}
            >
              <h3 className={cn("mb-2 flex items-baseline gap-2.5 text-xl font-bold", method.featured ? "text-accent-foreground" : "text-accent")}>
                <span className={cn("font-display text-sm", method.featured ? "text-accent-foreground/60" : "text-accent/60")}>0{index + 1}</span>
                {method.title}
              </h3>
              <p className={cn("leading-relaxed", method.featured ? "font-medium text-accent-foreground/85" : "text-white/75")}>{method.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
