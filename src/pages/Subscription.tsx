import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Check, Loader2, ArrowLeft, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import YnkLogo from "@/components/YnkLogo";

const plans = [
    {
        id: "setup",
        name: "Setup Inicial",
        description: "Personalização do seu Agente IA",
        price: "100",
        period: "único",
        type: "setup" as const,
        features: [
            "Configuração completa do agente",
            "Personalização de respostas",
            "Treinamento do modelo IA",
            "Integração com seu negócio",
        ],
    },
    {
        id: "mensal",
        name: "Plano Mensal",
        description: "Manutenção e uso contínuo do sistema",
        price: "60",
        period: "/mês",
        type: "monthly" as const,
        popular: true,
        features: [
            "Agente IA ativo 24/7",
            "Painel de gerenciamento",
            "Conexão WhatsApp via QR Code",
            "Suporte dedicado",
            "Atualizações incluídas",
        ],
    },
];

const Subscription = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planId: string) => {
        setLoading(planId);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                toast.error("Sessão expirada. Faça login novamente.");
                navigate("/login");
                return;
            }

            const { data, error } = await supabase.functions.invoke('create-checkout', {
                body: {
                    plan: planId,
                    userId: user.id
                }
            });

            if (error) throw error;
            const paymentUrl = data?.payment_url || data?.url;

            if (!paymentUrl) throw new Error("URL de pagamento não gerada");

            if (data.referenceId) {
                localStorage.setItem("subscription_ref", data.referenceId);
            }

            window.location.href = paymentUrl;

        } catch (error: any) {
            console.error("Erro:", error);
            toast.error("Erro ao processar: " + (error.message || "Erro desconhecido"));
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />

            <div className="w-full max-w-4xl space-y-8 relative z-10">
                <div className="flex items-center justify-between">
                    <Link to="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Dashboard
                    </Link>
                    <YnkLogo size="sm" />
                </div>

                <div className="text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Escolha seu Plano</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Ative seu agente de IA no WhatsApp com nossos planos acessíveis.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`
                relative p-6 sm:p-8 rounded-2xl transition-all duration-300 glass-ocean
                ${plan.popular ? 'border-primary/30 shadow-ocean' : 'hover:border-primary/20'}
              `}
                        >
                            {plan.popular && (
                                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary text-white text-xs font-bold rounded-b-lg">
                                    Recomendado
                                </div>
                            )}

                            <div className="mb-4 pt-2">
                                <div className="flex items-center gap-2 mb-2">
                                    {plan.type === "setup" ? (
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    ) : (
                                        <Zap className="w-5 h-5 text-primary" />
                                    )}
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                        {plan.type === "setup" ? "Pagamento Único" : "Recorrente"}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>

                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-foreground">R$ {plan.price}</span>
                                <span className="text-muted-foreground">,00 {plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-primary flex-shrink-0" /> {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full ${plan.popular ? 'bg-gradient-primary hover:opacity-90 text-white shadow-ocean' : 'bg-secondary hover:bg-secondary/80'}`}
                                onClick={() => handleSubscribe(plan.id)}
                                disabled={loading === plan.id}
                                size="lg"
                            >
                                {loading === plan.id ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                {loading === plan.id ? "Processando..." : "Contratar"}
                            </Button>
                        </div>
                    ))}
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    Total para começar: R$ 160,00 (setup + primeiro mês)
                </p>
            </div>
        </div>
    );
};

export default Subscription;
