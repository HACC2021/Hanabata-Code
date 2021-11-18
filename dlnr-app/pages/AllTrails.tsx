// import { NavigationContainer, StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
  Button,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import TrailDetail from "./TrailDetail";
import { useUserInfo } from "../services/useUserInfo";
import { SearchBar, ListItem, Avatar, Card } from "react-native-elements";
import { useNavigationState } from "@react-navigation/core";
import { getTrails } from "../services/apiService";

const trailImage =
  "https://www.hawaiianbeachrentals.com/images/products/thingtodo/p215/p215_zoom_53de8ce1407766.06780368.jpg";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const onChange = (text) => {
    setSearch(text);
    props.setResult(props.trails.filter((trail) => trail.name.includes(text)));
  };

  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={onChange as any}
      value={search}
      onBlur={undefined}
      onFocus={undefined}
      platform={"default"}
      clearIcon={undefined}
      searchIcon={undefined}
      loadingProps={undefined}
      showLoading={undefined}
      onClear={undefined}
      onCancel={undefined}
      lightTheme={false}
      round={false}
      cancelButtonTitle={undefined}
      cancelButtonProps={undefined}
      showCancel={undefined}
    />
  );
};

export default function AllTrails({ navigation }) {
  const { state: data, dispatch: setData } = useUserInfo();
  const navState = useNavigationState((state) => state);
  const [result, setResult] = useState();

  useEffect(() => {
    navState.routeNames[navState.index] === "AllTrails" &&
      getTrails().then((res) => {
        console.log("AllTrails");
        setData({
          type: "ALL_TRAILS",
          payload: {
            trails: res,
          },
        });
      });
  }, [navState.index]);

  return (
    <SafeAreaView style={styles.container}>
      <Search trails={data.trails} setResult={setResult}/>
      <FlatList
        data={result || data.trails}
        renderItem={(item) => renderItem(item.item, navigation)}
        keyExtractor={(item) => item.idKey}
      />
    </SafeAreaView>
  );
}

const renderItem = (trail, navigation) => {
  return (
    <>
      <Card>
        <Card.Title>{trail.name}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: trail.image || trailImage }}></Card.Image>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>{trail.description}</Text>
        <Card.Divider />
        <View style={styles.viewDetails}>
          <Text>
            <Button
              title="View Details"
              onPress={() =>
                navigation.navigate("TrailDetail", {
                  trail,
                })
              }
            />
          </Text>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  viewDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
});
