import { get, post } from './rest';
import { AUTH_TOKEN_VAR } from './global-vars';

let tokenValidated = false;
let tokenValidatedResult: boolean = null;

export function signIn(username: string, password: string): Promise<SignInResponse> {
  return new Promise((resolve) => {
    post<SignInRequest, SignInResponse>(`${process.env.ADMIN_API}/admin-sign-in`, {
      username,
      password,
    }).then((response: SignInResponse) => {
      // todo: not sure this check should be here
      if (response.success) {
        localStorage.setItem(AUTH_TOKEN_VAR, response.data);
        tokenValidated = true;
        tokenValidatedResult = true;
      }
      resolve(response);
    });
  });
}

export function getBookings(): Promise<boolean> {
  return new Promise((resolve) => {
    if (tokenValidated) {
      resolve(tokenValidatedResult);
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_VAR);
    if (!token) {
      resolve(false);
      return;
    }

    get<GetBookingsRequest, GetBookingsResponse>(`${process.env.ADMIN_API}/get-bookings`, {
      token,
    }).then((response: GetBookingsResponse) => {
      // todo: use redux
      sessionStorage.bookings = JSON.stringify(response.data);

      resolve(response.success);
    });
  });
}
