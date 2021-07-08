import * as AWS from 'aws-sdk';

let options = {};

// Offline testing
if (process.env.IS_OFFLINE) {
  options = {
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:9999'),
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER'
  };
}

const S3 = new AWS.S3(options);

export default S3;
