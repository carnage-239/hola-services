// export all secrets from here as lambda cannot access env vars
// NOTE(Shikhar): Lambda functions cannot fetch env variable values from .env file
// unless this file is present inside a directory where `serverless.yml` exist.
// So, as this is a seperate file and don't exist in a `services/*` folder, we
// cannot use .env variables. Although the code is private, I don't know if this
// is safe or not.
export const REFRESH_TOKEN_SECRET =
  '6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQeTh';
export const ACCESS_TOKEN_SECRET =
  '$C&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq';
export const ADMIN_REFRESH_TOKEN_SECRET =
  '6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWmZZr4u7x!A%D*G-JaNdRgUkXp2s5v8$C&F)J@NcRfUjXnVkYp3s6v9y$B?E(H+MbQeTh';
export const ADMIN_ACCESS_TOKEN_SECRET =
  '$C&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWv8y/B?E(H+MbQeThWmZqnZr4u7x!A%D*G-KaPdSgVkXp2s5';
export const BUSINESS_ACCOUNT_ACCESS_TOKEN_SECRET =
  '6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E(y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZTjWv8y/B?E(H+MbQeThWmZqnZr4u7x!A%D*';
export const BUSINESS_ACCOUNT_REFRESH_TOKEN_SECRET =
  'q4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZ/B?E(H+MbQeThWmZZr4u7x!A%D*G-JaNdRgUkXp2a(s';
export const SIMPLYBOOK_COMPANY_LOGIN_PROD = 'indywise';
export const SIMPLYBOOK_COMPANY_LOGIN_DEV = 'indywisesandbox1';
export const SIMPLYBOOK_API_KEY_PROD =
  '59f5de1f5b2e0943f580ad93c15013228b4454c0397a7988cdaecd2946757f19';
export const SIMPLYBOOK_API_KEY_DEV =
  '73589ea1a83247782ecfc6d47144abe58c5837f0099723453d8f85cc329c9b41';
export const SIMPLYBOOK_USERNAME_PROD = 'simplybook.admin@indywise.com';
export const SIMPLYBOOK_PASSWORD_PROD = '$mx5fx^8XBH#wiJ';
export const SIMPLYBOOK_USERNAME_DEV = 'simplybook.admin@indywise.com';
export const SIMPLYBOOK_PASSWORD_DEV = '$mx5fx^8XBH#wiJ';
