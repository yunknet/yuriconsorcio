import { useState } from "react";
import { Simulator } from "@/components/Simulator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Star,
  Quote,
  Phone,
  Menu,
  X,
  ShieldCheck,
  Trophy,
  Target
} from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5538991118169?text=Ol%C3%A1+Vi+seu+site+e+gostaria+de+fazer+uma+simula%C3%A7%C3%A3o+de+cons%C3%B3rcio";

const Index = () => {
  const [formData, setFormData] = useState({ name: "", whatsapp: "", goal: "" });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá Yuri! Meu nome é ${formData.name}. Tenho interesse em conquistar: ${formData.goal}. Podemos conversar?`;
    const url = `https://wa.me/5538991118169?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Simulador", href: "#simulador" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "Dúvidas", href: "#duvidas" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/30 overflow-x-hidden">
      
      {/* Fixed Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/75 backdrop-blur-md border-b border-slate-100/50 shadow-sm py-4 md:py-2">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#inicio" className="flex items-center group">
            <div className="relative h-20 md:h-32 w-auto flex items-center justify-start">
              <img src="/Logo.png" alt="Yuri Soares" className="h-[120%] md:h-[140%] w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform origin-left" />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 flex items-center gap-2 border-none">
                <Phone className="w-4 h-4" /> Fale Comigo
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-primary focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-bold text-slate-700 hover:text-primary py-2 border-b border-slate-50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-2">
                <Button className="w-full bg-primary text-white font-bold h-12 rounded-xl">Fale Comigo</Button>
              </a>
            </div>
          </div>
        )}
      </nav>

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
      <header id="inicio" className="relative bg-gradient-navy text-primary-foreground min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary">
          <div className="absolute inset-0 right-0 w-full lg:w-[70%] lg:left-auto z-0">
            <div className="w-full h-full pt-16 md:pt-32 relative">
              <img 
                src="/yuri1.jpg" 
                alt="Yuri Soares" 
                className="w-full h-full object-cover object-[70%_top] lg:object-[80%_0%] opacity-100"
              />
              {/* Gradiente superior forte exatamente em cima da divisão da imagem para camuflar o corte */}
              <div className="absolute top-16 md:top-32 inset-x-0 h-40 md:h-64 bg-gradient-to-b from-primary via-primary/80 to-transparent z-10" />
            </div>
            
            {/* Gradiente Lateral/Inferior */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/30 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent lg:hidden block" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent z-10 pointer-events-none" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl flex flex-col items-start text-left mt-24 md:mt-32">
            <h1 className="text-[40px] md:text-8xl font-bold leading-[1.1] mb-6 text-white drop-shadow-lg">
              Invista no seu futuro <span className="text-accent underline decoration-accent/50 underline-offset-8">comigo</span>.
            </h1>
            
            <p className="text-lg md:text-3xl text-blue-100 mb-10 max-w-xl leading-relaxed">
              Realize seus sonhos sem juros e sem entrada. <span className="block mt-2">Parcelas que cabem no seu bolso, com toda a segurança.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-primary uppercase font-bold tracking-wide h-16 px-6 md:px-10 text-[15px] md:text-lg shadow-card border-none rounded-xl group transition-all shrink-0 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                Fazer simulação gratuita
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </Button>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm font-medium text-blue-200">
              <span className="flex items-center gap-2"><Trophy className="w-5 h-5 text-accent" /> Especialista</span>
            </div>
          </div>
        </div>
      </header>

      {/* Simulator Section */}
      <section className="py-24 bg-gradient-navy relative z-20" id="simulador">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-5/12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-bold text-sm mb-6 uppercase tracking-wider">
                Simulador de Consórcio
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
                Simule e realize seu sonho hoje
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Sem juros abusivos e sem entrada. Descubra o melhor plano para o seu momento de vida com uma simulação rápida e prática.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Parcelas reduzidas até a contemplação",
                  "Planos flexíveis de 50 a 240 meses",
                  "Créditos a partir de R$ 50 mil",
                  "Use o lance embutido para adiantar seu bem"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-blue-50 font-medium text-lg">
                    <CheckCircle className="w-6 h-6 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full lg:w-7/12">
              <Simulator />
            </div>
          </div>
        </div>
      </section>

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
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-gradient-navy rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-5/12 p-12 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Não tem dinheiro <span className="text-accent underline decoration-accent/30 underline-offset-4">para o lance?</span></h2>
                  <p className="text-xl text-blue-100 font-medium leading-relaxed">Nós temos a estratégia perfeita para te ajudar com o nosso maior diferencial de mercado.</p>
                </div>
              </div>
              
              <div className="md:w-7/12 p-12 md:p-16 bg-white relative">
                <h3 className="text-3xl font-bold text-primary mb-6">O Poder do Lance Embutido</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Com o Lance Embutido, você pode usar <strong>até 25% do valor da sua própria carta de crédito</strong> para ofertar o lance. Tudo isso sem descapitalizar e sem tirar dinheiro do seu bolso.
                </p>
                
                <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl relative shadow-inner">
                  <div className="absolute -left-4 -top-4 bg-accent text-primary p-3 rounded-2xl shadow-lg transform -rotate-6">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-primary text-xl mb-3 mt-2 ml-4">Exemplo Prático:</h4>
                  <p className="text-slate-600 text-[15px] leading-relaxed">
                    Sua meta é comprar um carro de <strong>R$ 75 mil</strong>? Nós planejamos uma carta de crédito de <strong>R$ 100 mil</strong>. Usamos <strong>R$ 25 mil</strong> do consórcio como o seu lance e você retira exatamente os R$ 75 mil em mãos! É o atalho estratégico para sua contemplação.
                  </p>
                </div>
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
        </div>
      </section>

      {/* Chamada Final (CTA) */}
      <section className="bg-gradient-navy text-white py-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Chega de adiar o seu sonho.</h2>
          <p className="text-xl text-blue-200 mb-12 leading-relaxed max-w-2xl mx-auto">
            Deixe seus dados e um de nossos especialistas entrará em contato para montar o perfil e o plano perfeito para você.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 w-full">
            <div className="flex items-center gap-3 text-blue-100 font-medium">
              <CheckCircle2 className="text-accent w-6 h-6 shrink-0" /> <span className="text-lg">Atendimento Personalizado</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100 font-medium">
              <CheckCircle2 className="text-accent w-6 h-6 shrink-0" /> <span className="text-lg">Sem compromisso inicial</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100 font-medium">
              <CheckCircle2 className="text-accent w-6 h-6 shrink-0" /> <span className="text-lg">Segurança total na sua compra</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos (Feedbacks) */}
      <section className="py-24 bg-white" id="depoimentos">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">O que dizem nossos clientes</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A alegria da conquista é o que nos move. Confira o depoimento de quem já realizou seus sonhos com o Yuri.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Carlos", city: "São Paulo", initial: "C", text: "Sou cliente do consórcio há anos e sempre tive um atendimento respeitoso. O Yuri me ajudou a encontrar o plano perfeito!" },
                { name: "Aline", city: "São Paulo", initial: "A", text: "Conquistei meu carro dos sonhos! Já faz 1 ano da minha conquista. Recomendo demais o atendimento do Yuri." },
                { name: "Gabriel", city: "São Paulo", initial: "G", text: "Com o sonho do carro próprio, comprei uma cota de consórcio. O processo foi simples e transparente do início ao fim." },
                { name: "Ana Paula", city: "Rio de Janeiro", initial: "AP", text: "Eu comprei a cota pois sou do tipo que só guarda dinheiro se tem um boleto para pagar. Melhor decisão que tomei!" }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex flex-col relative group hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-blue-100 group-hover:text-accent transition-colors rotate-180" />
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 italic flex-grow">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {testimonial.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50" id="duvidas">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Dúvidas Frequentes</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-slate-800">Tire suas dúvidas sobre o Consórcio</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white px-6 rounded-xl shadow-sm border border-slate-100/50">
              <AccordionTrigger className="text-left text-slate-800 font-bold hover:text-primary hover:no-underline py-5 text-lg">
                Consórcio de Veículos
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base pb-6 leading-relaxed">
                Adquira seu carro zero ou seminovo, moto ou veículo pesado sem pagar juros abusivos. Planos flexíveis que se adaptam ao seu orçamento, permitindo lances para antecipar a contemplação.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-white px-6 rounded-xl shadow-sm border border-slate-100/50">
              <AccordionTrigger className="text-left text-slate-800 font-bold hover:text-primary hover:no-underline py-5 text-lg">
                Consórcio de Imóveis
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base pb-6 leading-relaxed">
                O caminho mais inteligente para sair do aluguel ou investir em terrenos. Use seu saldo de FGTS para ofertar lances ou abater as parcelas do seu consórcio imobiliário.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-white px-6 rounded-xl shadow-sm border border-slate-100/50">
              <AccordionTrigger className="text-left text-slate-800 font-bold hover:text-primary hover:no-underline py-5 text-lg border-b-0">
                Serviços (Ex: Cirurgia, Reforma...)
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base pb-6 leading-relaxed">
                Crédito focado em contratação de serviços variados. Desde grandes reformas residenciais até procedimentos estéticos e cirurgias, com parcelamento planejado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-white px-6 rounded-xl shadow-sm border border-slate-100/50">
              <AccordionTrigger className="text-left text-slate-800 font-bold hover:text-primary hover:no-underline py-5 text-lg border-b-0">
                Alavancagem Financeira
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base pb-6 leading-relaxed">
                Estratégias avançadas para potencializar seu capital. Ideal para empresários e investidores que desejam multiplicar recursos utilizando cartas de crédito como moeda de troca.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-white px-6 rounded-xl shadow-sm border border-slate-100/50 border-b-0">
              <AccordionTrigger className="text-left text-slate-800 font-bold hover:text-primary hover:no-underline py-5 text-lg border-b-0">
                Alavancagem Patrimonial
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base pb-6 leading-relaxed">
                Construção e aceleração de patrimônio a longo prazo. Formação de renda passiva através da aquisição contínua de bens e imóveis utilizando a inteligência do sistema de consórcios.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#1a2332] text-slate-300 py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 max-w-6xl mx-auto">
            {/* Brand */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <img src="/Logo.png" alt="Yuri Soares Consórcios" className="h-16 mb-6 brightness-0 invert opacity-90 drop-shadow-md" />
              <p className="text-sm leading-relaxed max-w-sm text-slate-400">
                Especialista em consórcios e investimentos. Te ajudo a realizar seus sonhos de forma inteligente e planejada.
              </p>
            </div>

            {/* Navegação */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-6 text-lg">Navegação</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#simulador" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vantagens</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Depoimentos</a></li>
                <li><a href="#duvidas" className="hover:text-white transition-colors">Dúvidas</a></li>
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-6 text-lg">Contato</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-center gap-3 group">
                  <svg className="w-5 h-5 text-primary group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={WHATSAPP_LINK} className="hover:text-white transition-colors">(38) 99111-8169</a>
                </li>
                <li className="flex items-center gap-3 flex-wrap justify-center md:justify-start group">
                  <svg className="w-5 h-5 shrink-0 text-primary group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:yuriguilherme.consorcio@gmail.com" className="hover:text-white transition-colors break-all">yuriguilherme.consorcio@gmail.com</a>
                </li>
                <li className="flex items-center gap-3 group">
                  <svg className="w-5 h-5 text-primary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <a href="https://www.instagram.com/yuriconsorcio/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@yuriconsorcio</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar / Legal */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[13px] text-slate-500 gap-6 text-center md:text-left max-w-6xl mx-auto">
            <p>
              © {new Date().getFullYear()} Yuri Soares Consórcios. Todos os direitos reservados. 
              <span className="block md:inline md:ml-3 md:pl-3 md:border-l border-slate-700 mt-2 md:mt-0">CNPJ: 65.474.055/0001-89</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
              <span>site desenvolvido por <strong className="text-slate-400">Aureliano Soares</strong></span>
              <div className="flex items-center gap-3 text-slate-400">
                <a href="https://www.instagram.com/netinho.so/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> 
                  Instagram
                </a>
                <span className="text-slate-600">•</span>
                <a href="https://www.linkedin.com/in/aureliano-soares-b43247332/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
