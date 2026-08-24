export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { validateServerSecurityEnv } = await import(
    "./features/common/security/ServerSecurityConstants"
  );
  validateServerSecurityEnv();
}
