/**
 * This small util file is to help with cursors for pagination in our API.
 *
 * We convert an object to a string which is sent back to client as a cursor and
 * the client return us this cursor to paginate the results. We use this cursor
 * and form the next request based on the data stored in the cursor, mainly
 * the `LastEvaluatedKey` and `ExclusiveStartKey`.
 *
 */
/**
 * Encode an Object to a JSON String and then to a Base64 string.
 *
 * @param obj Object to be encoded as a Base64 string.
 * @returns Encoded Base64 string from `obj`.
 */
export const encodeObjToStr = (obj: Record<string, unknown>): string => {
  const objStr = JSON.stringify(obj);
  const objB64 = Buffer.from(objStr).toString('base64');
  return objB64;
};

/**
 * Decode a Base64 string to a JSON String and then to a JSON object.
 *
 * @param encodedStr Object encoded as string with Base64
 * @returns Decoded Object from `encodedStr`.
 * @returns undefined if the `encodedStr` is invalid/malformed.
 */
export const decodeStrToObj = (
  encodedStr: string
): Record<string, unknown> | undefined => {
  try {
    const decodedStr = Buffer.from(encodedStr, 'base64').toString();
    const decodedObj = JSON.parse(decodedStr);
    return decodedObj;
  } catch {
    return undefined;
  }
};
