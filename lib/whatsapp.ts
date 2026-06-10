// Número oficial de WhatsApp da DevStarter (somente dígitos, com DDI)
export const WHATSAPP_NUMBER = "5514998469800";

export const WHATSAPP_DISPLAY = "(14) 99846-9800";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
