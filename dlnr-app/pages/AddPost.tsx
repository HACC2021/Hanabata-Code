import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useUserInfo } from "../services/useUserInfo";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { editPost, makePost } from "../services/apiService";

export default function AddPost({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const { state: data, dispatch: setData } = useUserInfo();

  useEffect(() => {
    if (route.params) {
      setTitle(route.params.item.title);
      setDetail(route.params.item.detail);
    } else {
      setTitle("");
      setDetail("");
    }
  }, [route.params]);
  const submit = async () => {
    if (route.params?.isEditMode) {
      await editPost(data.userInfo.token, route.params.item._id, title, detail);
    } else {
      await makePost(data.userInfo.token, title, detail);
    }
    setTitle("");
    setDetail("");
    navigation.navigate("Community");
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Input
          placeholder="Title"
          //leftIcon={{ type: "font-awesome", name: "comment" }}
          style={{ textAlignVertical: "top", padding: 15 }}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <Input
          placeholder="Detail"
          //leftIcon={{ type: "font-awesome", name: "comment" }}
          multiline={true}
          numberOfLines={15}
          style={{ textAlignVertical: "top", height: 300, padding: 15 }}
          value={detail}
          onChangeText={(value) => setDetail(value)}
        />
      </View>
      <Button title="Save" onPress={submit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
