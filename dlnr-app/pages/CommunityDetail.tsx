import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { Button, Input, ListItem, SpeedDial } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import InputScrollView from "react-native-input-scroll-view";
import { getAllComments, makeComment } from "../services/apiService";
import { useUserInfo } from "../services/useUserInfo";
// import Container from "@react-navigation/native-stack/lib/typescript/src/views/DebugContainer.native";

const renderItem = ({ item }) => {
  return (
    <ListItem bottomDivider>
      {/* <Avatar source={{ uri: item.avatar_url }} /> */}
      <ListItem.Content>
        <ListItem.Title>{item.comment}</ListItem.Title>
        <ListItem.Subtitle>{item.owner + "/" + item._id}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default function CommunityDetail(props) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [detail, setDetail] = useState({ comments: [] });
  const { state: data, dispatch: setData } = useUserInfo();

  useEffect(() => {
    getAllComments(data.userInfo.token, props.route.params._id).then((res) =>
      setDetail(res)
    );
  }, [props.route.params._id]);

  const submit = async () => {
    await makeComment(
      data.userInfo.token,
      props.route.params._id,
      comment
    ).then((res) => setDetail(res));
    setComment("");
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.TopView}>
          <Text style={styles.postText}>{props.route.params.detail}</Text>
        </View>
        <View style={styles.BottomView}>
          <FlatList
            data={detail.comments}
            renderItem={renderItem}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
      </View>
      <Input
        placeholder="Comment"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        value={comment}
        onChangeText={(value) => setComment(value)}
        style={{ height: "100%" }}
      />
      <Button title="Save" onPress={submit} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopView: {
    flex: 1,
    backgroundColor: "#E2FAB5",
    padding: 13,
  },
  BottomView: {
    flex: 1,
  },
  postText: {
    fontSize: 17,
  },
});
