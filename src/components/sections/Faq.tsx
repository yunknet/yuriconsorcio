import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { sectionIds } from "@/config/site";
import { faq } from "@/content/home";

export function Faq() {
  return (
    <Section id={sectionIds.faq} tone="muted" labelledBy="faq-title" containerClassName="max-w-3xl">
      <SectionHeading id="faq-title" eyebrow="Dúvidas frequentes" title="Tire suas dúvidas sobre o consórcio" />

      <Accordion type="single" collapsible className="mt-10 space-y-3">
        {faq.map((item) => (
          <AccordionItem key={item.question} value={item.question} className="rounded-xl border border-border/70 bg-white px-5 shadow-sm sm:px-6">
            <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-foreground hover:text-primary hover:no-underline sm:text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
