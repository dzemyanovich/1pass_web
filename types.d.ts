// ************** API ****************

type LambdaResponse<T> = {
  success: boolean,
  errors?: string[],
  data?: T,
};

type SignInRequest = {
  username: string,
  password: string,
};

type AdminSignInResponse = LambdaResponse<{
  token: string,
  adminData: AdminData,
}>;

type TokenRequest = {
  token: string,
};

type AdminDataResponse = LambdaResponse<AdminData>;

type ConfirmVisitResponse = LambdaResponse<string>;

// ************** DB ****************

type UserVM = {
  id: string,
  phone: string,
  email: string,
  firstName: string,
  lastName: string,
};

type SportObjectVM = {
  id: number,
  name: string,
  address: string,
  lat: number,
  long: number,
};

type AdminBooking = {
  id: number,
  user: UserVM,
  bookingTime: string,
  visitTime: string,
};

type AdminData = {
  username: string,
  sportObject: SportObjectVM,
  bookings: AdminBooking[],
};

type ReduxState = {
  adminData: AdminData,
  loading: boolean,
};

type VisitTimePaylod = {
  visitTime: string,
  booking: AdminBooking,
};
