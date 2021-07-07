import Multipart from 'lambda-multipart';

/**
 * @param event AWS lambda event object.
 * @returns { fileds , files } `files` are the files from form-data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseMultipartFormData = async (event): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Parse the AWS event object to get the form data files.
    const parser = new Multipart(event);

    parser.on('finish', (result) => {
      resolve({ fields: result.fields, files: result.files });
    });

    // Parsing failed.
    parser.on('error', (error) => {
      reject(new Error(error));
    });
  });
};

export default parseMultipartFormData;
