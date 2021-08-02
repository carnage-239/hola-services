import { IResponse } from '../../../common/interfaces/IResponse';
import { error } from '../../../common/utils/http-response';
import { IAddGuideToAttraction } from '../interfaces';
import * as schema from './schema-definition';

export const addGuideToAttractionSchemaValidator = async (
  data: IAddGuideToAttraction
): Promise<IResponse | true> => {
  try {
    await schema.addGuideToAttraction.validateAsync(data);
    return true;
  } catch (err) {
    return error(400, 30426, err.details[0].message);
  }
};
