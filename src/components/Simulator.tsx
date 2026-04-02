import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Car, Home, Wrench, TrendingUp, Landmark, Zap, BookOpen, Send } from "lucide-react";

const WHATSAPP_NUMBER = "5538991118169";

const typeOptions = [
  { id: "Veículos", label: "Consórcio de Veículos", icon: Car, min: 50000, max: 300000, step: 5000 },
  { id: "Imóveis", label: "Consórcio de Imóveis", icon: Home, min: 100000, max: 1000000, step: 10000 },
  { id: "Serviços", label: "Serviços (Cirurgia, Reforma etc...)", icon: Wrench, min: 15000, max: 150000, step: 5000 },
  { id: "Alavancagem financeira", label: "Alavancagem financeira", icon: TrendingUp, min: 100000, max: 2000000, step: 20000 },
  { id: "Alavancagem patrimonial", label: "Alavancagem patrimonial", icon: Landmark, min: 200000, max: 5000000, step: 50000 },
];

const objectiveOptions = [
  {
    id: "Investimento",
    title: "Investimento",
    description: "Quero usar o consórcio como forma de investimento e patrimônio",
    icon: TrendingUp,
  },
  {
    id: "Lance imediato",
    title: "Lance imediato",
    description: "Pretendo dar um lance e ser contemplado o mais rápido possível",
    icon: Zap,
  },
  {
    id: "Quero entender mais",
    title: "Quero entender mais",
    description: "Ainda estou conhecendo o consórcio e quero tirar dúvidas",
    icon: BookOpen,
  },
];

export function Simulator() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(typeOptions[0]);
  const [credit, setCredit] = useState(typeOptions[0].min);
  const [objective, setObjective] = useState("");
  const [formData, setFormData] = useState({ name: "" });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };


  const handleTypeChange = (option: typeof typeOptions[0]) => {
    setType(option);
    setCredit(option.min);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá Yuri! Fiz uma simulação no seu site.%0A%0A*Detalhes:*%0A- Consórcio de: ${type.id}%0A- Valor do crédito: ${formatCurrency(credit)}%0A- Objetivo: ${objective}%0A%0AMeu nome é ${formData.name}. Gostaria de ver as opções de parcelas!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full relative">
      {/* ProgressBar */}
      <div className="absolute top-0 left-0 w-full flex h-1 bg-slate-100">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out" 
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="p-8 md:p-10 flex-grow flex flex-col">
        <div className="text-sm font-semibold text-primary mb-6 flex items-center gap-2">
          <span className="bg-blue-50 text-primary px-3 py-1 rounded-full">{step} de 3 — {step === 1 ? 'Simulação' : step === 2 ? 'Objetivo' : 'Seus Dados'}</span>
        </div>

        {/* Step 1: Tipo de Consórcio e Valor */}
        {step === 1 && (
          <div className="animate-fade-in flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Escolha o tipo de consórcio</h3>
            
            <div className="space-y-3 mb-8">
              {typeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleTypeChange(opt)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    type.id === opt.id 
                      ? "border-primary bg-blue-50/50" 
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <opt.icon className={`w-6 h-6 ${type.id === opt.id ? "text-primary" : "text-slate-400"}`} />
                  <span className={`font-semibold ${type.id === opt.id ? "text-primary" : "text-slate-600"}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-end mb-4">
                <span className="text-slate-500 font-medium text-sm">Valor do crédito</span>
                <span className="text-3xl font-bold text-primary">{formatCurrency(credit)}</span>
              </div>
              
              <input 
                type="range" 
                min={type.min} 
                max={type.max} 
                step={type.step}
                value={credit}
                onChange={(e) => setCredit(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              
              <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                <span>{formatCurrency(type.min)}</span>
                <span>{formatCurrency(type.max)}</span>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md"
              >
                Próximo <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Objetivo */}
        {step === 2 && (
          <div className="animate-fade-in flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Qual é o seu objetivo?</h3>
            <p className="text-slate-500 font-medium mb-6 flex items-center gap-2">
              <span className="text-primary">{type.id}</span> • {formatCurrency(credit)}
            </p>

            <div className="space-y-4 mb-8">
              {objectiveOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setObjective(opt.id)}
                  className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                    objective === opt.id 
                      ? "border-primary bg-blue-50/50" 
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${objective === opt.id ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-400"}`}>
                    <opt.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 ${objective === opt.id ? "text-primary" : "text-slate-700"}`}>
                      {opt.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-auto pt-4 flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)} 
                className="h-14 px-6 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
              >
                <ChevronLeft className="mr-2 w-5 h-5" /> Voltar
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!objective}
                className="flex-1 h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md disabled:opacity-50"
              >
                Próximo <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Dados para Contato */}
        {step === 3 && (
          <div className="animate-fade-in flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Para onde envio sua simulação?</h3>
            <p className="text-slate-500 font-medium mb-6">
              Preencha rapidinho para eu te enviar os valores no WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Seu Nome</label>
                <input
                  type="text"
                  required
                  spellCheck="false"
                  placeholder="Ex: João da Silva"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="mt-auto pt-6 flex gap-3">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setStep(2)} 
                  className="w-14 h-14 p-0 flex items-center justify-center border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 shrink-0"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button 
                  type="submit" 
                  disabled={formData.name.trim().length < 2}
                  className="flex-1 h-14 text-base font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-md border-none disabled:opacity-50"
                >
                  <Send className="mr-2 w-5 h-5" /> Enviar para o WhatsApp
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
