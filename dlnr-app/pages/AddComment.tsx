import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useUserInfo } from "../services/useUserInfo";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { makeComment } from "../services/apiService";
import { getAllComments } from "../services/apiService";

export default function AddComment({ navigation }) {
  const [comment, setComment] = useState("");
  const { state: data, dispatch: setData } = useUserInfo();

  const submit = async () => {
    // await makeComment(data.userInfo.token, comment);
    // await getAllComments(data.userInfo.token).then((res) => {
    //   setData({
    //     type: "ADD_ALL_POSTS",
    //     payload: {
    //       posts: res,
    //     },
    //   });
    // });
    //     await setData({
    //       type: "ADD_POST",
    //       payload: {
    //         post: {
    //           name: title,
    //           avatar_url:
    //             "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    //           subtitle: "this is subtitle " + title,
    //           detail,
    //         },
    //       },
    //     });
      setComment("");
    navigation.navigate("Community");
  };

  return (
    <View>
      <Input
        placeholder="Title"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        value={comment}
        onChangeText={(value) => setComment(value)}
      />

      <Button title="Solid Button" onPress={submit} />
    </View>
  );
}
