import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {Button, View} from "react-native";
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
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color}/>;
};

const Drawer = createBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
          <Button
            onPress={() => logout(navigation)}
            title="Logout"
            color="blue"
          />
        ),
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

  const HomeStackScreen = () => {
      const headerRight = ({ navigation }) => {
        return {
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
      return(
          <>
          <Tab.Navigator>
              <Tab.Screen name="AllTrails" component={AllTrails} options={{tabBarIcon: props => TabIcon({...props, name: 'hiking'}),}}/>
              <Tab.Screen name="Home" component={Home} options={{tabBarIcon: props => TabIcon({...props, name: 'home'}),}}/>
              <Tab.Screen name="Community" component={Community} options={{tabBarIcon: props => TabIcon({...props, name: 'network'}),}}/>
          </Tab.Navigator>
          </>
      );
  };

  useEffect(() => {
    
    // console.log(navigationRef);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"} >
        {data.userInfo ? (
          <>
            <Stack.Screen
              name="Back"
              component={HomeStackScreen}
              options={{ headerShown: false,}}
            />
            <Stack.Screen
              name="TrailDetail"
              component={TrailDetail}
            />
            <Stack.Screen
              name="CommunityDetail"
              component={CommunityDetail}
            />
            <Stack.Screen
              name="AddPost"
              component={AddPost}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
