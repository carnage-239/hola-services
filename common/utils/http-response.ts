import { IResponse } from "../interfaces/IResponse";

const responseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  // Required for cookies, authorization headers with HTTPS
  "Access-Control-Allow-Credentials": true,
};

export const response = (
  statusCode: number,
  data: Record<string, unknown>
): IResponse => {
  return {
    statusCode: statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data),
  };
};

export const error = (
  statusCode: number,
  errorCode: number | "_",
  errorMessage: string
): IResponse => {
  const data = {
    error: {
      code: errorCode,
      message: errorMessage,
      status: statusCode,
      more_info:
        "https://github.com/IndyWise/services/blob/development/docs/errors/errors.md",
    },
  };

  return {
    statusCode: statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data),
  };
};

/**
 * This function returns the same type of 401 HTTP response as the API gateway
 * does while running the Lambda Authorizer when it finds a valid but expired
 * token.
 *
 * This response makes all the tokenExpired errors looks the same whether its
 * coming from the API(like this one) or coming from the API gateway. This helps
 * the client to not have to worry about two different types of errors for same
 * issue(token is valid but expired) and the client can refresh the token and
 * send that request with the new token.
 */
export const tokenExpired = (): IResponse => {
  const data = {
    message: "Unauthorized",
  };

  return {
    statusCode: 401,
    headers: responseHeaders,
    body: JSON.stringify(data),
  };
};

/**
 * When client tries to make a request on protected resource and we find out
 * that the JWT Access Token provided in the headers is invalid, we want to
 * return 403 response. Client can logout the user if a 403 reponse is recived.
 */
export const tokenInvalid = (): IResponse => {
  const data = {
    message: "Invalid token provided in the authorization header",
  };

  return {
    statusCode: 403,
    headers: responseHeaders,
    body: JSON.stringify(data),
  };
};
