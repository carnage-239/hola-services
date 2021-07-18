// Keep all your Tests in this directory

import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import * as handler from '../handler';

test('hello', async () => {
  let event: APIGatewayEvent;
  let context: Context;
  const callback: Callback = (_error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
  };

  await handler.hello(event, context, callback);
});
