const AWS = require("aws-sdk");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const tables = {
  userTable: process.env.USERS_TABLE
}

const generateParamsGet = (tableName, key) => {
  return {
    TableName: tableName,
    Key: {
      ...key
    }
  }
}

const generateParamsPut = (tableName, data) => {
  return {
    TableName: tableName,
    Item: {
      ...data,
    },
  };
};

const create = async (params) => {
  try {
    await dynamoDbClient.put(params).promise();
  } catch (err) {
    console.log("***Erro ao inserir", err);
    throw { statusCode: 400, message: "Insert error" };
  }
};

const find = async (params) => {
  const { Item } = await dynamoDbClient.get(params).promise();
  return Item;
}


module.exports = {
    generateParamsGet,
    generateParamsPut,
    create,
    find,
    tables
}