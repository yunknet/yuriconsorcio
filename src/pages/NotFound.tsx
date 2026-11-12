import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";

const NotFound = () => (
  <main className="flex min-h-[100svh] flex-col items-center justify-center bg-navy-gradient px-6 text-center text-white">
    <Logo tone="dark" />
    <p className="mt-10 font-display text-7xl font-extrabold text-accent">404</p>
    <h1 className="mt-2 text-2xl font-bold">Página não encontrada</h1>
    <p className="mt-2 text-white/70">O endereço que você acessou não existe ou foi alterado.</p>
    <Button asChild variant="gold" size="lg" className="mt-8">
      <Link to="/">Voltar para o início</Link>
    </Button>
  </main>
);

export default NotFound;
