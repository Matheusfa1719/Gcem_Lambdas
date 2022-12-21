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
  const user = await dynamoService.findUserByEmail(payload.email);
  if (user) {
    throw { statusCode: 400, message: "User already exists" };
  }
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
