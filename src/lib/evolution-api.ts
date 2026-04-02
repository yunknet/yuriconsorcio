// Evolution API Service - Mock/Skeleton
// Replace EVOLUTION_API_URL and EVOLUTION_API_KEY with real values in .env

const EVOLUTION_API_URL = import.meta.env.VITE_EVOLUTION_API_URL || "https://evolution-api.example.com";
const EVOLUTION_API_KEY = import.meta.env.VITE_EVOLUTION_API_KEY || "mock-api-key";

export type ConnectionStatus = "disconnected" | "waiting_qr" | "connecting" | "connected";

export interface WhatsAppInstance {
    id: string;
    user_id: string;
    instance_name: string;
    connection_status: ConnectionStatus;
    qr_code?: string;
    phone_number?: string;
    created_at?: string;
}

/**
 * Cria uma instância na Evolution API
 * POST /instance/create
 */
export async function createInstance(userId: string, instanceName: string): Promise<{ success: boolean; instance?: any; error?: string }> {
    try {
        // MOCK: Em produção, faria o fetch real
        // const response = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "apikey": EVOLUTION_API_KEY,
        //   },
        //   body: JSON.stringify({
        //     instanceName: instanceName,
        //     qrcode: true,
        //     integration: "WHATSAPP-BAILEYS",
        //   }),
        // });
        // const data = await response.json();

        // Simulação de resposta
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            success: true,
            instance: {
                instanceName: instanceName,
                instanceId: `inst_${userId}_${Date.now()}`,
                status: "created",
            },
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Gera QR Code para conexão
 * GET /instance/connect/{instanceName}
 */
export async function generateQRCode(instanceName: string): Promise<{ success: boolean; qrcode?: string; error?: string }> {
    try {
        // MOCK: Em produção, faria o fetch real
        // const response = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
        //   method: "GET",
        //   headers: {
        //     "apikey": EVOLUTION_API_KEY,
        //   },
        // });
        // const data = await response.json();
        // return { success: true, qrcode: data.base64 };

        // Simulação - gera um QR Code SVG mock em base64
        await new Promise(resolve => setTimeout(resolve, 1000));

        // QR Code mock (um SVG simples como placeholder)
        const mockQRSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <rect width="200" height="200" fill="white"/>
      <g fill="#1a1a2e">
        ${generateMockQRPattern()}
      </g>
    </svg>`;

        const base64 = btoa(mockQRSvg);
        return { success: true, qrcode: `data:image/svg+xml;base64,${base64}` };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Verifica o status de conexão da instância
 * GET /instance/connectionState/{instanceName}
 */
export async function checkConnectionStatus(instanceName: string): Promise<{ success: boolean; status?: ConnectionStatus; error?: string }> {
    try {
        // MOCK: Em produção, faria o fetch real
        // const response = await fetch(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, {
        //   method: "GET",
        //   headers: {
        //     "apikey": EVOLUTION_API_KEY,
        //   },
        // });
        // const data = await response.json();
        // return { success: true, status: data.instance?.state || "disconnected" };

        await new Promise(resolve => setTimeout(resolve, 500));

        // Simulação: alterna entre estados para demo
        const states: ConnectionStatus[] = ["waiting_qr", "connecting", "connected"];
        const randomState = states[Math.floor(Math.random() * states.length)];

        return { success: true, status: randomState };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Desconecta a instância
 * DELETE /instance/logout/{instanceName}
 */
export async function disconnectInstance(instanceName: string): Promise<{ success: boolean; error?: string }> {
    try {
        // MOCK: Em produção, faria o fetch real
        // const response = await fetch(`${EVOLUTION_API_URL}/instance/logout/${instanceName}`, {
        //   method: "DELETE",
        //   headers: {
        //     "apikey": EVOLUTION_API_KEY,
        //   },
        // });

        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Deleta a instância completamente
 * DELETE /instance/delete/{instanceName}
 */
export async function deleteInstance(instanceName: string): Promise<{ success: boolean; error?: string }> {
    try {
        // MOCK
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Helper: gera um padrão visual que parece QR code (para mock)
function generateMockQRPattern(): string {
    const rects: string[] = [];
    const size = 8;
    const padding = 20;
    const gridSize = 20;

    // Finder patterns (cantos)
    const finderPositions = [
        { x: padding, y: padding },
        { x: padding + (gridSize - 7) * size, y: padding },
        { x: padding, y: padding + (gridSize - 7) * size },
    ];

    finderPositions.forEach(({ x, y }) => {
        // Outer border
        rects.push(`<rect x="${x}" y="${y}" width="${7 * size}" height="${7 * size}"/>`);
        rects.push(`<rect x="${x + size}" y="${y + size}" width="${5 * size}" height="${5 * size}" fill="white"/>`);
        rects.push(`<rect x="${x + 2 * size}" y="${y + 2 * size}" width="${3 * size}" height="${3 * size}"/>`);
    });

    // Random data pattern
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            // Skip finder pattern areas
            if ((row < 8 && col < 8) || (row < 8 && col > gridSize - 9) || (row > gridSize - 9 && col < 8)) continue;

            if (Math.random() > 0.5) {
                rects.push(`<rect x="${padding + col * size}" y="${padding + row * size}" width="${size}" height="${size}"/>`);
            }
        }
    }

    return rects.join("\n");
}
