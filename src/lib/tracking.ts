/**
 * Utilitário de rastreamento de UTMs e Taxa de Cliques (CTR)
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  src?: string;
  sck?: string;
  fbclid?: string;
  gclid?: string;
}

const UTM_STORAGE_KEY = "yuri_utm_params";
const VIEWS_STORAGE_KEY = "yuri_page_views";
const CLICKS_STORAGE_KEY = "yuri_whatsapp_clicks";

/**
 * Captura os parâmetros UTM da URL e salva no armazenamento local para não perder
 */
export function initUTMTracking(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys: (keyof UTMParams)[] = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "src",
      "sck",
      "fbclid",
      "gclid",
    ];

    const currentParams: UTMParams = {};
    let hasUtm = false;

    utmKeys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        currentParams[key] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(currentParams));
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(currentParams));
      return currentParams;
    }

    // Se não tiver na URL atual, tenta recuperar da sessão anterior
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Silencioso
  }

  return {};
}

/**
 * Registra a visualização da página para cálculo da taxa de cliques
 */
export function trackPageView() {
  if (typeof window === "undefined") return;
  try {
    // Incrementa na sessão atual
    const views = parseInt(localStorage.getItem(VIEWS_STORAGE_KEY) || "0", 10) + 1;
    localStorage.setItem(VIEWS_STORAGE_KEY, views.toString());
  } catch {}
}

/**
 * Registra o clique no botão do WhatsApp e dispara eventos para Pixel / GA / Backend
 */
export function trackWhatsAppClick(buttonLocation: string = "simulador") {
  if (typeof window === "undefined") return;

  try {
    // 1. Incrementa contador local de cliques
    const clicks = parseInt(localStorage.getItem(CLICKS_STORAGE_KEY) || "0", 10) + 1;
    localStorage.setItem(CLICKS_STORAGE_KEY, clicks.toString());

    // 2. Dispara evento no Meta Pixel (se existir na página)
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Contact", {
        content_name: "WhatsApp Click",
        content_category: buttonLocation,
      });
    }

    // 3. Dispara evento no Google Analytics / GTM (se existir)
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "click_whatsapp", {
        event_category: "Conversion",
        event_label: buttonLocation,
      });
    }
    if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: "whatsapp_click",
        buttonLocation,
      });
    }
  } catch (e) {
    // Silencioso
  }
}

/**
 * Retorna as estatísticas de cliques e taxa de conversão (CTR)
 */
export function getClickStats() {
  if (typeof window === "undefined") return { views: 0, clicks: 0, ctr: "0%" };
  const views = parseInt(localStorage.getItem(VIEWS_STORAGE_KEY) || "0", 10);
  const clicks = parseInt(localStorage.getItem(CLICKS_STORAGE_KEY) || "0", 10);
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(2) + "%" : "0%";
  return { views, clicks, ctr };
}

/**
 * Retorna uma tag resumida das UTMs para anexar à mensagem do WhatsApp
 */
export function getUTMSummaryTag(): string {
  const utms = initUTMTracking();
  const parts: string[] = [];

  if (utms.utm_source) parts.push(`origem: ${utms.utm_source}`);
  if (utms.utm_campaign) parts.push(`campanha: ${utms.utm_campaign}`);
  if (utms.utm_medium) parts.push(`canal: ${utms.utm_medium}`);
  if (utms.utm_content) parts.push(`anúncio: ${utms.utm_content}`);

  if (parts.length > 0) {
    return `%0A%0A_${encodeURIComponent("[" + parts.join(" | ") + "]")}_`;
  }
  return "";
}
