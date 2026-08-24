export interface SessionData {
  user?: {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
    accessToken: string;
    accessExpiresAfter: string | undefined;
    refreshToken: string | undefined;
    refreshExpiresAfter: string | undefined;
  };
  flowInfo?: {
    codeVerifier: string;
    state: string;
    nonce: string;
    redirectTo: string;
  };
}
