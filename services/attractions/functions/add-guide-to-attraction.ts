import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import {
  IAddGuideToAttraction,
  ICreateAttraction,
  ICreateAttractionRaw,
  ILocation
} from '../interfaces';
import {
  fetchAttraction as fetchAttractionFromDb,
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

  const attraction: ICreateAttractionRaw = await fetchAttractionFromDb(
    data.name
  );
  const listOfGuides = attraction.guides;
  const newGuides = data.guides;
  let updatedListOfGuides = listOfGuides.concat(newGuides);

  updatedListOfGuides = updatedListOfGuides.filter((item, index) => {
    return updatedListOfGuides.indexOf(item) == index;
  });

  const location: ILocation = data.coordinates;

  const updatedAttraction: ICreateAttractionRaw = {
    guides: updatedListOfGuides,
    ...attraction
  };
  const updatedGuidesAtAttraction = await updateAttractionInDB(
    updatedAttraction
  );
  if (updatedGuidesAtAttraction === false) {
    return error(400, '_', 'dfdnfdk');
  }

  return response(201, { added_guides: true });
};

export default addGuideToLocation;
