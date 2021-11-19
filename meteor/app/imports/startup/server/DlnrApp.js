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

JsonRoutes.add(
  "POST",
  "auth/editCommentOnCommunityDetail",
  async function (request, response) {
    // The authenticated user's ID will be set by this middleware
    let owner = request.userId;
    const { comment_id, post_id, comment } = request.body;
    // console.log("owner_id: ", owner);
    // console.log("comment_id: ", comment_id);
    // console.log("post_id: ", post_id);
    // console.log("comment", comment);
    await Community.collection.update(
      {
        _id: post_id,
        comments: {
          $elemMatch: { owner: owner, _id: comment_id },
        },
      },
      { $set: { "comments.$.comment": comment } },
      false,
      false
    );

    let comments = await Community.collection.findOne(post_id, {
      fields: { comments: 1 },
    });

    let statusCode = 200;

    JsonRoutes.sendResult(response, {
      code: statusCode,
      data: comments,
    });
  }
);

JsonRoutes.add(
  "POST",
  "auth/deleteCommentOnCommunityDetail",
  async function (request, response) {
    // The authenticated user's ID will be set by this middleware
    let owner = request.userId;
    const { comment_id, post_id } = request.body;
    await Community.collection.update(
      {
        _id: post_id,
        comments: {
          $elemMatch: { owner: owner, _id: comment_id },
        },
      },
      {
        $pull: { comments: { owner: owner, _id: comment_id } },
      },
      false,
      false
    );
    let comments = await Community.collection.findOne(post_id, { fields: { comments: 1 } });

    let statusCode = 200;

    JsonRoutes.sendResult(response, {
      code: statusCode,
      data: comments,
    });
  }
);
