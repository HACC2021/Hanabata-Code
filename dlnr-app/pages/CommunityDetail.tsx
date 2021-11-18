import React, {useState, useEffect} from "react";
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import {Button, Input, ListItem, SpeedDial} from "react-native-elements";
import {ScrollView, Swipeable} from "react-native-gesture-handler";
import InputScrollView from "react-native-input-scroll-view";
import {deleteComment, editComment, getAllComments, makeComment} from "../services/apiService";
import { useUserInfo } from "../services/useUserInfo";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import Container from "@react-navigation/native-stack/lib/typescript/src/views/DebugContainer.native";

const renderItem = ({ item }) => {
  return (
    <>
    <Swipeable renderRightActions={() => <MaterialCommunityIcons color="#FF0000" size={50} name='delete-outline'/>}
               renderLeftActions={() => <MaterialCommunityIcons color="#008000" size={50} name='comment-edit-outline'/> }>
    <ListItem bottomDivider>
      {/* <Avatar source={{ uri: item.avatar_url }} /> */}
      <ListItem.Content>
        <ListItem.Title>{item.comment}</ListItem.Title>
        <ListItem.Subtitle>{item.owner + "/" + item._id}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    </Swipeable>
    </>
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

  const deleteComment = async (comment) => {
      return await data.action(async () => {
          return await comment.destroyPermanently();
      })
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.TopView}>
          <Text style={styles.postText}>{props.route.params.detail}</Text>
        </View>
        <View style={styles.BottomView}>
          <ScrollView>
            <FlatList
              data={detail.comments}
              horizontal={false}
              style={{marginTop: 3, backgroundColor: '#dfdfdf'}}
              renderItem={renderItem}
              keyExtractor={(item, i) => i.toString()}
            />
          </ScrollView>
        </View>
      </View>
      <ScrollView><InputScrollView>
      <Input
        placeholder="Comment"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        value={comment}
        onChangeText={(value) => setComment(value)}
        style={{ height: "100%" }}
      />
      <Button title="Save" onPress={submit} />
      </InputScrollView></ScrollView>
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
