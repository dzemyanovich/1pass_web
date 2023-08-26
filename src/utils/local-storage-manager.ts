import { AUTH_TOKEN_VAR } from './global-vars';

export function getAuthToken(): string {
  return localStorage.getItem(AUTH_TOKEN_VAR);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_VAR, token);
}

export function removeAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_VAR);
}
