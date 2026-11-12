import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, sectionIds } from "@/config/site";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

/**
 * Header fixo: transparente sobre o hero e sólido (branco) após rolar
 * ou com o menu mobile aberto. O único CTA leva ao simulador.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const solid = scrolled || menuOpen;

  // Fecha o menu com Esc e trava a rolagem do fundo enquanto aberto.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const simulatorHref = `#${sectionIds.simulator}`;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        solid ? "border-b border-border bg-white/90 shadow-sm backdrop-blur-lg" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container flex h-[var(--header-height)] items-center justify-between gap-4">
        <a
          href={`#${sectionIds.home}`}
          onClick={closeMenu}
          aria-label="Yuri Soares — voltar ao início"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Logo tone={solid ? "light" : "dark"} />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                solid ? "text-muted-foreground hover:bg-secondary hover:text-primary" : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
          <Button asChild variant="gold" size="sm" className="ml-3 rounded-full px-5">
            <a href={simulatorHref}>
              Simular agora <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className={cn(
            "-mr-2 rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden",
            solid ? "text-primary hover:bg-secondary" : "text-white hover:bg-white/10",
          )}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={closeMenu}
            className="fixed inset-0 top-[var(--header-height)] -z-10 bg-navy-deep/40 backdrop-blur-sm"
          />
          <nav aria-label="Menu mobile" className="border-t border-border bg-white shadow-xl duration-200 animate-in fade-in slide-in-from-top-2">
            <ul className="container flex flex-col py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="flex rounded-lg px-2 py-3.5 text-base font-semibold text-foreground hover:bg-secondary hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pb-2 pt-3">
                <Button asChild variant="gold" size="lg" className="w-full">
                  <a href={simulatorHref} onClick={closeMenu}>
                    Fazer simulação gratuita <ArrowRight className="h-5 w-5" aria-hidden />
                  </a>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
