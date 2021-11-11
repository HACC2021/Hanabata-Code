import React from "react";

function getTrails() {
  console.log("getting trails from api...");
  return fetch("http://192.168.1.24:3000/api/trails", { method: "GET" })
    .then((res) => {
      console.log("successfully receieved trails");
      return res.json();
    })
    .catch((error) => console.log(error));
}

export { getTrails };