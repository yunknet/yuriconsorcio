/**
 * Dados de identidade do consultor. Fonte única da verdade.
 *
 * Os números de WhatsApp da equipe ficam em `src/lib/teamRotation.ts`:
 * o contato acontece somente pelo simulador, que distribui os clientes
 * entre a equipe (rodízio).
 */
export const siteConfig = {
  name: "Yuri Soares",
  brand: "Yuri Soares Consórcios",
  tagline: "Consórcio e Investimentos",
  role: "Especialista em Consórcios",
  yearsOfExperience: 4,
  cnpj: "65.474.055/0001-89",
  contact: {
    email: "yuriguilherme.consorcio@gmail.com",
  },
  social: {
    instagram: { handle: "@yuriconsorcio", url: "https://www.instagram.com/yuriconsorcio/" },
  },
  developer: {
    name: "Aureliano Soares",
    instagram: "https://www.instagram.com/netinho.so/",
    linkedin: "https://www.linkedin.com/in/aureliano-soares-b43247332/",
  },
} as const;

/** IDs das seções — usados no menu, no rodapé e nos botões de CTA. */
export const sectionIds = {
  home: "inicio",
  simulator: "simulador",
  about: "sobre",
  benefits: "vantagens",
  howItWorks: "como-funciona",
  goals: "conquistas",
  testimonials: "depoimentos",
  faq: "duvidas",
} as const;

export const navLinks = [
  { label: "Início", href: `#${sectionIds.home}` },
  { label: "Simulador", href: `#${sectionIds.simulator}` },
  { label: "Sobre", href: `#${sectionIds.about}` },
  { label: "Depoimentos", href: `#${sectionIds.testimonials}` },
  { label: "Dúvidas", href: `#${sectionIds.faq}` },
] as const;
