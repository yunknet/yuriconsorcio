import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Lock, MessageCircle } from "lucide-react";

export default function PlaybookLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCopyPassword = () => {
    navigator.clipboard.writeText("bookplay");
    toast({
      title: "Senha copiada!",
      description: "A senha foi copiada para a área de transferência.",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aqui faríamos a chamada para a API que criamos:
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("playbook_token", data.token);
        toast({
          title: "Acesso liberado!",
          description: "Bem-vindo ao Playbook do Yuri.",
        });
        navigate("/playbook");
      } else {
        toast({
          variant: "destructive",
          title: "Erro no acesso",
          description: data.error || "Verifique seus dados.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor. Você pode usar a simulação local.",
      });
      
      // Fallback para simulação local sem backend
      if (password === "bookplay" && email.includes("@")) {
        localStorage.setItem("playbook_token", "simulated_token");
        navigate("/playbook");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#04182b] font-inter text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#062a4d] via-[#04182b] to-[#04182b] z-0"></div>
      
      <div className="relative z-10 w-full max-w-[500px] flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#002b49] rounded-[14px] flex items-center justify-center shadow-lg border border-[#f5a623]/20">
              <span className="text-[#f5a623] font-serif text-3xl font-bold">Y</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            PLAYBOOK <span className="text-[#f5a623]">PRO</span> 👑
          </h1>
          <p className="text-[#bfcad1] text-sm md:text-base">
            Acesso liberado! Confira seus dados de login abaixo.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-[#062a4d]/50 border border-[#dbe2ea]/10 rounded-xl p-5 shadow-lg backdrop-blur-sm">
          <p className="text-sm text-[#bfcad1] leading-relaxed">
            📧 Seu <strong className="text-white">e-mail de login</strong> é o mesmo e-mail usado na compra do seu material. No momento em que o pagamento foi confirmado, <strong className="text-white">sua conta já foi ativada</strong>.
          </p>
        </div>

        {/* Password Box */}
        <div className="bg-[#062a4d]/30 border border-[#f5a623]/30 rounded-xl p-5 border-dashed relative overflow-hidden">
          <div className="absolute -left-2 -top-2 w-16 h-16 bg-[#f5a623]/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#f5a623] text-lg">🔑</span>
            <span className="text-[#f5a623] font-bold text-sm tracking-wider uppercase">Sua senha de acesso</span>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 bg-[#04182b] border border-[#062a4d] rounded-lg flex items-center justify-center py-3">
              <span className="font-bold text-xl tracking-wider text-white">bookplay</span>
            </div>
            <Button 
              onClick={handleCopyPassword}
              className="bg-gradient-to-r from-[#f5a623] to-[#e08a12] hover:opacity-90 text-[#04182b] font-bold border-0 h-auto px-6 rounded-lg flex gap-2 shadow-[0_4px_14px_rgba(245,166,35,0.3)] transition-all"
            >
              <Copy size={16} /> Copiar
            </Button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 mt-2">
          <div className="space-y-4">
            <Input 
              type="email" 
              placeholder="Seu e-mail de compra" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#04182b] border-[#062a4d] h-14 text-center text-lg placeholder:text-[#5a6b7d] focus-visible:ring-[#f5a623] focus-visible:ring-offset-[#04182b] text-white rounded-xl"
            />
            <Input 
              type="text" 
              placeholder="Cole ou digite sua senha" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#04182b] border-[#062a4d] h-14 text-center text-lg placeholder:text-[#5a6b7d] focus-visible:ring-[#f5a623] focus-visible:ring-offset-[#04182b] text-white rounded-xl"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#f5a623] to-[#e08a12] text-[#0d2238] rounded-xl hover:opacity-90 transition-all border-0 shadow-[0_6px_20px_rgba(224,138,18,0.4)] hover:shadow-[0_8px_25px_rgba(224,138,18,0.5)] uppercase tracking-wide mt-2"
          >
            {isLoading ? "Entrando..." : "Entrar →"}
          </Button>

          <Button 
            type="button" 
            onClick={() => window.open("https://wa.me/5538991118169", "_blank")}
            className="w-full h-14 text-base font-bold bg-[#25D366] text-white rounded-xl hover:bg-[#20bd5a] transition-all border-0 shadow-[0_4px_15px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="mr-2 h-5 w-5 fill-current" /> Não tenho a senha — falar com o SUPORTE
          </Button>
        </form>

        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 bg-[#062a4d]/40 border border-[#062a4d] px-4 py-3 rounded-lg text-xs text-[#bfcad1]">
            <Lock size={14} className="text-[#f5a623]" />
            <p>
              Para garantir a segurança e a individualidade do <br/>acesso ao seu material, sua conta é <strong className="text-[#f5a623]">monitorada por IP</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
