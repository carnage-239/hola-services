import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

import db from '../libs/database';
import { decodeStrToObj, encodeObjToStr } from './b64';

interface IConfig extends DocumentClient.ScanInput {
  // ExclusiveStartKey encoded as a Base64 string
  next_token?: string;
}

interface IOutput<T> {
  // Items from the table
  Items: T[];

  // LastEvaluatedKey encoded as a Base64 string, which the client can send as
  // `next_token` to fetch next the Items from the table
  next_token: string;
}

/**
 * Fetch Items from DynamoDB table from beginning till end such as infinite
 * scrolling is done.
 *
 * @params config Configuration details to perform the scan operation to fetch
 * the Items.
 * @returns Array of Items with the `next_token` if more Items exist in the DB.
 * @returns false if something goes wrong, like DynamoDB action fails.
 */
export const fetchInfiniteScroll = async <T>(
  config: IConfig
): Promise<false | IOutput<T>> => {
  const limit = config.Limit || 25;
  let nextToken = null;
  let exclusiveStartKey = null;

  if (config.next_token) {
    exclusiveStartKey = decodeStrToObj(config.next_token);
    // The `next_token` provided in the `options` is malformed/invalid.
    if (!exclusiveStartKey) {
      return false;
    }
  }

  // delete config.next_token;
  const params = {
    TableName: config.TableName,
    Limit: limit,
    ExclusiveStartKey: exclusiveStartKey,
    ...config
  };

  try {
    const res = await db.scan(params);
    const Items = res.Items as unknown as T[];

    if (res.LastEvaluatedKey) {
      // For example, LastEvaluatedKey = { ID: "212cas-2ksdc" }
      // We encode it to Base64 string so that if the client provides us
      // with a `cursor` in the `options`, we can decode it back to the original
      // object and use it as the `ExclusiveStartKey` for that request.
      // We are doing this encoding and decoding so that the underlying specifications
      // are not leaked to the client. They should have a consistent interface.
      nextToken = encodeObjToStr(res.LastEvaluatedKey);
    }

    return {
      Items,
      next_token: nextToken
    };
  } catch {
    return false;
  }
};
