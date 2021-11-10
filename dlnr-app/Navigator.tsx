import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./pages/Home";
import AllTrails from "./pages/AllTrails";
import Community from "./pages/Community";
import Login from "./pages/Login";
import { useUserInfo, UserInfoProvider } from "./services/useUserInfo";
import { useLogin, useLogout } from "./services/useLogin";

const Drawer = createDrawerNavigator();

function Navigator() {
  const { state: userInfo, dispatch } = useUserInfo();

  const logout = async (navigation) => {
    console.log("nav111111111111111111", navigation);
    await useLogout();
    await dispatch({
      type: "LOGIN",
      payload: {
        userId: undefined,
      },
    });
    navigation.navigate("Login");
  };

  const headerRight = ({ navigation }) => {
    return {
      headerRight: () => (
        <Button
          onPress={() => logout(navigation)}
          title="Logout"
          color="blue"
        />
      ),
    };
  };

  useEffect(() => {
    console.log("app2", userInfo);
  }, [userInfo]);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={"Login"}>
        {!userInfo.userId && (
          <Drawer.Screen name="Login" component={Login} options={headerRight} />
        )}
        <Drawer.Screen name="Home" component={Home} options={headerRight} />
        <Drawer.Screen
          name="AllTrails"
          component={AllTrails}
          options={headerRight}
        />
        <Drawer.Screen
          name="Community"
          component={Community}
          options={headerRight}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
