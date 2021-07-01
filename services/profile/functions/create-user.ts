import path from 'path';
import { IResponse } from '../../../common/interfaces/IResponse';
import { response } from '../../../common/utils/http-response';

const createUser = async (): Promise<IResponse> => {
  return response(200, {});
};

export default createUser;
