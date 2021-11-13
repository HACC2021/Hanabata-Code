async function getData() {
  try {
    const response = await fetch("http://192.168.1.17:3000/test", {
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
      "http://192.168.1.17:3000/auth/postOnCommunity",
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

async function getAllPosts(token) {
  try {
    const response = await fetch("http://192.168.1.17:3000/auth/getAllPosts", {
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

function getTrails() {
  console.log("getting trails from api...");
  return fetch("http://192.168.1.17:3000/api/trails", { method: "GET" })
    .then((res) => {
      console.log("successfully receieved trails");
      return res.json();
    })
    .catch((error) => console.log(error));
}

export { getTrails, makePost, getAllPosts };
