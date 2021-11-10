import React from "react";
import Navigator from "./Navigator";
import { UserInfoProvider } from "./services/useUserInfo";

async function getData() {
  try {
    const response = await fetch("http://192.168.1.24:3000/test", {
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

function App() {
  return (
    <UserInfoProvider>
      <Navigator />
    </UserInfoProvider>
  );
}

export default App;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>hello world</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
