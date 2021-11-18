import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Pressable, StyleSheet, Text } from "react-native";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

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

  const hikingTabOptions = ({ navigation }) => {
    return {
      tabBarIcon: (props) => TabIcon({ ...props, name: "hiking" }),
      headerRight: () =>
        data.userInfo && (
          <Button
            onPress={() => logout(navigation)}
            title="Logout"
            color="blue"
          />
        ),
    };
  };

  const homeTabOptions = ({ navigation }) => {
    return {
      tabBarIcon: (props) => TabIcon({ ...props, name: "home" }),
      headerRight: () =>
        data.userInfo && (
          <Button
            onPress={() => logout(navigation)}
            title="Logout"
            color="blue"
          />
        ),
    };
  };

  const communityTabOptions = ({ navigation }) => {
    return {
      tabBarIcon: (props) => TabIcon({ ...props, name: "network" }),
      headerRight: () =>
        data.userInfo && (
          <Button
            onPress={() => logout(navigation)}
            title="Logout"
            color="blue"
          />
        ),
    };
  };

  const hiddenTabOptions = ({ navigation }) => {
    return {
      tabBarItemStyle: { display: "none" as "none" },
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={styles.button}>
          <Icon name="arrow-left" type="material-community" />
        </Pressable>
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
    // console.log(data.userInfo);
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
        backBehavior="history"
        initialRouteName="Home"
      >
        {data.userInfo ? (
          <>
            <Tab.Screen
              name="AllTrails"
              component={AllTrails}
              options={hikingTabOptions}
            />
            <Tab.Screen name="Home" component={Home} options={homeTabOptions} />
            <Tab.Screen
              name="Community"
              component={Community}
              options={communityTabOptions}
            />
            <Tab.Screen
              name="TrailDetail"
              component={TrailDetail}
              options={hiddenTabOptions}
            />
            <Tab.Screen
              name="CommunityDetail"
              component={CommunityDetail}
              options={hiddenTabOptions}
            />
            <Tab.Screen
              name="AddPost"
              component={AddPost}
              options={hiddenTabOptions}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Login"
              component={Login}
              options={{
                tabBarIcon: (props) =>
                  TabIcon({ ...props, name: "login-variant" }),
              }}
            />
            <Tab.Screen
              name="Sign Up"
              component={SignUp}
              options={{
                tabBarIcon: (props) =>
                  TabIcon({ ...props, name: "account-plus-outline" }),
              }}
            />
          </>
        )}
      </Tab.Navigator>
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
});

export default Navigator;
