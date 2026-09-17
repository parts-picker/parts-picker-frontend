export const setBrowserCookie = (
  name: string,
  value: string,
  maxAgeSeconds: number
) => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
};
