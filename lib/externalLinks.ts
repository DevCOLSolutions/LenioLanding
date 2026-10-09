export const externalLinks = {
  centroAyuda: "https://help.uselenio.com",
  documentacion: "https://docs.uselenio.com",
  "politica-privacidad": "https://policies.ceti.team/privacy",
  "terminos-condiciones": "https://policies.ceti.team/terms",
  "libro-reclamos": "https://policies.ceti.team/reclamos",
  app: "https://app.uselenio.com",
  contacto: "https://uselenio.com/contacto",
};

export function withUtm(url: string, medium: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set("utm_source", "landing");
  parsed.searchParams.set("utm_medium", medium);
  parsed.searchParams.set("utm_campaign", "signup");
  return parsed.toString();
}