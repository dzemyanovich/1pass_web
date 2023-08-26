import { get, post } from './rest';
import { AUTH_TOKEN_VAR } from './global-vars';

// todo: use async
export async function signIn(username: string, password: string): Promise<SignInResponse> {
  const response: SignInResponse = await post(`${process.env.ADMIN_API}/admin-sign-in`, {
    username,
    password,
  });
  if (response.success) {
    localStorage.setItem(AUTH_TOKEN_VAR, response.data);
  }
  return response;
}

export async function getAdminData(): Promise<GetBookingsResponse> {
  const token = localStorage.getItem(AUTH_TOKEN_VAR);
  if (!token) {
    return {
      success: false,
    };
  }

  // todo: change to get-admin-data
  return get(`${process.env.ADMIN_API}/get-bookings`, {
    token,
  });
}
