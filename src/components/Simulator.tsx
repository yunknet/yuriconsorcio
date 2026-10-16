import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Car, Home, Wrench, TrendingUp, Landmark, Zap, BookOpen, Send, Bike } from "lucide-react";
import { getNextTeamMemberAsync } from "@/lib/teamRotation";
import { trackWhatsAppClick, getUTMSummaryTag } from "@/lib/tracking";

const typeOptions = [
  { id: "Veículos", label: "Consórcio de Veículos", icon: Car, min: 45000, max: 300000, step: 5000 },
  { id: "Imóveis", label: "Consórcio de Imóveis", icon: Home, min: 100000, max: 1000000, step: 10000 },
  { id: "Motos", label: "Consórcio de Moto", icon: Bike, min: 15000, max: 80000, step: 1000 },
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
  const [bid, setBid] = useState(0);
  const [formData, setFormData] = useState({ name: "" });

  const bidValues = useMemo(() => {
    const values = [];
    for (let i = 0; i <= 10000; i += 500) {
      if (i <= credit) values.push(i);
    }

    let nextValue = Math.ceil(10001 / type.step) * type.step;
    while (nextValue <= credit) {
      if (!values.includes(nextValue)) {
        values.push(nextValue);
      }
      nextValue += type.step;
    }

    if (values[values.length - 1] !== credit) {
      values.push(credit);
    }
    return values;
  }, [credit, type.step]);

  const currentBidIndex = useMemo(() => {
    const idx = bidValues.indexOf(bid);
    if (idx !== -1) return idx;
    let closestIdx = 0;
    let minDiff = Infinity;
    bidValues.forEach((val, index) => {
      const diff = Math.abs(val - bid);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = index;
      }
    });
    return closestIdx;
  }, [bid, bidValues]);

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
    setBid(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick("simulador");
    const utmTag = getUTMSummaryTag();
    const text = `Olá! Fiz uma simulação no site do Yuri Soares.%0A%0A*Detalhes:*%0A- Consórcio de: ${type.id}%0A- Valor do crédito: ${formatCurrency(credit)}%0A- Objetivo: ${objective}${objective === "Lance imediato" ? `%0A- Valor do lance: ${formatCurrency(bid)}` : ""}%0A%0AMeu nome é ${formData.name}. Gostaria de ver as opções de parcelas!${utmTag}`;
    const member = await getNextTeamMemberAsync(formData.name);
    const url = `https://wa.me/${member.phone}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full relative">
      {/* ProgressBar */}
      <div className="absolute top-0 left-0 w-full flex h-1 bg-slate-100">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="p-5 sm:p-7 md:p-10 flex-grow flex flex-col">
        <div className="text-xs sm:text-sm font-semibold text-primary mb-4 sm:mb-6 flex items-center gap-2">
          <span className="bg-blue-50 text-primary px-3 py-1 rounded-full">{step} de 3 — {step === 1 ? 'Simulação' : step === 2 ? 'Objetivo' : 'Seus Dados'}</span>
        </div>

        {/* Step 1: Tipo de Consórcio e Valor */}
        {step === 1 && (
          <div className="animate-fade-in flex flex-col flex-grow">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">Escolha o tipo de consórcio</h3>

            <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {typeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleTypeChange(opt)}
                  className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${type.id === opt.id
                      ? "border-primary bg-blue-50/50"
                      : "border-slate-100 hover:border-slate-200"
                    }`}
                >
                  <opt.icon className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${type.id === opt.id ? "text-primary" : "text-slate-400"}`} />
                  <span className={`text-sm sm:text-base font-semibold ${type.id === opt.id ? "text-primary" : "text-slate-600"}`}>
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
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1.5">Qual é o seu objetivo?</h3>
            <p className="text-sm sm:text-base text-slate-500 font-medium mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-primary font-bold">{type.id}</span> • {formatCurrency(credit)}
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 overflow-y-auto pr-1 sm:pr-2 pb-2">
              {objectiveOptions.map((opt) => (
                <div key={opt.id} className="flex flex-col gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setObjective(opt.id)}
                    className={`w-full flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${objective === opt.id
                        ? "border-primary bg-blue-50/50"
                        : "border-slate-100 hover:border-slate-200"
                      }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${objective === opt.id ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-400"}`}>
                      <opt.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm sm:text-base font-bold mb-0.5 sm:mb-1 ${objective === opt.id ? "text-primary" : "text-slate-700"}`}>
                        {opt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </button>

                  {/* Lance Imediato Slider */}
                  {objective === "Lance imediato" && opt.id === "Lance imediato" && (
                    <div className="animate-fade-in sm:ml-4 sm:border-l-4 sm:border-l-primary p-3.5 sm:p-4 sm:pl-5 bg-blue-50/50 rounded-xl sm:rounded-2xl border border-blue-100 flex flex-col gap-3 sm:gap-4">
                      <div className="flex justify-between items-end gap-2">
                        <span className="text-slate-700 font-medium text-xs sm:text-base flex-1 leading-tight">Quanto de lance você tem em mãos?</span>
                        <span className="text-lg sm:text-2xl font-bold text-primary whitespace-nowrap">{formatCurrency(bid)}</span>
                      </div>

                      <div>
                        <input
                          type="range"
                          min={0}
                          max={bidValues.length - 1}
                          step={1}
                          value={currentBidIndex}
                          onChange={(e) => setBid(bidValues[Number(e.target.value)])}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-[11px] sm:text-xs text-slate-400 font-medium mt-1.5 sm:mt-2">
                          <span>{formatCurrency(0)}</span>
                          <span>{formatCurrency(credit)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="h-12 sm:h-14 px-4 sm:px-6 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 text-sm sm:text-base"
              >
                <ChevronLeft className="mr-1.5 w-4 h-4 sm:w-5 sm:h-5" /> Voltar
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!objective}
                className="flex-1 h-12 sm:h-14 text-sm sm:text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md disabled:opacity-50"
              >
                Próximo <ChevronRight className="ml-1.5 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Dados para Contato */}
        {step === 3 && (
          <div className="animate-fade-in flex flex-col flex-grow">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1.5">Para onde envio sua simulação?</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-4 sm:mb-6">
              Preencha rapidinho para te enviar os valores no WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">Seu Nome</label>
                <input
                  type="text"
                  required
                  spellCheck="false"
                  placeholder="Ex: João da Silva"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm sm:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="mt-auto pt-6 pb-2 flex flex-row gap-3 items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="w-12 h-12 sm:w-14 sm:h-14 p-0 flex items-center justify-center border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 shrink-0"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                <Button
                  type="submit"
                  disabled={formData.name.trim().length < 2}
                  className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-md border-none disabled:opacity-50 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
