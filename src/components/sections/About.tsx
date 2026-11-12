import { Star } from "lucide-react";
import aboutImage from "@/assets/yuri-about.webp";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/SectionHeading";
import { sectionIds, siteConfig } from "@/config/site";
import { aboutParagraphs } from "@/content/home";

export function About() {
  return (
    <Section id={sectionIds.about} labelledBy="about-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div aria-hidden className="absolute -bottom-4 -right-4 h-2/3 w-2/3 rounded-3xl bg-accent/15 sm:-bottom-6 sm:-right-6" />
          <figure className="relative overflow-hidden rounded-3xl shadow-card">
            <img src={aboutImage} alt={`${siteConfig.name} em seu escritório`} width={720} height={780} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 to-transparent p-6 pt-16">
              <p className="font-display text-xl font-bold text-white">{siteConfig.name}</p>
              <p className="text-sm font-medium text-white/75">{siteConfig.role}</p>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7">
          <Eyebrow>
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden /> Mais de {siteConfig.yearsOfExperience} anos de experiência
          </Eyebrow>
          <h2 id="about-title" className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-[2.75rem]">
            Ajudando pessoas a conquistarem o que <span className="text-accent-strong">realmente importa</span>.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-4 border-accent pl-5 font-display text-lg font-semibold text-primary sm:text-xl">
            Consórcio não é sobre esperar. É sobre planejar e conquistar!
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
