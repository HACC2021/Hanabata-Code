import React, { useState } from "react";
import { Text } from "react-native";
import {Button, Input, ListItem, SpeedDial} from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import InputScrollView from 'react-native-input-scroll-view';
import {getAllComments, makeComment} from "../services/apiService";
import {useUserInfo} from "../services/useUserInfo";

export default function CommunityDetail(props) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { state: data, dispatch: setData } = useUserInfo();
  const submit = async () => {
      await makeComment(data.userInfo.token, comment);
      /*await getAllComments(data.userInfo.token).then((res) => {
          setData({
              type: "ADD_ALL_POSTS",
              payload: {
                  posts: res,
              },
          });
      });*/
  };
  return (
    <>
      <ScrollView><InputScrollView style={{ flex: 1 }}>
        <Text>{props.route.params.detail}</Text>
          <Input
                 placeholder="Comment"
                 leftIcon={{ type: "font-awesome", name: "comment" }}
                 value={comment}
                 onChangeText={(value) => setComment(value)}
                 style = {{ height: '100%'}}
          />
                 <Button title="Save" onPress={submit} />
      </InputScrollView>
      </ScrollView>
      <SpeedDial
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "edit", color: "#fff" }}
          title="edit"
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Delete"
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
    </>
  );
}
