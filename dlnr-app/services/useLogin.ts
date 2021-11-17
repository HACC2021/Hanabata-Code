import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip4 } from "./http";

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

async function useLogin(email, password) {
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
    const json = await response.json();
    await storeToken(json.token);
    return json;
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
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    await storeToken(json.token);
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function loginWithToken() {
  let userId = undefined;
  const token = await getToken();
  if (token) {
    userId = await validateUser(token);
  }
  return userId ? { userId, token } : undefined;
}

export { useLogin, useLogout, loginWithToken, registerUser };
