import { get, post } from './rest';
import { getAuthToken, setAuthToken } from './local-storage-manager';

export async function signIn(username: string, password: string): Promise<SignInResponse> {
  // todo: SignInResponse includes bookings and other admin data
  const response: SignInResponse = await post(`${process.env.ADMIN_API}/admin-sign-in`, {
    username,
    password,
  });
  if (response.success) {
    setAuthToken(response.data.token);
  }
  return response;
}

export async function getAdminData(): Promise<GetBookingsResponse> {
  const token = getAuthToken();
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
