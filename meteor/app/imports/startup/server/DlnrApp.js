import { Meteor } from "meteor/meteor";
import { JsonRoutes } from "meteor/simple:json-routes";
import { Accounts } from "meteor/accounts-base";
import { Community } from "../../api/community/community";
import {Trails} from "../../api/trail/Trail"

JsonRoutes.Middleware.use("/auth", JsonRoutes.Middleware.parseBearerToken);
JsonRoutes.Middleware.use(
  "/auth",
  JsonRoutes.Middleware.authenticateMeteorUserByToken
);

JsonRoutes.add("POST", "auth/postOnCommunity", function (request, response) {
  // The authenticated user's ID will be set by this middleware
  let owner = request.userId;
  Community.collection.insert({ ...request.body, owner });
  let statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: owner,
  });
});

JsonRoutes.add("GET", "auth/getAllPosts", function (request, response) {
  // The authenticated user's ID will be set by this middleware
  let userId = request.userId;
  let posts = Community.collection.find().fetch();
  let statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: posts,
  });
});
