import { get, post } from './rest';
import { getAuthToken, setAuthToken } from './local-storage-manager';

export async function signIn(username: string, password: string): Promise<AdminSignInResponse> {
  const response: AdminSignInResponse = await post(`${process.env.ADMIN_API}/admin-sign-in`, {
    username,
    password,
  });

  if (response.success) {
    setAuthToken(response.data.token);
  }

  return response;
}

export async function getAdminData(): Promise<AdminDataResponse> {
  const token = getAuthToken();
  if (!token) {
    return {
      success: false,
    };
  }

  return get(`${process.env.ADMIN_API}/get-admin-data`, {
    token,
  });
}

export async function confirmVisit(bookingId: number): Promise<ConfirmVisitResponse> {
  const token = getAuthToken();

  // todo: delete that
  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(2000);
  // return {
  //   success: true,
  //   data: new Date().toString(),
  // };

  return post(`${process.env.ADMIN_API}/confirm-visit`, {
    token,
    bookingId,
  });
}
