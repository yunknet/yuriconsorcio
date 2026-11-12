import { Lightbulb } from "lucide-react";
import { Section } from "@/components/common/Section";

export function EmbeddedBid() {
  return (
    <Section labelledBy="embedded-bid-title" containerClassName="max-w-6xl">
      <div className="grid overflow-hidden rounded-3xl shadow-float md:grid-cols-12">
        <div className="relative flex flex-col justify-center bg-navy-gradient p-8 text-white sm:p-10 md:col-span-5 lg:p-12">
          <h2 id="embedded-bid-title" className="text-3xl font-bold leading-tight sm:text-4xl">
            Não tem dinheiro <span className="text-gold-gradient">para o lance?</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">Nós temos a estratégia perfeita para te ajudar com o nosso maior diferencial de mercado.</p>
        </div>

        <div className="bg-white p-8 sm:p-10 md:col-span-7 lg:p-12">
          <h3 className="text-2xl font-bold text-primary sm:text-3xl">O poder do lance embutido</h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Com o lance embutido, você pode usar <strong className="text-foreground">até 25% do valor da sua própria carta de crédito</strong> para ofertar o
            lance. Tudo isso sem descapitalizar e sem tirar dinheiro do seu bolso.
          </p>

          <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/[0.07] p-5 sm:p-6">
            <p className="mb-2 flex items-center gap-2 font-display font-bold text-primary">
              <Lightbulb className="h-5 w-5 text-accent-strong" aria-hidden /> Exemplo prático
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Sua meta é comprar um carro de <strong className="text-foreground">R$ 75 mil</strong>? Nós planejamos uma carta de crédito de{" "}
              <strong className="text-foreground">R$ 100 mil</strong>. Usamos <strong className="text-foreground">R$ 25 mil</strong> do consórcio como o seu
              lance e você retira exatamente os R$ 75 mil em mãos! É o atalho estratégico para sua contemplação.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
