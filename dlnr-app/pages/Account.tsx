import * as React from "react";
import { ScrollView, View } from "react-native";
import { Text, Input, Divider } from "react-native-elements";
import { useUserInfo, UserInfoProvider } from "../services/useUserInfo";
import { loginWithToken } from "../services/authenticationService";
import { useEffect } from "react";
import { useNavigationState } from "@react-navigation/native";




export default function Account({ navigation }) {
  const { state: data, dispatch: setData } = useUserInfo();
  const navState = useNavigationState((state) => state);
  let userInfo = data.userInfo;

  useEffect(() => {
    if (navState.routeNames[navState.index] === "Account") {
      loginWithToken().then((res) => {
        setData({
          type: "LOGIN",
          payload: {
            userInfo: res,
          },
        });
      });
    }
  }, []);

  let points = 0;

  if (userInfo.user?.checkIns) {
    for (let checkIn of userInfo.user?.checkIns) {
      points += checkIn.pointsAwarded;
    }
  }

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Text>{userInfo.user?.username}</Text>
      <Text>{points} points</Text>
      <Text>Your checkins: </Text>
      {
        userInfo.user.checkIns?.map(checkIn => {
          return <CheckInItem key={checkIn._id} checkIn={checkIn}></CheckInItem>
        })
      }
    </ScrollView>
  )
}

const CheckInItem = (checkIn) => {
  return (
    <View style={{ padding: 10 }}>
      <Text>{checkIn.checkIn.trail?.name}</Text>
      <Text>Date: {checkIn.checkIn.startTime}</Text>
      <Text>Points awarded: {checkIn.checkIn.pointsAwarded}</Text>
      <Divider orientation="horizontal" />
    </View>
  )
}
