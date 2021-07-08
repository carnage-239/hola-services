import {
  DeleteItemInput,
  GetItemInput,
  PutItemInput,
  UpdateItemInput
} from 'aws-sdk/clients/dynamodb';

import dbInstance from '../libs/database';

describe('Unit testing for database-lib', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('dbInstance must be an object', () => {
    expect(typeof dbInstance).toBe('object');
  });

  test('dbInstance must have create, read, update, delete functions', () => {
    expect(typeof dbInstance.put).toBe('function');
    expect(typeof dbInstance.get).toBe('function');
    expect(typeof dbInstance.update).toBe('function');
    expect(typeof dbInstance.delete).toBe('function');
  });

  test('dbInstance.put must return a promise', () => {
    const params: PutItemInput = {
      TableName: 'table',
      Item: {}
    };

    const response = dbInstance.put(params);

    // All promise object must have then() and catch() property
    expect(response.then().catch((err) => err)).toBeDefined();
  });

  test('dbInstance.get must return a promise', () => {
    const params: GetItemInput = {
      TableName: 'table',
      Key: {}
    };

    const response = dbInstance.get(params);

    expect(response.then().catch((err) => err)).toBeDefined();
  });

  test('dbInstance.update must return a promise', () => {
    const params: UpdateItemInput = {
      TableName: 'table',
      Key: {}
    };

    const response = dbInstance.update(params);

    expect(response.then().catch((err) => err)).toBeDefined();
  });

  test('dbInstance.delete must return a promise', () => {
    const params: DeleteItemInput = {
      TableName: 'table',
      Key: {}
    };

    const response = dbInstance.delete(params);

    expect(response.then().catch((err) => err)).toBeDefined();
  });
});
