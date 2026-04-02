import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Settings,
  LogOut,
  Menu,
  X,
  User,
  CreditCard,
  Smartphone,
  Check,
  Loader2,
  Bot,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import YnkLogo from "@/components/YnkLogo";
import { WhatsAppConnect } from "@/components/WhatsAppConnect";
import type { ConnectionStatus } from "@/lib/evolution-api";

const menuItems = [
  { icon: Bot, label: "Agente IA", id: "agent" },
  { icon: Smartphone, label: "WhatsApp", id: "whatsapp" },
  { icon: CreditCard, label: "Assinatura", id: "subscription" },
  { icon: Settings, label: "Configurações", id: "settings" },
];

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

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("agent");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Agent State
  const [systemPrompt, setSystemPrompt] = useState("Você é um assistente prestativo. Seja sempre educado e claro.");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);

  // User Profile state
  const [userProfile, setUserProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  // Subscription State
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscriptionCreatedAt, setSubscriptionCreatedAt] = useState<string | null>(null);

  // WhatsApp Instance State
  const [whatsappStatus, setWhatsappStatus] = useState<ConnectionStatus>("disconnected");

  // Editing state
  const [phone, setPhone] = useState("");
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Name Editing State
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        const meta = user.user_metadata || {};
        const email = user.email || "";

        // 1. Fetch Profile
        let { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        const googleName = meta.full_name || meta.name || "";
        let googleFirstName = "";
        let googleLastName = "";

        if (googleName) {
          const parts = googleName.split(" ");
          googleFirstName = parts[0];
          googleLastName = parts.slice(1).join(" ");
        }

        // SELF-HEALING: Create or Update Profile
        if (!profile) {
          const newProfile = {
            id: user.id,
            email: email,
            phone_number: meta.phone || "",
            first_name: meta.first_name || googleFirstName || "",
            last_name: meta.last_name || googleLastName || "",
            access_status: 'NEW',
            payment_status: 'NONE',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const { error: insertError } = await supabase
            .from('profiles')
            .insert(newProfile);

          if (!insertError) {
            profile = newProfile;
          }
        } else if (!profile.first_name && (googleFirstName || meta.first_name)) {
          const updates = {
            first_name: meta.first_name || googleFirstName,
            last_name: meta.last_name || googleLastName,
            updated_at: new Date().toISOString()
          };

          await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id);

          profile.first_name = updates.first_name;
          profile.last_name = updates.last_name;
        }

        // Update State
        if (profile) {
          setUserProfile({
            firstName: profile.first_name || "Usuário",
            lastName: profile.last_name || "",
            email: email,
          });
          setTempFirstName(profile.first_name || "");
          setTempLastName(profile.last_name || "");

          if (profile.phone_number) {
            setPhone(profile.phone_number);
          } else if (meta.phone) {
            setPhone(meta.phone);
          }
        } else {
          setUserProfile({
            firstName: meta.first_name || googleFirstName || "Usuário",
            lastName: meta.last_name || googleLastName || "",
            email: email,
          });
        }

        // 2. Fetch Subscription Status
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('subscription_status, created_at')
          .eq('email', email)
          .eq('subscription_status', 'active')
          .maybeSingle();

        setHasActiveSubscription(!!subData);
        if (subData?.created_at) {
          setSubscriptionCreatedAt(subData.created_at);
        }

        // 3. Fetch WhatsApp Instance status (mock)
        // In production, fetch from whatsapp_instances table
        // const { data: instanceData } = await supabase
        //   .from('whatsapp_instances')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .maybeSingle();
        // if (instanceData) setWhatsappStatus(instanceData.connection_status);

        // 4. Fetch Agent Configuration
        const { data: agentData } = await supabase
          .from('ai_agents')
          .select('system_prompt')
          .eq('user_id', user.id)
          .maybeSingle();

        if (agentData?.system_prompt) {
          setSystemPrompt(agentData.system_prompt);
        }

        // Check for plan param in URL
        const searchParams = new URLSearchParams(window.location.search);
        const plan = searchParams.get("plan");
        if (plan) {
          setActiveMenu("subscription");
        }

      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSavePrompt = async () => {
    setIsSavingPrompt(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('ai_agents')
        .upsert({
          user_id: user.id,
          system_prompt: systemPrompt,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) throw error;
      toast.success("Comportamento do Agente salvo com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao salvar agente: " + err.message);
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const handleSaveName = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: tempFirstName,
          last_name: tempLastName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setUserProfile(prev => prev ? ({ ...prev, firstName: tempFirstName, lastName: tempLastName }) : null);
      setIsEditingName(false);
      toast.success("Nome atualizado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao atualizar nome: " + err.message);
    }
  };

  const handleSavePhone = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Telefone atualizado com sucesso!");
      setIsEditingPhone(false);
    } catch (err: any) {
      toast.error("Erro ao atualizar telefone: " + err.message);
    }
  };

  const handleSubscribe = async (planId: string) => {
    setLoadingPlan(planId);
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
      setLoadingPlan(null);
    }
  };

  const fullName = userProfile ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : "Carregando...";
  const userInitials = userProfile?.firstName ? userProfile.firstName.substring(0, 2).toUpperCase() : "US";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Carregando seu painel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-card/50 border-r border-border flex flex-col
        transform transition-transform duration-200 ease-in-out backdrop-blur-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <YnkLogo size="md" />
          </Link>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveMenu(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeMenu === item.id
                    ? "bg-gradient-primary text-white shadow-ocean"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Menu Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-medium text-white">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{fullName}</p>
              <p className="text-xs text-muted-foreground truncate">{userProfile?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 sm:px-6 glass-ocean sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Olá, <span className="text-gradient-ocean">{userProfile?.firstName}</span>!
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* AI Agent Section */}
          {activeMenu === "agent" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground">Comportamento da IA</h2>
                <p className="text-muted-foreground">
                  Personalize como seu assistente virtual deve responder aos clientes no WhatsApp.
                </p>
              </div>

              {!hasActiveSubscription ? (
                <div className="p-12 border border-border rounded-2xl flex flex-col items-center justify-center text-center glass-ocean">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-ocean">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Assinatura Necessária</h3>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Para configurar e ativar o agente de IA, é necessário contratar um plano.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setActiveMenu("subscription")}
                    className="bg-gradient-primary hover:opacity-90 text-white shadow-ocean"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Ver Planos
                  </Button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl glass-ocean space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-foreground">System Prompt</label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Forneça o contexto, tom de voz, regras de negócios e como a IA deve se comportar ao atender o WhatsApp.
                      </p>
                      <textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        className="w-full h-48 sm:h-64 p-4 rounded-xl border border-border/50 bg-card/50 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Exemplo: Você é um assistente de vendas da YNK Sistemas. Seu objetivo é ajudar novos clientes a entender nossos planos e gerar interesse. Seja cordial, direto, e sempre use emojis amigáveis..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleSavePrompt}
                      disabled={isSavingPrompt}
                      className="bg-gradient-primary hover:opacity-90 text-white shadow-ocean px-8"
                    >
                      {isSavingPrompt ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                      {isSavingPrompt ? "Salvando..." : "Salvar Configuração"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* WhatsApp Section */}
          {activeMenu === "whatsapp" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground">Gerenciar WhatsApp</h2>
                <p className="text-muted-foreground">
                  Conecte e monitore seu número de WhatsApp para o agente de IA.
                </p>
              </div>

              {!hasActiveSubscription ? (
                <div className="p-12 border border-border rounded-2xl flex flex-col items-center justify-center text-center glass-ocean">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-ocean">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Assinatura Necessária</h3>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Para conectar seu WhatsApp e ativar o agente de IA, é necessário contratar um plano.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setActiveMenu("subscription")}
                    className="bg-gradient-primary hover:opacity-90 text-white shadow-ocean"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Ver Planos
                  </Button>
                </div>
              ) : (
                <WhatsAppConnect
                  userId={userProfile?.email || "demo-user"}
                  initialStatus={whatsappStatus}
                  onStatusChange={(status) => setWhatsappStatus(status)}
                />
              )}
            </div>
          )}

          {/* Subscription Section */}
          {activeMenu === "subscription" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground">Assinatura</h2>
                <p className="text-muted-foreground">Gerencie seu plano e pagamentos.</p>
              </div>

              {hasActiveSubscription && subscriptionCreatedAt && (
                <div className="w-full max-w-md bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col items-center text-center animate-fade-in mx-auto shadow-ocean">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold uppercase tracking-wider text-xs">Plano Ativo</span>
                  </div>
                  <div className="text-4xl font-black text-foreground mb-1">
                    R$ 60<span className="text-lg font-bold text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Seu agente de IA está ativo</p>
                </div>
              )}

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
                      <span className="text-3xl font-extrabold text-foreground">R$ {plan.price}</span>
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
                      disabled={loadingPlan === plan.id || hasActiveSubscription}
                      size="lg"
                    >
                      {loadingPlan === plan.id ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                      {loadingPlan === plan.id ? "Processando..." : hasActiveSubscription ? "Contratado ✓" : "Contratar"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeMenu === "settings" && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
                <p className="text-muted-foreground">Gerencie seus dados e preferências.</p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl glass-ocean space-y-6">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-foreground">Dados Pessoais</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-muted-foreground">Nome</label>
                      <div className="flex gap-2 items-start">
                        {isEditingName ? (
                          <div className="flex-1 flex gap-2">
                            <div className="space-y-1 flex-1">
                              <Input
                                placeholder="Nome"
                                value={tempFirstName}
                                onChange={(e) => setTempFirstName(e.target.value)}
                                className="bg-card/50 border-border/50"
                              />
                            </div>
                            <div className="space-y-1 flex-1">
                              <Input
                                placeholder="Sobrenome"
                                value={tempLastName}
                                onChange={(e) => setTempLastName(e.target.value)}
                                className="bg-card/50 border-border/50"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-secondary/50 rounded-lg text-foreground flex-1">
                            {fullName}
                          </div>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (isEditingName) {
                              handleSaveName();
                            } else {
                              setIsEditingName(true);
                            }
                          }}
                          className="border-border/50"
                        >
                          {isEditingName ? "Salvar" : "Alterar"}
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                      <div className="p-2.5 bg-secondary/50 rounded-lg text-foreground">
                        {userProfile?.email}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-muted-foreground">Telefone / WhatsApp</label>
                      <div className="flex gap-2">
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={!isEditingPhone}
                          className={`${!isEditingPhone ? "bg-secondary/50 border-none" : "bg-card/50 border-border/50"}`}
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (isEditingPhone) {
                              handleSavePhone();
                            } else {
                              setIsEditingPhone(true);
                            }
                          }}
                          className="border-border/50"
                        >
                          {isEditingPhone ? "Salvar" : "Alterar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl glass-ocean space-y-6">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-foreground">Plano Contratado</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {hasActiveSubscription ? "Plano Ativo" : "Sem Plano"}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${hasActiveSubscription
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground"
                          }`}>
                          {hasActiveSubscription ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {hasActiveSubscription ? "R$ 60,00/mês • Agente IA ativo" : "Contrate um plano para ativar o agente."}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setActiveMenu("subscription")}
                      className="border-border/50"
                    >
                      {hasActiveSubscription ? "Gerenciar" : "Ver Planos"}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
