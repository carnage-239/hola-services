import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { verifyAccount as VerifyAccountInDb } from '../libs/database-access';

const verifyAccount = async (
  ID: string,
  verify: boolean
): Promise<IResponse> => {
  const accountVerifyBoolUpdated = await VerifyAccountInDb(ID, verify);
  if (accountVerifyBoolUpdated === false) {
    return error(
      500,
      30500,
      'Database error while trying to change verify boolean of User'
    );
  }
  return response(200, { verified_updated: accountVerifyBoolUpdated });
};

export default verifyAccount;
