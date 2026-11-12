import { Scale, TrendingDown, Wallet, type LucideIcon } from "lucide-react";

/**
 * Textos da página inicial. Separados dos componentes para facilitar
 * a edição do conteúdo sem mexer em layout.
 */

export const heroHighlights = ["Sem juros", "Sem entrada", "Parcelas que cabem no bolso"] as const;

export const simulatorPerks = [
  "Parcelas reduzidas até a contemplação",
  "Planos flexíveis de 36 a 240 meses",
  "Créditos a partir de R$ 15 mil",
  "Use o lance embutido para adiantar seu bem",
] as const;

export const aboutParagraphs = [
  "Sou o Yuri Soares, especialista em consórcios, com sólida experiência no mercado ajudando pessoas a conquistarem patrimônio, liberdade financeira e segurança verdadeira.",
  "Minha missão vai muito além de vender consórcio. Eu trabalho para mostrar que é possível sair do aluguel, conquistar seu carro ou investir em imóveis com estratégia, planejamento e inteligência — sem depender de juros abusivos.",
  "Ao longo desses anos, já ajudei diversas pessoas a saírem da dúvida e tomarem decisões seguras sobre o próprio dinheiro. Aqui, você não vai encontrar promessas vazias, mas sim orientação clara, direta e focada no seu objetivo.",
] as const;

export const benefits: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: TrendingDown,
    title: "Zero juros",
    description: "Apenas uma taxa de administração fixa e transparente. Você sabe exatamente pelo que está pagando, do início ao fim.",
  },
  {
    icon: Wallet,
    title: "Poder de compra",
    description: "Com a carta de crédito em mãos, você compra à vista e ganha poder para negociar grandes descontos na hora da compra.",
  },
  {
    icon: Scale,
    title: "Flexibilidade",
    description: "Planos estruturados que se adaptam ao seu orçamento mensal, sem comprometer a sua qualidade de vida.",
  },
];

export const contemplationMethods: { title: string; description: string; featured?: boolean }[] = [
  {
    title: "Sorteio",
    description: "Todos os meses, um número é sorteado pela Loteria Federal. Todos participam com chances iguais de serem contemplados.",
  },
  {
    title: "Lance livre",
    description: "Você oferta o valor que desejar ou puder. Quem tiver o maior lance do grupo ganha e leva a carta de crédito na mesma hora.",
  },
  {
    title: "Lance fixo 25%",
    description: "Uma disputa justa! Você oferta exatamente 25% da carta e concorre apenas com quem escolheu essa mesma modalidade.",
  },
  {
    title: "Lance fixo 50%",
    description: "Para quem quer prioridade máxima! Oferte 50% e aumente drasticamente as suas chances de estar com o bem em mãos.",
    featured: true,
  },
];

/** `typeId` liga o card ao tipo correspondente no simulador. */
export const goals: { typeId: string; title: string; description: string }[] = [
  { typeId: "Veículos", title: "Veículos", description: "Troque de carro ou compre o seu primeiro sem precisar de entrada." },
  { typeId: "Imóveis", title: "Imóveis", description: "Sua casa própria, apartamento novo ou aquele terreno para construir." },
  { typeId: "Motos", title: "Motos", description: "Acelere sua liberdade com planos flexíveis para conquistar sua moto." },
  { typeId: "Serviços", title: "Serviços", description: "Crédito liberado para cirurgias, grandes reformas, viagens ou educação." },
  {
    typeId: "Alavancagem financeira",
    title: "Alavancagem financeira",
    description: "Multiplique recursos e use o sistema de forma estratégica para lucrar.",
  },
  {
    typeId: "Alavancagem patrimonial",
    title: "Alavancagem patrimonial",
    description: "Construção de patrimônio a longo prazo com inteligência financeira.",
  },
];

export const ctaHighlights = ["Atendimento personalizado", "Sem compromisso inicial", "Segurança total na sua compra"] as const;

export const testimonials = [
  {
    name: "Lucas",
    city: "Montes Claros",
    text: "Sou cliente do consórcio há anos e sempre tive um atendimento respeitoso. O Yuri me ajudou a encontrar o plano perfeito!",
  },
  {
    name: "Fernanda",
    city: "Janaúba",
    text: "Conquistei meu carro dos sonhos! Já faz 1 ano da minha conquista. Recomendo demais o atendimento do Yuri.",
  },
  {
    name: "Rodrigo",
    city: "Januária",
    text: "Com o sonho do carro próprio, comprei uma cota de consórcio. O processo foi simples e transparente do início ao fim.",
  },
  {
    name: "Juliana",
    city: "Bocaiuva",
    text: "Eu comprei a cota pois sou do tipo que só guarda dinheiro se tem um boleto para pagar. Melhor decisão que tomei!",
  },
] as const;

export const faq = [
  {
    question: "Consórcio de veículos",
    answer:
      "Adquira seu carro zero ou seminovo, moto ou veículo pesado sem pagar juros abusivos. Planos flexíveis que se adaptam ao seu orçamento, permitindo lances para antecipar a contemplação.",
  },
  {
    question: "Consórcio de imóveis",
    answer:
      "O caminho mais inteligente para sair do aluguel ou investir em terrenos. Use seu saldo de FGTS para ofertar lances ou abater as parcelas do seu consórcio imobiliário.",
  },
  {
    question: "Serviços (ex.: cirurgia, reforma...)",
    answer:
      "Crédito focado em contratação de serviços variados. Desde grandes reformas residenciais até procedimentos estéticos e cirurgias, com parcelamento planejado.",
  },
  {
    question: "Alavancagem financeira",
    answer:
      "Estratégias avançadas para potencializar seu capital. Ideal para empresários e investidores que desejam multiplicar recursos utilizando cartas de crédito como moeda de troca.",
  },
  {
    question: "Alavancagem patrimonial",
    answer:
      "Construção e aceleração de patrimônio a longo prazo. Formação de renda passiva através da aquisição contínua de bens e imóveis utilizando a inteligência do sistema de consórcios.",
  },
] as const;
