import * as jwt from "express-jwt";
import { Request } from "express";

require("dotenv").config();
const getTokenFromHeaders = (req: Request) => {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: "payload",
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

export default auth;
