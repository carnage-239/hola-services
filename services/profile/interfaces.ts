export interface ICreateUserProfileBody {
  name: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  password: string;
}

export interface IAvatar {
  hash: null | string;
  small: null | string;
  medium: null | string;
  large: null | string;
}

export interface IUser {
  ID: string;
  name: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  isActive: boolean;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  avatar: IAvatar;
}

export interface IUserItem {
  ID: string;
  name: string;
  email: string;
  mobileNumber?: string;
  countryCode?: string;
  password?: string;
  isActive: boolean;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  avatar: IAvatar;
  jwtVersion: number;
  otp_expires_on?: number;
  otp?: string;
  password_reset_token?: string;
  googleOAuthID?: string;
}
