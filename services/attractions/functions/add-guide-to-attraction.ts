import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { IAddGuideToAttraction, ICreateAttractionRaw } from '../interfaces';
import {
  fetchAttractionByID as fetchAttractionFromDb,
  updateAttraction as updateAttractionInDB
} from '../libs/database-access';
import { addGuideToAttractionSchemaValidator as validate } from '../libs/schema-validator';

const addGuideToLocation = async (
  data: IAddGuideToAttraction
): Promise<IResponse> => {
  //! pending, complete this
  const requestValid = await validate(data);
  if (requestValid !== true) {
    return error(400, '_', 'dfdnfdk');
  }

  let attraction = await fetchAttractionFromDb(data.locationID);
  if (attraction === false) {
    return error(500, '_', 'fsdjhjfhasjdf0');
  }
  if (attraction === null) {
    return error(500, '_', 'ksjhdakjfhdkjashfkjsdhafk');
  }
  attraction = attraction as ICreateAttractionRaw;
  console.log(attraction);
  const listOfGuides = attraction.guides;
  const newGuides = data.guides;
  console.log(newGuides);
  let updatedListOfGuides = listOfGuides.concat(newGuides);

  updatedListOfGuides = updatedListOfGuides.filter((item, index) => {
    return updatedListOfGuides.indexOf(item) == index;
  });
  console.log(updatedListOfGuides);

  attraction.guides = updatedListOfGuides;
  console.log(attraction);

  const updatedGuidesAtAttraction = await updateAttractionInDB(attraction);
  if (updatedGuidesAtAttraction === false) {
    return error(400, '_', 'dfdnfdk');
  }

  return response(201, { added_guides: true });
};

export default addGuideToLocation;
