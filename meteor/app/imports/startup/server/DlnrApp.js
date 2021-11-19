import { Meteor } from 'meteor/meteor';
import { JsonRoutes } from 'meteor/simple:json-routes';
import { Community } from '../../api/community/community';

JsonRoutes.Middleware.use('/auth', JsonRoutes.Middleware.parseBearerToken);
JsonRoutes.Middleware.use(
  '/auth',
  JsonRoutes.Middleware.authenticateMeteorUserByToken,
);

JsonRoutes.add('POST', 'auth/postOnCommunity', function (request, response) {
  // The authenticated user's ID will be set by this middleware
  const owner = request.userId;
  Community.collection.insert({ ...request.body, owner });
  const statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: owner,
  });
});

JsonRoutes.add('GET', 'auth/getAllPosts', function (request, response) {
  // The authenticated user's ID will be set by this middleware
  const posts = Community.collection
    .find({}, { fields: { comments: 0 } })
    .fetch();
  const statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: posts,
  });
});

JsonRoutes.add('POST', 'auth/getAllComments', function (request, response) {
  // The authenticated user's ID will be set by this middleware
  const { _id } = request.body;
  const comments = Community.collection.findOne(_id, { fields: { comments: 1 } });

  const statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: comments,
  });
});

JsonRoutes.add('POST', 'auth/commentOnCommunity', function (request, response) {
  // The authenticated user's ID will be set by this middleware
  const owner = request.userId;
  const { _id, comment } = request.body;
  Community.collection.update(_id, {
    $push: {
      comments: { _id: new Meteor.Collection.ObjectID()._str, owner, comment },
    },
  });
  const comments = Community.collection.findOne(_id, { fields: { comments: 1 } });
  const statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: comments,
  });
});

JsonRoutes.add(
  'POST',
  'auth/editCommentOnCommunityDetail',
  function (request, response) {
    // The authenticated user's ID will be set by this middleware
    const owner = request.userId;
    const { comment_id, post_id } = request.body;
    console.log('owner_id: ', owner);
    console.log('comment_id: ', comment_id);
    console.log('post_id: ', post_id);
    // let comments = Community.collection.findOne(_id, { fields: { comments: 1 } });

    const statusCode = 200;

    JsonRoutes.sendResult(response, {
      code: statusCode,
      data: 'hi',
    });
  },
);

JsonRoutes.add(
  'POST',
  'auth/deleteCommentOnCommunityDetail',
  function (request, response) {
    // The authenticated user's ID will be set by this middleware
    const owner = request.userId;
    const { comment_id, post_id } = request.body;
    console.log('owner_id: ', owner);
    console.log('comment_id: ', comment_id);
    console.log('post_id: ', post_id);
    // let comments = Community.collection.findOne(_id, { fields: { comments: 1 } });

    const statusCode = 200;

    JsonRoutes.sendResult(response, {
      code: statusCode,
      data: 'hi',
    });
  },
);

JsonRoutes.add('POST', 'auth/editPostOnEditPost', function (request, response) {
  // The authenticated user's ID will be set by this middleware
  const owner = request.userId;
  const { title_id, detail_id } = request.body;
  console.log('owner_id: ', owner);
  console.log('title_id: ', title_id);
  console.log('detail_id: ', detail_id);
  // Community.collection.insert({ ...request.body, owner });
  const statusCode = 200;

  JsonRoutes.sendResult(response, {
    code: statusCode,
    data: owner,
  });
});
