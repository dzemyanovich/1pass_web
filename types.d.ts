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

type AdminDataVM = {
  username: string,
  sportObject: SportObjectVM,
  todayBookings: AdminBooking[],
  pastBookings: AdminBooking[],
};

type ReduxState = {
  adminData: AdminDataVM,
  loading: boolean,
};

type VisitTimePaylod = {
  visitTime: string,
  booking: AdminBooking,
};

// ************** React Components ****************

type ToastProps = {
  snackbarOpen: boolean,
  closeSnackbar: () => void,
  errors: string[],
};

type ConfirmVisitDialogProps = {
  loading: boolean,
  dialogOpen: boolean,
  closeDialog: () => void,
  booking: AdminBooking,
  confirmVisitRequest: (event: React.MouseEvent<HTMLElement>) => Promise<void>,
};

type LoadingButtonProps = {
  children: React.ReactNode,
  loading: boolean,
};
