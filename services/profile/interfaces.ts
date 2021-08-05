export interface ICreateUserProfileBody {
  name: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  password: string;
  user_type: 'guide' | 'tourist' | 'admin';
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
  user_type?: string;
}

export interface IUserItem {
  ID: string;
  name: string;
  email: string;
  user_type: 'guide' | 'tourist' | 'admin';
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
  verified?: boolean;
}

export interface ILoginBody {
  mobileNumber?: string;
  email?: string;
  password: string;
}

export interface IRefreshTokenBody {
  refresh_token: string;
}
