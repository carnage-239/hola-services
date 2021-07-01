module.exports = {
  // Change the table schema to your requirements.
  tables: [
    {
      TableName: 'table',
      KeySchema: [
        {
          AttributeName: 'ID',
          KeyType: 'HASH',
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'ID',
          AttributeType: 'S',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  ],
};
