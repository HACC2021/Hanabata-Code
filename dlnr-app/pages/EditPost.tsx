import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useUserInfo } from "../services/useUserInfo";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { editPost } from "../services/apiService";
import { getAllPosts } from "../services/apiService";

export default function EditPost({ props }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const { state: data, dispatch: setData } = useUserInfo();

  const submit = async () => {
    await editPost(this.data.userInfo.token, title, detail);
    await getAllPosts(this.data.userInfo.token).then((res) => {
      setData({
        type: "EDIT_ALL_POSTS",
        payload: {
          posts: res,
        },
      });
    });
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
    this.setTitle("");
    this.setDetail("");
    props.navigation.navigate("CommunityDetail");
  };

  return (
    <View>
      <Input
        placeholder="Title"
        //leftIcon={{ type: "font-awesome", name: "comment" }}
        style={{ textAlignVertical: 'top', padding: 15}}
        value={title}
        onChangeText={(value) => setTitle(value)}
      />
      <Input
        placeholder="Detail"
        //leftIcon={{ type: "font-awesome", name: "comment" }}
        multiline={true}
        numberOfLines={15}
        style={{ textAlignVertical: 'top', height:300, padding: 15}}
        value={detail}
        onChangeText={(value) => setDetail(value)}
      />
      <Button title="Save" onPress={submit} />
    </View>
  );
}
