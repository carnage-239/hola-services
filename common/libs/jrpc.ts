import axios, { AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';

import {
  SIMPLYBOOK_API_KEY_DEV,
  SIMPLYBOOK_API_KEY_PROD,
  SIMPLYBOOK_COMPANY_LOGIN_DEV,
  SIMPLYBOOK_COMPANY_LOGIN_PROD,
  SIMPLYBOOK_PASSWORD_DEV,
  SIMPLYBOOK_PASSWORD_PROD,
  SIMPLYBOOK_USERNAME_DEV,
  SIMPLYBOOK_USERNAME_PROD
} from '../config';

export interface IJsonRpcConfig {
  url: string;
  headers?: Record<string, unknown>;
}

class JsonRpc {
  private url: string;
  private headers: Record<string, unknown>;

  constructor(config: IJsonRpcConfig) {
    this.url = config.url;
    this.headers = config.headers;
  }

  /**
   * Make the HTTP request to the JSONRPC server.
   *
   * @param methodName Name of method.
   * @param params Parameters for the `methodName`.
   * @returns Response recieved from the JSONRPC server or return an error if
   * something is wrong.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(methodName: string, ...params: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: this.url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.headers
        },
        data: {
          id: uuid(),
          jsonrpc: '2.0',
          method: methodName,
          params
        }
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default JsonRpc;

const LOGIN_CLIENT_URL = 'https://user-api.simplybook.me/login';
const USER_CLIENT_URL = 'https://user-api.simplybook.me';
const ADMIN_CLIENT_URL = 'https://user-api.simplybook.me/admin';

const loginClient = new JsonRpc({
  url: LOGIN_CLIENT_URL
});

/**
 * Returns a JSONRPCClient to do `Company administration service` tasks with the
 * SimplyBook API.
 */
export const initAdminClient = async (STAGE: string) => {
  const USERNAME =
    STAGE === 'prod' ? SIMPLYBOOK_USERNAME_PROD : SIMPLYBOOK_USERNAME_DEV;
  const PASSWORD =
    STAGE === 'prod' ? SIMPLYBOOK_PASSWORD_PROD : SIMPLYBOOK_PASSWORD_DEV;
  const COMPANY_LOGIN =
    STAGE === 'prod'
      ? SIMPLYBOOK_COMPANY_LOGIN_PROD
      : SIMPLYBOOK_COMPANY_LOGIN_DEV;

  const resData = await loginClient.call(
    'getUserToken',
    COMPANY_LOGIN,
    USERNAME,
    PASSWORD
  );

  const TOKEN = resData.data.result;

  const adminClient = new JsonRpc({
    url: ADMIN_CLIENT_URL,
    headers: {
      'X-Company-Login': COMPANY_LOGIN,
      'X-User-Token': TOKEN
    }
  });

  return adminClient;
};

/**
 * Returns a JSONRPCClient to do `Company public service` tasks with the
 * SimplyBook API.
 */
export const initUserClient = async (STAGE: string) => {
  const COMPANY_LOGIN =
    STAGE === 'prod'
      ? SIMPLYBOOK_COMPANY_LOGIN_PROD
      : SIMPLYBOOK_COMPANY_LOGIN_DEV;
  const API_KEY =
    STAGE === 'prod' ? SIMPLYBOOK_API_KEY_PROD : SIMPLYBOOK_API_KEY_DEV;

  const resData = await loginClient.call('getToken', COMPANY_LOGIN, API_KEY);

  const TOKEN = resData.data.result;

  const userClient = new JsonRpc({
    url: USER_CLIENT_URL,
    headers: {
      'X-Company-Login': COMPANY_LOGIN,
      'X-Token': TOKEN
    }
  });

  return userClient;
};

/*
 *
 * ============= HOW TO USE THE JSONRPCCLient ==============
 *
 const callMe = async () => {
   const adminClient = await initAdminClient('dev');
   const userClient = await initUserClient('dev');
 
   const clientList = await adminClient.call(
     'getClientList',
     'shikhar2.sharma@indywise.com',
     null
   );
   console.info('CLIENT LIST DATA?', clientList.data);
 
   const services = await userClient.call('getEventList');
   console.info('SERVICES DATA?', services.data);
 };
 
 callMe();
 */
