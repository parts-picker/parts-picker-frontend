// links are stored in route segments and cookies as base64url: no +, / or = that would
// need url encoding or split a path segment

export const encodeLinkBase64Url = (href: string): string =>
  btoa(href)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/={1,2}$/, "");

export const decodeLinkBase64Url = (
  encoded: string | undefined
): string | undefined => {
  if (!encoded) {
    return undefined;
  }

  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  try {
    return atob(padded);
  } catch {
    return undefined;
  }
};
