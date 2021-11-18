import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable, StyleSheet, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./pages/Home";
import AllTrails from "./pages/AllTrails";
import Community from "./pages/Community";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { useUserInfo } from "./services/useUserInfo";
import { useLogout } from "./services/useLogin";
import TrailDetail from "./pages/TrailDetail";
import CommunityDetail from "./pages/CommunityDetail";
import AddPost from "./pages/AddPost";
import SignUp from "./pages/SignUp";

const Drawer = createDrawerNavigator();

function Navigator() {
  const { state: data, dispatch } = useUserInfo();

  const logout = async (navigation) => {
    await useLogout();
    await dispatch({
      type: "LOGOUT",
      payload: {
        userInfo: undefined,
      },
    });
    navigation.navigate("Login");
  };

  const headerRight = ({ navigation }) => {
    return {
      headerRight: () =>
        data.userInfo && (
          <Pressable onPress={() => logout(navigation)} style={styles.button}>
            <Text style={styles.text}>Log Out</Text>
          </Pressable>
        ),
    };
  };

  const hiddenDrawerWithButton = ({ navigation }) => {
    return {
      drawerItemStyle: { display: "none" as "none" },
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.text2}>Go Back</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={() => logout(navigation)} style={styles.button}>
          <Text style={styles.text}>Log Out</Text>
        </Pressable>
      ),
    };
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={"Login"}
        backBehavior="history"
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        {data.userInfo ? (
          <>
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
            <Drawer.Screen
              name="TrailDetail"
              component={TrailDetail}
              options={hiddenDrawerWithButton}
            />
            <Drawer.Screen
              name="CommunityDetail"
              component={CommunityDetail}
              options={hiddenDrawerWithButton}
            />
            <Drawer.Screen
              name="AddPost"
              component={AddPost}
              options={hiddenDrawerWithButton}
            />
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Sign Up" component={SignUp} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    // elevation: 3,
    // backgroundColor: "grey",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "red",
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "skyblue",
  },
});

export default Navigator;
