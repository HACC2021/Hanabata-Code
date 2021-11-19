import { ip4 } from "./http";

async function getData() {
  try {
    const response = await fetch(`http://${ip4}/test`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer vKBRO4U0Wo61qUT2Rme0GzOpMgnaldOwoltRBUYN-hy",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        userId: "5cb9vmypaNxGMfwc6",
        token: "vKBRO4U0Wo61qUT2Rme0GzOpMgnaldOwoltRBUYN-hy",
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function makePost(token, title, detail) {
  try {
    const response = await fetch(
      `http://${ip4}/auth/postOnCommunity`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ title, detail }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function makeComment(token, _id, comment) {
  try {
    const response = await fetch(
      `http://${ip4}/auth/commentOnCommunity`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ _id, comment }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function getAllPosts(token) {
  try {
    const response = await fetch(`http://${ip4}/auth/getAllPosts`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, // body data type must match "Content-Type" header
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function getAllComments(token, _id) {
  try {
    const response = await fetch(
      `http://${ip4}/auth/getAllComments`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ _id }),
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

function getTrails() {
  return fetch(`http://${ip4}/api/trails`, { method: "GET" })
    .then((res) => {
      console.log("successfully receieved trails");
      return res.json();
    })
    .catch((error) => console.log(error));
}

async function deleteComment(token, post_id, comment_id) {
  try {
    const response = await fetch(
      `http://${ip4}/auth/deleteCommentOnCommunityDetail`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ post_id, comment_id }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function editPost(token, post_id, post) {
  try {
    const response = await fetch(
      `http://${ip4}/auth/editPostOnCommunityDetail`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ post_id, post }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function deletePost (token, post_id, post) {
    try {
        const response = await fetch(
            `http://${ip4}/auth/deletePostOnCommunityDetail`,
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ post_id, post }), // body data type must match "Content-Type" header
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

async function editComment(token, post_id, comment_id, comment) {
  try {
    const response = await fetch(
      `http://${ip4}/auth/editCommentOnCommunityDetail`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ post_id, comment_id, comment }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export {
  getTrails,
  makePost,
  getAllPosts,
  editPost,
  deletePost,
  makeComment,
  getAllComments,
  deleteComment,
  editComment,
};
