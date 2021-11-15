import { Meteor } from "meteor/meteor";
import { JsonRoutes } from "meteor/simple:json-routes";
import { Community } from "../../api/community/community";

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
  let posts = Community.collection
    .find({}, { fields: { comments: 0 } })
    .fetch();
  let statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: posts,
  });
});

JsonRoutes.add("POST", "auth/getAllComments", function (request, response) {
  // The authenticated user's ID will be set by this middleware
  const { _id } = request.body;
  let comments = Community.collection.findOne(_id, { fields: { comments: 1 } });

  let statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: comments,
  });
});

JsonRoutes.add("POST", "auth/commentOnCommunity", function (request, response) {
  // The authenticated user's ID will be set by this middleware
  let owner = request.userId;
  const { _id, comment } = request.body;
  Community.collection.update(_id, {
    $push: {
      comments: { _id: new Meteor.Collection.ObjectID()._str, owner, comment },
    },
  });
  let comments = Community.collection.findOne(_id, { fields: { comments: 1 } });
  let statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: comments,
  });
});
