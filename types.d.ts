type UserVM = {
  id: string,
  phone: string,
  email: string,
  firstName: string,
  lastName: string,
};

type AdminBooking = {
  id: number,
  user: UserVM,
  bookingTime: Date,
  visitTime: Date,
};

type RestResponse<T> = {
  success: boolean,
  errors?: string[],
  data?: T,
};

type SignInRequest = {
  username: string,
  password: string,
};

type SignInResponse = RestResponse<string>;

type GetBookingsRequest = {
  token: string,
};

type GetBookingsResponse = RestResponse<AdminBooking[]>;
