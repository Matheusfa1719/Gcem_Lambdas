const crypto = require("crypto");
const { hashPassword } = require("../../_utils/");
const dynamoService = require("../../infra/dynamoDB");

const findUser = async (id) => {
  const params = dynamoService.generateParamsGet(
    dynamoService.tables.userTable,
    { userId: id }
  );
  const user = await dynamoService.find(params);
  return user;
};

const createUser = async (payload) => {
  const userEmailparams = dynamoService.generateParamsGet(
    dynamoService.tables.userTable,
    {
      email: payload.email,
    }
  );
  console.log(userEmailparams);
  const user = await dynamoService.find(userEmailparams);
  console.log(user);
  const userId = crypto.randomUUID();
  const createdAt = Date.now();
  const data = { userId, createdAt, ...payload };
  data.password = await hashPassword(data.password);
  const params = dynamoService.generateParamsPut(
    dynamoService.tables.userTable,
    data
  );
  await dynamoService.create(params);
  delete data.password;
  return data;
};

module.exports = { findUser, createUser };
