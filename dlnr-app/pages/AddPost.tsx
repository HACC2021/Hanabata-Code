import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useUserInfo } from "../services/useUserInfo";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";

export default function AddPost({ navigation }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const { dispatch: setData } = useUserInfo();

  const submit = async() => {
    await setData({
      type: "ADD_POST",
      payload: {
        post: {
          name: title,
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          subtitle: "this is subtitle " + title,
          detail,
        },
      },
    });
    setTitle("");
    setDetail("");
    navigation.navigate("Community");
  };

  return (
    <View>
      <Input
        placeholder="Title"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        value={title}
        onChangeText={(value) => setTitle(value)}
      />
      <Input
        placeholder="Detail"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        value={detail}
        onChangeText={(value) => setDetail(value)}
      />

      <Button title="Solid Button" onPress={submit} />
    </View>
  );
}
