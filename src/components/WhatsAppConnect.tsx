import { useState, useEffect, useCallback } from "react";
import {
    Smartphone,
    QrCode,
    Wifi,
    WifiOff,
    Loader2,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Unplug
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    createInstance,
    generateQRCode,
    checkConnectionStatus,
    disconnectInstance,
    type ConnectionStatus,
} from "@/lib/evolution-api";

interface WhatsAppConnectProps {
    userId: string;
    instanceName?: string;
    initialStatus?: ConnectionStatus;
    onStatusChange?: (status: ConnectionStatus) => void;
}

const statusConfig: Record<ConnectionStatus, { label: string; color: string; icon: any; bgColor: string }> = {
    disconnected: {
        label: "Desconectado",
        color: "text-red-400",
        icon: WifiOff,
        bgColor: "bg-red-500/10 border-red-500/20",
    },
    waiting_qr: {
        label: "Aguardando QR Code",
        color: "text-amber-400",
        icon: QrCode,
        bgColor: "bg-amber-500/10 border-amber-500/20",
    },
    connecting: {
        label: "Conectando...",
        color: "text-blue-400",
        icon: Loader2,
        bgColor: "bg-blue-500/10 border-blue-500/20",
    },
    connected: {
        label: "Conectado",
        color: "text-emerald-400",
        icon: CheckCircle2,
        bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
};

export const WhatsAppConnect = ({
    userId,
    instanceName: initialInstanceName,
    initialStatus = "disconnected",
    onStatusChange
}: WhatsAppConnectProps) => {
    const [status, setStatus] = useState<ConnectionStatus>(initialStatus);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [instanceName, setInstanceName] = useState(initialInstanceName || "");
    const [qrExpiry, setQrExpiry] = useState(40);

    const updateStatus = useCallback((newStatus: ConnectionStatus) => {
        setStatus(newStatus);
        onStatusChange?.(newStatus);
    }, [onStatusChange]);

    // QR Code expiry countdown
    useEffect(() => {
        if (status !== "waiting_qr" || !qrCode) return;

        const timer = setInterval(() => {
            setQrExpiry((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [status, qrCode]);

    // Simula polling de status quando aguardando
    useEffect(() => {
        if (status !== "waiting_qr" && status !== "connecting") return;

        const pollInterval = setInterval(async () => {
            if (!instanceName) return;

            const result = await checkConnectionStatus(instanceName);
            if (result.success && result.status === "connected") {
                updateStatus("connected");
                setQrCode(null);
                toast.success("WhatsApp conectado com sucesso!");
                clearInterval(pollInterval);
            }
        }, 5000);

        return () => clearInterval(pollInterval);
    }, [status, instanceName, updateStatus]);

    const handleConnect = async () => {
        setIsLoading(true);
        try {
            const name = `ynk_${userId}_${Date.now()}`;
            setInstanceName(name);

            // 1. Criar instância
            const createResult = await createInstance(userId, name);
            if (!createResult.success) {
                throw new Error(createResult.error || "Erro ao criar instância");
            }

            updateStatus("waiting_qr");

            // 2. Gerar QR Code
            const qrResult = await generateQRCode(name);
            if (!qrResult.success || !qrResult.qrcode) {
                throw new Error(qrResult.error || "Erro ao gerar QR Code");
            }

            setQrCode(qrResult.qrcode);
            setQrExpiry(40);
            toast.info("Escaneie o QR Code com seu WhatsApp!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao conectar WhatsApp");
            updateStatus("disconnected");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefreshQR = async () => {
        if (!instanceName) return;
        setIsLoading(true);
        try {
            const qrResult = await generateQRCode(instanceName);
            if (qrResult.success && qrResult.qrcode) {
                setQrCode(qrResult.qrcode);
                setQrExpiry(40);
                toast.info("QR Code atualizado!");
            }
        } catch (error: any) {
            toast.error("Erro ao atualizar QR Code");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisconnect = async () => {
        if (!instanceName) return;
        setIsLoading(true);
        try {
            await disconnectInstance(instanceName);
            updateStatus("disconnected");
            setQrCode(null);
            setInstanceName("");
            toast.success("WhatsApp desconectado");
        } catch (error: any) {
            toast.error("Erro ao desconectar");
        } finally {
            setIsLoading(false);
        }
    };

    // Simula conexão bem-sucedida após 10s para demo
    const handleSimulateConnect = () => {
        updateStatus("connecting");
        setTimeout(() => {
            updateStatus("connected");
            setQrCode(null);
            toast.success("WhatsApp conectado com sucesso! (simulação)");
        }, 2000);
    };

    const currentConfig = statusConfig[status];
    const StatusIcon = currentConfig.icon;

    return (
        <div className="space-y-6">
            {/* Status Card */}
            <div className={`rounded-xl border p-5 transition-all duration-300 ${currentConfig.bgColor}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-background/50`}>
                            <StatusIcon className={`w-5 h-5 ${currentConfig.color} ${status === "connecting" ? "animate-spin" : ""}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Status da Conexão</p>
                            <p className={`font-semibold ${currentConfig.color}`}>{currentConfig.label}</p>
                        </div>
                    </div>

                    {status === "connected" && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDisconnect}
                            disabled={isLoading}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Unplug className="w-4 h-4 mr-2" />}
                            Desconectar
                        </Button>
                    )}
                </div>
            </div>

            {/* Main Action Area */}
            {status === "disconnected" && (
                <div className="rounded-xl border border-border bg-card/50 p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-ocean animate-float">
                        <Smartphone className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Conectar WhatsApp</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                        Conecte seu número de WhatsApp para ativar o agente de IA. Um QR Code será gerado para você escanear.
                    </p>
                    <Button
                        size="lg"
                        onClick={handleConnect}
                        disabled={isLoading}
                        className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 shadow-ocean"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Gerando QR Code...
                            </>
                        ) : (
                            <>
                                <QrCode className="w-5 h-5 mr-2" />
                                Conectar WhatsApp
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* QR Code Display */}
            {status === "waiting_qr" && qrCode && (
                <div className="rounded-xl border border-border bg-card/50 p-8 flex flex-col items-center text-center">
                    <h3 className="text-lg font-bold text-foreground mb-1">Escaneie o QR Code</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Abra o WhatsApp no seu celular → Dispositivos Conectados → Conectar Dispositivo
                    </p>

                    {/* QR Code Container */}
                    <div className="relative mb-6">
                        <div className="w-64 h-64 rounded-2xl bg-white p-4 shadow-ocean relative overflow-hidden">
                            <img
                                src={qrCode}
                                alt="QR Code WhatsApp"
                                className="w-full h-full object-contain"
                            />
                            {qrExpiry === 0 && (
                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-2xl">
                                    <XCircle className="w-8 h-8 text-red-400 mb-2" />
                                    <p className="text-white text-sm font-medium">QR Code expirado</p>
                                </div>
                            )}
                        </div>

                        {/* Timer Ring */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-card border border-border flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${qrExpiry > 10 ? "bg-emerald-400" : qrExpiry > 0 ? "bg-amber-400 animate-pulse" : "bg-red-400"}`} />
                            <span className="text-xs font-medium text-muted-foreground">
                                {qrExpiry > 0 ? `${qrExpiry}s` : "Expirado"}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleRefreshQR}
                            disabled={isLoading}
                            className="gap-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                            Atualizar QR Code
                        </Button>

                        {/* Botão de simulação para demo */}
                        <Button
                            variant="outline"
                            onClick={handleSimulateConnect}
                            className="gap-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Simular Conexão
                        </Button>
                    </div>
                </div>
            )}

            {/* Connected State */}
            {status === "connected" && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                        <Wifi className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp Conectado!</h3>
                    <p className="text-muted-foreground max-w-md mb-4">
                        Seu agente de IA está ativo e pronto para atender no WhatsApp.
                    </p>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium text-emerald-400">Online</span>
                    </div>
                </div>
            )}

            {/* Connecting State */}
            {status === "connecting" && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-8 flex flex-col items-center text-center">
                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-1">Conectando...</h3>
                    <p className="text-sm text-muted-foreground">
                        Aguarde enquanto estabelecemos a conexão com seu WhatsApp.
                    </p>
                </div>
            )}
        </div>
    );
};
