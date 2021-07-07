export interface ICreateUserProfileBody {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber: string;
}

export interface IAvatar {
  hash: null | string;
  small: null | string;
  medium: null | string;
  large: null | string;
}

export interface IUser {
  ID: string;
  email: string;
  username: string;
  countryCode: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  avatar: IAvatar;
}

export interface IUserItem {
  isActive: boolean;
  avatar: IAvatar;
  email: string;
  username?: string;
  password?: string;
  ID: string;
  mobileNumber?: string;
  jwtVersion: number;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  otp_expires_on?: number;
  firstName: string;
  lastName: string;
  otp?: string;
  countryCode?: string;
  password_reset_token?: string;
  googleOAuthID?: string;
}
