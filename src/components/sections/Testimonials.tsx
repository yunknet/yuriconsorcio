import { Quote, Star } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { sectionIds } from "@/config/site";
import { testimonials } from "@/content/home";

/** No celular os depoimentos viram um carrossel horizontal (scroll-snap), sem JS. */
export function Testimonials() {
  return (
    <Section id={sectionIds.testimonials} labelledBy="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        eyebrow="Depoimentos"
        title="O que dizem nossos clientes"
        description="A alegria da conquista é o que nos move. Confira o depoimento de quem já realizou seus sonhos com o Yuri."
      />

      <ul className="scrollbar-none -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.name}
            className="flex w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-border/70 bg-secondary/40 p-6 sm:w-auto sm:p-7"
          >
            <figure className="flex h-full flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex gap-0.5" role="img" aria-label="Avaliação: 5 de 5 estrelas">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden />
                  ))}
                </div>
                <Quote className="h-7 w-7 rotate-180 text-primary/10" aria-hidden />
              </div>
              <blockquote className="flex-1 leading-relaxed text-foreground/80">“{testimonial.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-accent" aria-hidden>
                  {testimonial.name.charAt(0)}
                </span>
                <span className="leading-tight">
                  <span className="block font-bold text-primary">{testimonial.name}</span>
                  <span className="text-xs text-muted-foreground">{testimonial.city}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
