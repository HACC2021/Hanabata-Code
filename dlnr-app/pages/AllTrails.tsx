// import { NavigationContainer, StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";
import { useUserInfo } from "../services/useUserInfo";
import { SearchBar, ListItem, Avatar, Card } from "react-native-elements";
import { useNavigationState } from "@react-navigation/core";
import { getTrails } from "../services/apiService";

const trailImage =
  "https://www.hawaiianbeachrentals.com/images/products/thingtodo/p215/p215_zoom_53de8ce1407766.06780368.jpg";

const Search = (props) => {
  const onChange = (text) => {
    props.setSearch(text);
    props.setResult(props.trails.filter((trail) => trail.name.includes(text)));
  };

  return (
    <SearchBar
      inputStyle={{ backgroundColor: "white" }}
      containerStyle={{
        backgroundColor: "#f0f8fc",
          borderBottomColor: "#f0f8fc",
      }}
      inputContainerStyle={{ backgroundColor: "white" }}
      placeholder={"Search"}
      onBlur={undefined}
      onChangeText={onChange as any}
      onFocus={undefined}
      value={props.search}
      platform={"default"}
      clearIcon={undefined}
      searchIcon={undefined}
      loadingProps={undefined}
      showLoading={undefined}
      onClear={undefined}
      onCancel={undefined}
      lightTheme={true}
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    navState.routeNames[navState.index] === "AllTrails" &&
      getTrails().then((res) => {
        console.log("AllTrails");

        let dayOfWeek = new Date().getDay() - 1;
        let hour = new Date().getHours();
        let tempDayOfWeek = dayOfWeek;
        let color = "#AAAAAA";
        let busyValue;
        let points;

        const newTrails = res.map((trail) => {
          dayOfWeek < 0 && (tempDayOfWeek = 6);
          if (trail.traffics?.google) {
            busyValue = trail.traffics.google[tempDayOfWeek].data[hour];
            if (busyValue < 25) {
              color = "#00FF00";
              points = 100;
            } else if (busyValue < 60) {
              color = "#00FFFF";
              points = 80;
            } else if (busyValue < 80) {
              color = "#FFA500";
              points = 50;
            } else {
              color = "#FF0000";
              points = 20;
            }
            trail.color = color;
            trail.points = points;
          } else {
            color = "#AAAAAA";
            points = 0;
            trail.color = color;
            trail.points = points;
          }
          return trail;
        });

        setData({
          type: "ALL_TRAILS",
          payload: {
            trails: newTrails,
          },
        });
      });
    setSearch("");
    setResult(undefined);
  }, [navState.index]);

  return (
    <SafeAreaView style={styles.container}>
      <Search
        trails={data.trails}
        setResult={setResult}
        search={search}
        setSearch={setSearch}
      />
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
      <Card containerStyle={{ borderWidth: 0, }}>
        <Card.Title>{trail.name}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: trail.image || trailImage }}></Card.Image>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>{trail.description}</Text>
        <Card.Divider />
        <View>
          <Button
            title="View Details"
            //color="white"
            onPress={() =>
              navigation.navigate("TrailDetail", {
                trail,
              })
            }
          />
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: "#f0f8fc",
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
});
