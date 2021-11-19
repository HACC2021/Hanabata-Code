import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip4 } from "./http";

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("AuthToken", token.token);
    await AsyncStorage.setItem("AuthTokenExpires", token.tokenExpires);
    await AsyncStorage.setItem("AuthTokenId", token.id);
  } catch (e) {
    console.log(e);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("AuthToken");
    const tokenExpires = await AsyncStorage.getItem("AuthTokenExpires");
    const id = await AsyncStorage.getItem("AuthTokenId");
    return { token, tokenExpires, id };
  } catch (e) {
    console.log(e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("AuthToken");
    await AsyncStorage.removeItem("AuthTokenExpires");
    await AsyncStorage.removeItem("AuthTokenId");
  } catch (e) {
    console.log(e);
  }
};

const useLogout = async () => {
  await removeToken();
};

async function validateUser(token) {
  try {
    const response = await fetch(`http://${ip4}/auth/loginWithToken`, {
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
    let json;
    if (response.status === 200) {
      json = await response.json();
    }else {
      json = undefined;
    }
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function loginWithPassword(email, password) {
  try {
    const response = await fetch(`http://${ip4}/users/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    });
    const token = await response.json();
    if (token.error) {
      return { error: token.reason }
    }
    else {
      await storeToken(token);
      return token;
    }
  } catch (error) {
    console.error(error);
  }
}

async function registerUser(email, password) {
  try {
    const response = await fetch(`http://${ip4}/users/register`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username: email }), // body data type must match "Content-Type" header
    });
    const token = await response.json();
    if (token.error) {
      return { error: token.reason }
    }
    else {
      await storeToken(token);
      return token;
    }
  } catch (error) {
    console.error(error);
  }
}

async function loginWithToken() {
  let user = undefined;
  const token = await getToken();
  if (token) {
    user = await validateUser(token.token);
  }
  return user ? { user, token } : undefined;
}

export { loginWithPassword, useLogout, loginWithToken, getToken, registerUser };
