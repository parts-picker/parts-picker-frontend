// display-safe subset of the session user; must never carry tokens
export interface PublicUser {
  id?: string;
  username?: string;
  email?: string;
}
