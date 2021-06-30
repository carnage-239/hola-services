import * as AWS from 'aws-sdk';
import { DocumentClient as DocClient } from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

interface IDatabaseInstance {
  put: (
    params: DocumentClient.PutItemInput
  ) => Promise<DocumentClient.PutItemOutput>;
  get: (
    params: DocumentClient.GetItemInput
  ) => Promise<DocumentClient.GetItemOutput>;

  update: (
    params: DocumentClient.UpdateItemInput
  ) => Promise<DocumentClient.UpdateItemOutput>;
  delete: (
    params: DocumentClient.DeleteItemInput
  ) => Promise<DocumentClient.DeleteItemOutput>;
  query: (
    params: DocumentClient.QueryInput
  ) => Promise<DocumentClient.QueryOutput>;
  scan: (
    params: DocumentClient.ScanInput
  ) => Promise<DocumentClient.ScanOutput>;
}

let options = {};

// To run DynamoDB instance on local machine for testing
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8888'
  };
}

// To allow us to use jest to do dynamodb testing
if (process.env.JEST_WORKER_ID) {
  options = {
    endpoint: 'http://localhost:8000',
    region: 'local-env',
    sslEnabled: false
  };
}

// DynamoDB Client which gives us functions to do manipulation to our database.
export const client: DocClient = new AWS.DynamoDB.DocumentClient(options);

// Create functionality of the DB Client
const Put = (
  params: DocumentClient.PutItemInput
): Promise<DocumentClient.PutItemOutput> => {
  return client.put(params).promise();
};

// Read functionality of the DB Client
const Get = (
  params: DocumentClient.GetItemInput
): Promise<DocumentClient.GetItemOutput> => {
  return client.get(params).promise();
};

// Update functionality of the DB Client
const Update = (
  params: DocumentClient.UpdateItemInput
): Promise<DocumentClient.UpdateItemOutput> => {
  return client.update(params).promise();
};

// Delete functionality of the DB Client
const Delete = (
  params: DocumentClient.DeleteItemInput
): Promise<DocumentClient.DeleteItemOutput> => {
  return client.delete(params).promise();
};

// Delete functionality of the DB Client
const Query = (
  params: DocumentClient.QueryInput
): Promise<DocumentClient.QueryOutput> => {
  return client.query(params).promise();
};

// Delete functionality of the DB Client
const Scan = (
  params: DocumentClient.ScanInput
): Promise<DocumentClient.ScanOutput> => {
  return client.scan(params).promise();
};

const dbInstance: IDatabaseInstance = {
  put: Put,
  get: Get,
  update: Update,
  delete: Delete,
  query: Query,
  scan: Scan
};

export default dbInstance;
