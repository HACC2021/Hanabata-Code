import * as React from "react";
import { ScrollView, View } from "react-native";
import { Text, Input, Divider } from "react-native-elements";
import { useUserInfo } from "../services/useUserInfo";

export default function Account({ navigation }) {
  const { state: data, dispatch: setData } = useUserInfo();
  let userInfo = data.userInfo;

  let points = 0;

  for (let checkIn of userInfo.user.checkIns) {
    points += checkIn.pointsAwarded;
  }

  return (
    <ScrollView style={{flex: 1, padding: 10}}>
      <Text>{ userInfo.user.username }</Text>
      <Text>{ points } points</Text>
      <Text>Your checkins: </Text>

      {
        userInfo.user.checkIns.map(checkIn => {
          return(
            <View style={{padding: 10}}>
              <Text>{checkIn.trail.name}</Text>
              <Text>Date: {checkIn.startTime}</Text>
              <Text>Points awarded: {checkIn.pointsAwarded}</Text>
              <Divider orientation="horizontal" />
            </View>
          )
        })
      }
    </ScrollView>
  )


}
