import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Button, Input, ListItem, SpeedDial } from "react-native-elements";
import { Swipeable } from "react-native-gesture-handler";
import {
  deleteComment,
  editComment,
  getAllComments,
  makeComment,
} from "../services/apiService";
import { useUserInfo } from "../services/useUserInfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CommunityDetail(props) {
  const [comment, setComment] = useState("");
  const [detail, setDetail] = useState({ comments: [] });
  const { state: data, dispatch: setData } = useUserInfo();
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const swipeable = useRef([]);

  const renderItem = ({ item, index }) => {
    const deleteCommentButton = () => {
      deleteComment(data.userInfo.token, props.route.params._id, item._id).then(
        (res) => setDetail(res)
      );
      swipeable.current[index].close();
    };
    const editCommentButton = () => {
      setIsEdit(true);
      setEditId(item._id);
      swipeable.current[index].close();
    };
    return (
      <>
        <Swipeable
          ref={(el) => (swipeable.current[index] = el)}
          renderRightActions={() => (
            <MaterialCommunityIcons
              color="#FF0000"
              size={50}
              name="delete-outline"
              onPress={deleteCommentButton}
              style={{ alignSelf: "center" }}
            />
          )}
          renderLeftActions={() => (
            <MaterialCommunityIcons
              color="#008000"
              size={50}
              name="comment-edit-outline"
              onPress={editCommentButton}
              style={{ alignSelf: "center" }}
            />
          )}
        >
          <ListItem bottomDivider>
            {/* <Avatar source={{ uri: item.avatar_url }} /> */}
            <ListItem.Content>
              <ListItem.Title>{item.comment}</ListItem.Title>
              <ListItem.Subtitle>
                {item.owner + "/" + item._id}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Swipeable>
      </>
    );
  };

  useEffect(() => {
    getAllComments(data.userInfo.token, props.route.params._id).then((res) =>
      setDetail(res)
    );
    setComment("");
    setIsEdit(false);
    setEditId("");
  }, [props.route.params._id]);

  const submit = async () => {
    if (isEdit) {
      await editComment(
        data.userInfo.token,
        props.route.params._id,
        editId,
        comment
      ).then((res) => setDetail(res));
      setEditId("");
      setIsEdit(false);
    } else {
      await makeComment(
        data.userInfo.token,
        props.route.params._id,
        comment
      ).then((res) => setDetail(res));
    }
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
            horizontal={false}
            style={{ marginTop: 3, backgroundColor: "#dfdfdf" }}
            renderItem={renderItem}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
        <SafeAreaView style={{ backgroundColor: "white" }}>
          <ScrollView>
            <Input
              placeholder={isEdit ? "Edit Comment" : "Comment"}
              leftIcon={
                isEdit
                  ? {
                      type: "material-community",
                      name: "comment-edit-outline",
                      color: "#008000",
                      size: 30,
                    }
                  : { type: "font-awesome", name: "comment" }
              }
              value={comment}
              onChangeText={(value) => setComment(value)}
              style={{ height: "100%" }}
              rightIcon={
                isEdit && {
                  name: "close",
                  onPress: () => {
                    setIsEdit(false);
                    setEditId("");
                  },
                }
              }
            />
          </ScrollView>
        </SafeAreaView>
        <Button title="Save" onPress={submit} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopView: {
    flex: 0.5,
    backgroundColor: "#E2FAB5",
    padding: 20,
  },
  BottomView: {
    flex: 0.5,
  },
  postText: {
    fontSize: 17,
  },
});
