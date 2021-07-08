export type IStage = 'dev' | 'prod';

/**
 * @example Client's prod base URL is `https://www.indywise.com`
 * @return base URL of our front end (client) HTTP url.
 */
export const getClientBaseUrl = (STAGE: IStage): string => {
  let baseUrl: string;

  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3002/#';
  } else if (STAGE === 'dev') {
    baseUrl = 'https://dev-app.indywise.com/latest/web/index.html#';
  } else if (STAGE === 'prod') {
    baseUrl = 'https://www.indywise.com';
  }

  return baseUrl;
};
