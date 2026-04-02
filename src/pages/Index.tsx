import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  Home,
  Wrench,
  Tractor,
  MessageCircle,
  TrendingDown,
  Wallet,
  Scale,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  ShieldCheck,
  Target,
  Trophy,
  Star
} from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5538991118169?text=Ol%C3%A1+Vi+seu+site+e+gostaria+de+fazer+uma+simula%C3%A7%C3%A3o+de+cons%C3%B3rcio";

const Index = () => {
  const [formData, setFormData] = useState({ name: "", whatsapp: "", goal: "" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá Yuri! Meu nome é ${formData.name}. Tenho interesse em conquistar: ${formData.goal}. Podemos conversar?`;
    const url = `https://wa.me/5538991118169?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/30 overflow-x-hidden">
      
      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center animate-bounce-short"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Header / Hero Section */}
      <header className="relative bg-gradient-navy text-primary-foreground min-h-[90vh] flex items-start pt-12 md:pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] z-0">
            <img 
              src="/yuri1.jpg" 
              alt="Fundo" 
              className="w-full h-full object-cover object-[center_top] sm:object-[center_20%] opacity-50"
            />
            {/* Gradiente para suavizar a transição da cor sólida para a foto */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl flex flex-col items-start">
            <div className="mb-10">
              <img src="/Logo.png" alt="Yuri Soares Consórcios" className="h-40 md:h-56 object-contain drop-shadow-lg" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-md">
              Conquiste seu carro ou imóvel <span className="text-accent underline decoration-accent/50 underline-offset-8">sem pagar dois</span> para o banco.
            </h1>
            
            <p className="text-lg md:text-2xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
              A forma mais inteligente de planejar sua conquista: zero juros, parcelas que cabem no bolso e estratégias reais de contemplação.
            </p>
            
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-primary uppercase font-bold tracking-wide h-16 px-10 text-lg shadow-card border-none rounded-xl group transition-all">
                Quero fazer uma simulação gratuita
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            
            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-blue-200">
              <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-accent" /> Compra Segura</span>
              <span className="flex items-center gap-2"><Trophy className="w-5 h-5 text-accent" /> Especialista</span>
            </div>
          </div>
        </div>
      </header>

      {/* Quem Sou (About) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-5/12 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10 w-full aspect-[3/4] max-w-md mx-auto">
                <img src="/1.jpeg" alt="Yuri Soares" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-2xl font-bold">Yuri Soares</h3>
                    <p className="text-blue-200 font-medium tracking-wide">Especialista em Consórcios</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-2/3 h-2/3 bg-accent/10 rounded-3xl -z-0" />
            </div>
            
            <div className="w-full lg:w-7/12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-primary font-semibold text-sm mb-6">
                <Star className="w-4 h-4 text-accent fill-accent" /> Mais de 4 anos de experiência
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-primary">Ajudando pessoas a conquistarem o que <span className="text-accent">realmente importa</span>.</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Sou o Yuri Soares, especialista em consórcios, com sólida experiência no mercado ajudando pessoas a conquistarem patrimônio, liberdade financeira e segurança verdadeira.
                </p>
                <p>
                  Minha missão vai muito além de vender consórcio. Eu trabalho para mostrar que é possível sair do aluguel, conquistar seu carro ou investir em imóveis com <strong>estratégia, planejamento e inteligência</strong> — sem depender de juros abusivos.
                </p>
                <p>
                  Ao longo desses anos, já ajudei diversas pessoas a saírem da dúvida e tomarem decisões seguras sobre o próprio dinheiro. Aqui, você não vai encontrar promessas vazias, mas sim orientação clara, direta e focada no seu objetivo.
                </p>
                <p className="text-xl font-medium text-primary border-l-4 border-accent pl-6 py-2">
                  Consórcio não é sobre esperar. É sobre planejar e conquistar!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que Consórcio? (A Dor do Cliente) */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">Por que parar de perder dinheiro?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16">
            Você sabia que em um financiamento comum você chega a pagar o valor de <strong className="text-destructive">dois bens</strong> por causa dos juros abusivos?
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50 text-left">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <TrendingDown className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Zero Juros</h3>
              <p className="text-muted-foreground leading-relaxed">Apenas uma taxa de administração fixa e transparente. Você sabe exatamente pelo que está pagando, do início ao fim.</p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50 text-left">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <Wallet className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Poder de Compra</h3>
              <p className="text-muted-foreground leading-relaxed">Com a carta de crédito em mãos, você compra à vista e ganha poder para negociar grandes descontos na hora da compra.</p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50 text-left">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Flexibilidade</h3>
              <p className="text-muted-foreground leading-relaxed">Planos estruturados que se adaptam perfeitamente ao seu orçamento mensal, sem comprometer a sua qualidade de vida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona a Contemplação */}
      <section className="py-24 bg-gradient-navy text-white relative flex flex-col items-center">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white/20"><polygon points="100,0 100,100 0,100" /></svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="flex justify-center mb-12">
            <img src="/4.jpeg?v=2" alt="Yuri Soares - Estratégias" className="rounded-3xl shadow-2xl w-full max-w-md h-auto border-4 border-white/10" />
          </div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">4 Formas de pegar seu crédito rápido.</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              No nosso grupo, você não depende apenas da sorte. Trabalhamos com <strong>estratégias reais</strong> para acelerar a sua conquista.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Sorteio */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all flex flex-col h-full">
              <h3 className="text-2xl font-bold text-accent mb-4">Sorteio</h3>
              <div className="w-12 h-1 bg-white/20 mb-6 rounded-full" />
              <p className="text-blue-100 flex-grow leading-relaxed">Todos os meses, um número é sorteado pela Loteria Federal. Todos participam com chances iguais de serem contemplados.</p>
            </div>

            {/* Lance Livre */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all flex flex-col h-full">
              <h3 className="text-2xl font-bold text-accent mb-4">Lance Livre</h3>
              <div className="w-12 h-1 bg-white/20 mb-6 rounded-full" />
              <p className="text-blue-100 flex-grow leading-relaxed">Você oferta o valor que desejar ou puder. Quem tiver o maior lance do grupo ganha e leva a carta de crédito na mesma hora.</p>
            </div>

            {/* Lance Fixo 25% */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all flex flex-col h-full relative overflow-hidden">
              <h3 className="text-2xl font-bold text-accent mb-4 relative z-10">Fixo 25%</h3>
              <div className="w-12 h-1 bg-white/20 mb-6 rounded-full relative z-10" />
              <p className="text-blue-100 flex-grow leading-relaxed relative z-10">Uma disputa justa! Você oferta exatamente 25% da carta e concorre apenas com quem escolheu essa mesma modalidade.</p>
            </div>

            {/* Lance Fixo 50% */}
            <div className="bg-gradient-gold text-primary p-8 rounded-2xl border-none shadow-lg transform md:-translate-y-4 flex flex-col h-full relative overflow-hidden">
              <div className="absolute -right-4 -top-4 bg-white/30 w-24 h-24 rounded-full blur-xl mix-blend-overlay"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Fixo 50%</h3>
              <div className="w-12 h-1 bg-primary/20 mb-6 rounded-full relative z-10" />
              <p className="font-medium flex-grow leading-relaxed relative z-10">Para quem quer prioridade máxima! Oferte 50% e aumente drasticamente as suas chances de estar com o bem em mãos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* O Diferencial: Lance Embutido */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl shadow-card rounded-3xl overflow-hidden bg-white border border-border">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-5/12 bg-secondary p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border min-h-[300px]">
              <Target className="w-16 h-16 text-primary mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-primary">Não tem dinheiro para o lance?</h2>
              <p className="text-xl text-muted-foreground font-medium">Nós ajudamos você com o nosso grande diferencial.</p>
            </div>
            
            <div className="md:w-7/12 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-accent mb-6">O Poder do Lance Embutido</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Com o Lance Embutido, você pode usar <strong>até 25% do valor da sua própria carta de crédito</strong> para dar o lance sem precisar tirar nenhum centavo do próprio bolso.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/> Exemplo Prático:</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Quer um crédito de <strong>R$ 100 mil</strong>? Você pode usar <strong>R$ 25 mil</strong> do próprio consórcio para o lance e pegar <strong>R$ 75 mil em mãos</strong> para comprar seu bem. É o grande empurrão que faltava para você ser contemplado mais rápido!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que você pode conquistar? */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-primary">O que você vai conquistar?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Car, title: "Veículos", desc: "Troque de carro ou compre o seu primeiro sem precisar de entrada." },
              { icon: Home, title: "Imóveis", desc: "Sua casa própria, apartamento novo ou aquele terreno para construir." },
              { icon: Wrench, title: "Reforma", desc: "Crédito liberado para deixar sua casa do jeito que você sempre sonhou." },
              { icon: Tractor, title: "Pesados e Agro", desc: "Planos especiais desenhados para frotas de caminhões e maquinário." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-border group hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                  <item.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Prova Social Section Intro */}
          <div className="mt-20 max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/50 text-left">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-accent fill-accent" /> Clientes Satisfeitos
            </h3>
            <p className="text-lg text-muted-foreground mb-8">Nossa maior recompensa é ver a alegria no momento da entrega das chaves. Junte-se também aos nossos clientes satisfeitos que conquistaram seus bens com planejamento e inteligência.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src="/2.jpeg" alt="Cliente Feliz" className="rounded-xl w-full h-40 md:h-48 object-cover shadow-sm" />
              <img src="/3.jpeg" alt="Entrega de Chaves" className="rounded-xl w-full h-40 md:h-48 object-cover shadow-sm" />
              <div className="hidden md:flex rounded-xl w-full h-48 bg-secondary items-center justify-center border-2 border-dashed border-border flex-col text-muted-foreground">
                <Trophy className="w-8 h-8 mb-2" />
                <span className="font-medium text-sm">Próximo é você!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Chamada Final */}
      <footer className="bg-gradient-navy text-white relative pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 justify-between max-w-6xl mx-auto">
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Chega de adiar o seu sonho.</h2>
              <p className="text-xl text-blue-200 mb-8 max-w-md leading-relaxed">
                Deixe seus dados e um de nossos especialistas entrará em contato para montar o perfil e o plano perfeito para você.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-blue-100">
                  <CheckCircle2 className="text-accent w-6 h-6 shrink-0" /> <span className="text-lg">Atendimento Personalizado</span>
                </div>
                <div className="flex items-center gap-4 text-blue-100">
                  <CheckCircle2 className="text-accent w-6 h-6 shrink-0" /> <span className="text-lg">Sem compromisso inicial</span>
                </div>
                <div className="flex items-center gap-4 text-blue-100">
                  <CheckCircle2 className="text-accent w-6 h-6 shrink-0" /> <span className="text-lg">Segurança total na sua compra</span>
                </div>
              </div>
            </div>

            <div className="lg:w-5/12">
              <div className="bg-white p-8 rounded-3xl shadow-xl text-primary">
                <h3 className="text-2xl font-bold mb-6">Receba uma consultoria!</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-muted-foreground">Seu Nome</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-muted-foreground">WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(DD) 9 9999-9999"
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-muted-foreground">O que deseja comprar?</label>
                    <select 
                      required
                      className="w-full px-4 py-3 bg-secondary rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Carro">Carro zero ou seminovo</option>
                      <option value="Imóvel">Casa ou Apartamento</option>
                      <option value="Reforma">Reforma</option>
                      <option value="Máquinas/Caminhão">Máquinas ou Caminhão</option>
                    </select>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl mt-4 shadow-md uppercase tracking-wider text-sm">
                    Receber consultoria gratuita agora
                  </Button>
                </form>
              </div>
            </div>

          </div>
          
          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/50 text-sm gap-4">
            <img src="/Logo.png" alt="Logo Yuri Soares" className="h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <p>© {new Date().getFullYear()} Yuri Soares Consórcios. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
