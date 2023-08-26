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
  bookingTime: Date,
  visitTime: Date,
};

type AdminData = {
  username: string,
  sportObject: SportObjectVM,
  bookings: AdminBooking[],
};

type AdminSignInResult = AdminData & {
  token: string,
};

type EventResult<T> = {
  success: boolean,
  errors?: string[],
  data?: T,
};

type SignInRequest = {
  username: string,
  password: string,
};

type SignInResponse = EventResult<AdminSignInResult>;

type GetBookingsRequest = {
  token: string,
};

type GetBookingsResponse = EventResult<AdminData>;
