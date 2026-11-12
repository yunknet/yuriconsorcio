import { Calculator, Mail } from "lucide-react";
import { InstagramIcon, LinkedInIcon } from "@/components/common/BrandIcons";
import { sectionIds, siteConfig } from "@/config/site";
import { Logo } from "./Logo";

const footerLinks = [
  { label: "Início", href: `#${sectionIds.home}` },
  { label: "Simulador", href: `#${sectionIds.simulator}` },
  { label: "Como funciona", href: `#${sectionIds.howItWorks}` },
  { label: "Vantagens", href: `#${sectionIds.benefits}` },
  { label: "Depoimentos", href: `#${sectionIds.testimonials}` },
  { label: "Dúvidas", href: `#${sectionIds.faq}` },
];

const linkClass = "transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none";

export function Footer() {
  const { contact, social, developer } = siteConfig;

  return (
    <footer className="bg-navy-deep pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 text-sm text-white/60 sm:pt-16">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm leading-relaxed">
              Especialista em consórcios e investimentos. Te ajudo a realizar seus sonhos de forma inteligente e planejada.
            </p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-white">Navegação</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-white">Contato</h2>
            <ul className="space-y-3">
              <li>
                <a href={`#${sectionIds.simulator}`} className={`inline-flex items-center gap-3 ${linkClass}`}>
                  <Calculator className="h-4 w-4 shrink-0 text-accent" aria-hidden /> Fazer simulação gratuita
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`inline-flex items-center gap-3 break-all ${linkClass}`}>
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden /> {contact.email}
                </a>
              </li>
              <li>
                <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 ${linkClass}`}>
                  <InstagramIcon className="h-4 w-4 shrink-0 text-accent" /> {social.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {siteConfig.brand}. Todos os direitos reservados.
            </p>
            <p className="text-white/40">CNPJ: {siteConfig.cnpj}</p>
          </div>

          <div className="flex items-center gap-3">
            <span>
              Site desenvolvido por <strong className="font-semibold text-white/80">{developer.name}</strong>
            </span>
            <a href={developer.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${developer.name}`} className={linkClass}>
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${developer.name}`} className={linkClass}>
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
