import { NavigationContainer, StackActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import TrailDetail from "./TrailDetail";
import { useUserInfo } from "../services/useUserInfo";
import { SearchBar } from "react-native-elements";

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
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("TrailDetail", {
          trail,
        })
      }
    >
      <View style={styles.item}>
        <Text style={styles.title}>{trail.name}</Text>
      </View>
    </TouchableHighlight>
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
    fontSize: 32,
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
