import { Meteor } from "meteor/meteor";
import { JsonRoutes } from "meteor/simple:json-routes";
import { Accounts } from "meteor/accounts-base";

JsonRoutes.Middleware.use("/auth", JsonRoutes.Middleware.parseBearerToken);
JsonRoutes.Middleware.use(
  "/auth",
  JsonRoutes.Middleware.authenticateMeteorUserByToken
);

JsonRoutes.add("GET", "auth/loginWithToken", function (request, response) {
  // The authenticated user's ID will be set by this middleware
  const userId = request.userId;

  let user = Meteor.users.findOne({ _id: userId });
  delete user.services;

  let statusCode = userId ? 200 : 401;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: user,
  });
});

JsonRoutes.add("POST", "test", (req, res) => {
  //   debugger;
  console.log(`req.body.userId: ${req.body.userId}`);
  console.log(this.userId);
  const hashedToken = Accounts._hashLoginToken(req.body.token);
  const selector = {
    _id: req.body.userId,
    "services.resume.loginTokens.hashedToken": hashedToken,
  };
  const options = { fields: { _id: 1, username: 1 } };
  const user = Meteor.users.findOne(selector, options);
  console.log(user);

  var statusCode = 200;

  JsonRoutes.sendResult(res, {
    code: statusCode,
    data: user,
  });
});
