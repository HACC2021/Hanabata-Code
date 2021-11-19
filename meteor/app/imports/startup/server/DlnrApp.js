import { Meteor } from "meteor/meteor";
import { JsonRoutes } from "meteor/simple:json-routes";
import { Community } from "../../api/community/community";
import { Trails } from "../../api/trail/Trail";
import { CheckIns } from "../../api/trail/CheckIn";
import { ObjectId } from "mongodb";

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
  "auth/editPostOnCommunityDetail",
  async function (request, response) {
    // The authenticated user's ID will be set by this middleware
    let owner = request.userId;
    const { post_id, title, detail } = request.body;

    await Community.collection.update(
      {
        _id: post_id,
        owner,
      },
      {
        $set: { title, detail },
      },
      false,
      false
    );

    let statusCode = 200;

    JsonRoutes.sendResult(response, {
      code: statusCode,
      data: "you can't see me",
    });
  }
);

JsonRoutes.add(
  "POST",
  "auth/deletePostOnCommunityDetail",
  async function (request, response) {
    // The authenticated user's ID will be set by this middleware
    let owner = request.userId;
    const { post_id } = request.body;
    console.log("owner_id: ", owner);
    console.log("post_id: ", post_id);
    await Community.collection.remove({
      _id: post_id,
      owner,
    });
    let posts = await Community.collection
      .find({}, { fields: { comments: 0 } })
      .fetch();
    let statusCode = 200;

    JsonRoutes.sendResult(response, {
      code: statusCode,
      data: posts,
    });
  }
);

JsonRoutes.add("POST", "auth/checkInToTrail", async (req, res) => {
  console.log("checkInToTrail", req.body);
  let trailId = req.body.trailId;
  let userId = req.userId;

  let dayOfWeek = new Date().getDay() - 1;
  dayOfWeek < 0 && (dayOfWeek = 6);
  let hour = new Date().getHours();

  let trail = await Trails.collection.findOne({ _id: ObjectId(trailId) });

  if (!trail) {
    return JsonRoutes.sendResult(res, {
      code: 400,
      data: { error: "Invalid trail"},
    });
  }
  let user = Meteor.users.findOne({_id: userId});
  let busyTimes = trail.traffics?.google;

  let points = 5;
  let msPerDay = 12 * 60 * 60 * 1000;

  if (user.checkIns?.find(checkIn => checkIn.trail.trailId == trailId && new Date().getTime() - checkIn.startTime.getTime() < msPerDay)) {
    return JsonRoutes.sendResult(res, {
      code: 400,
      data: { error: "You have already checked in within 12 hours."},
    });
  }


  let checkInObj = { 
    userId, 
    trail: {
      trailId,
      name: trail.name
    },
    startTime: new Date(),  
    endTime: null,  
    rating: null,  
    comment: null,  
    busyValue: null,
    pointsAwarded: 5,
  }

  if (busyTimes && req.userId) {
    checkInObj.busyValue = busyTimes[dayOfWeek][hour];
    if (checkInObj.busyValue < 25) points = 100;
    else if (checkInObj.busyValue < 60) points = 80;
    else if (checkInObj.busyValue < 80) points = 50;
    else  points = 20;

    checkInObj.pointsAwarded = points;
  }
  else {
  }

  console.log(checkInObj);

  CheckIns.collection.insert(checkInObj, (err, id) => {
    checkInObj._id = id;
    if (req.userId) {
      Meteor.users.update({ _id: userId }, { $push: { checkIns: checkInObj }});
    }

    JsonRoutes.sendResult(res, {
      code: 200,
      data: checkInObj,
    });
  });
});
