import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          'Go Serverless (Typescript)! Your function executed successfully!',
        input: event
      },
      null,
      2
    )
  };
};
