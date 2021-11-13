import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "./pages/Home";
import AllTrails from "./pages/AllTrails";
import Community from "./pages/Community";
import Login from "./pages/Login";
import { useUserInfo, UserInfoProvider } from "./services/useUserInfo";
import { useLogin, useLogout } from "./services/useLogin";
import TrailDetail from "./pages/TrailDetail";

const Drawer = createDrawerNavigator();

function Navigator() {
  const { state: userInfo, dispatch } = useUserInfo();

  const logout = async (navigation) => {
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

  const hiddenDrawer = () => {
    return {
      drawerItemStyle: { display: "none" as "none" },
    };
  };

  const hiddenDrawerWithButton = ({ navigation }) => {
    return {
      drawerItemStyle: { display: "none" as "none" },
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Go Back"
          color="blue"
        />
      ),
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
      <Drawer.Navigator initialRouteName={"Login"} backBehavior="history">
        <Drawer.Screen name="Login" component={Login} options={hiddenDrawer} />
        <Drawer.Screen
          name="TrailDetail"
          component={TrailDetail}
          options={hiddenDrawerWithButton}
        />
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
