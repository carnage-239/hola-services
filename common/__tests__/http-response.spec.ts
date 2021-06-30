import { error, response } from '../utils/http-response';

describe('Unit testing for create-response', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('response should be a Function', () => {
    expect(typeof response).toBe('function');
  });

  test('resopnse should return an Object', () => {
    const resBody = {
      success: true,
      message: 'This is a success response'
    };

    const returnedValue = response(200, resBody);
    expect(typeof returnedValue).toBe('object');
  });

  test('Object returned by response should have correct values', () => {
    const resBody = {
      success: true,
      message: 'This is a success response'
    };

    const resHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    };

    const returnedValue = response(200, resBody);
    expect(returnedValue.statusCode).toBe(200);
    expect(returnedValue.headers).toStrictEqual(resHeaders);
    expect(returnedValue.body).toBe(JSON.stringify(resBody));
  });

  test('Object returned by error should have correct values', () => {
    const resHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    };

    const returnedValue = error(400, 1001, 'This is an error message.');
    const body = JSON.parse(returnedValue.body);

    expect(returnedValue.statusCode).toBe(400);
    expect(returnedValue.headers).toStrictEqual(resHeaders);
    expect(body.error.code).toBe(1001);
    expect(body.error.message).toBe('This is an error message.');
  });
});
