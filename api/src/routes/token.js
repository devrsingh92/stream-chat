import { token } from "../controllers/v1/token";

import { wrapAsync } from "../utils/controllers";

import { loginUser } from "./../controllers/auth/auth.controller";

module.exports = api => {
  //api.route("/v1/token").post(wrapAsync(token));
  api.route("/v1/token").post(loginUser);
};
