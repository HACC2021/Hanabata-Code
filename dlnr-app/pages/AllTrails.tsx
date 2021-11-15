// import { NavigationContainer, StackActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    Image, Button,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import TrailDetail from "./TrailDetail";
import { useUserInfo } from "../services/useUserInfo";
import {SearchBar, ListItem, Avatar, Card} from "react-native-elements";

const trailImage = [
    {
        defaultImage: "https://www.hawaiianbeachrentals.com/images/products/thingtodo/p215/p215_zoom_53de8ce1407766.06780368.jpg"
    }
]

export default function AllTrails({ navigation }) {
  const { state: userInfo } = useUserInfo();
  return (
    <SafeAreaView style={styles.container}>
      <Search/>
      <FlatList
        data={userInfo.trails}
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
            <Card.Divider/>
            <Card.Image source={{uri: trail.image} || {uri: trail.newTrail.image}}></Card.Image>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>
                {trail.description}
            </Text>
            <Card.Divider/>
            <View style={styles.viewDetails}>
            <Text><Button title="View Details"
                          onPress={() =>
                            navigation.navigate("TrailDetail", {
                                trail,
                            })
                          }/>
            </Text></View>
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
      alignItems: 'center',
  },
});

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={setSearch as any}
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
