import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("HanabataCode", token);
  } catch (e) {
    console.log(e);
  }
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("HanabataCode");
    return value;
  } catch (e) {
    console.log(e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("HanabataCode");
  } catch (e) {
    console.log(e);
  }
};

const useLogout = async () => {
  await removeToken();
};

async function validateUser(token) {
  try {
    const response = await fetch(
      "http://192.168.1.24:3000/auth/loginWithToken",
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const json = await response.json();
    console.log("validate user", json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function useLogin(email, password) {
  try {
    const response = await fetch("http://192.168.1.24:3000/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    await storeToken(json.token);
    return json.id;
  } catch (error) {
    console.error(error);
  }
}

async function loginWithToken() {
  let id = undefined;
  const token = await getToken();
  if (token) {
    id = await validateUser(token);
    console.log("hi");
  }
  return id;
}

export { useLogin, useLogout, loginWithToken };
