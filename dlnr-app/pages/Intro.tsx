import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import Swiper from "react-native-swiper";

const Intro = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://github.com/yejihan92/digits-1/blob/master/app/public/images/home_image2.jpeg?raw=true",
        }}
        style={styles.bgImage}
      >
        <Text style={styles.title}>Welcome to HIT</Text>
      </ImageBackground>
        <Swiper style={styles.wrapper} loop={false}>
          <View style={styles.slide1}>
            <Text style={styles.header}>What can you do on HIT?</Text>
              <Text style={styles.regFont}>
                {"\n"}1. Confirm the geographical location of hiking trails through the map provided on our app.
              </Text>
              <Text style={styles.regFont}>
                2. Get detailed information on each hiking trails pinned on the
                map such as difficulty or operating hours.
              </Text>
              <Text style={styles.regFont}>
                3. Share your experiences on hiking trails where you have visited
                with other people using our app.{"\n"}
              </Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.header}>Hiking Trail Etiquette 101</Text>
            <Text style={styles.regFont}>
              {"\n"}1. Know your right of way. {"\n"}
              2. Do not disturb wildlife.{"\n"}
              3. Be mindful of trail conditions and your surroundings.{"\n"}
              4. Be aware of your surroundings.{"\n"}
              5. Stay on the trail.{"\n"}
              {"\n"}
              <Text
                style={styles.hyperlink}
                onPress={() =>
                  Linking.openURL(
                    "https://www.nps.gov/articles/hikingetiquette.htm"
                  )
                }
              >
                Visit National Park Service website for more info.{"\n"}
                {"\n"}
              </Text>
            </Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.header3}>{"\n"}Credits</Text>
            <Text style={styles.regFont}>
              HIT was coded by Yong Kim, Keith Okuna, Yeji Han,
              Cheolhoon Choi, Kai Hwang.{"\n"}
              {"\n"}
              HIT was designed as part of Hawaii Annual Code Challenge
              (HACC).{"\n"}
              {"\n"}
              HIT was developed using React Native, an open-source UI
              software framework created by Meta Platforms, inc.{"\n"}
              {"\n"}
              GitHub URL:{"\n"}
              <Text
                style={styles.hyperlink}
                onPress={() =>
                  Linking.openURL("https://github.com/HACC2021/Hanabata-Code")
                }
              >
                https://github.com/HACC2021/Hanabata-Code {"\n"}
                {"\n"}
              </Text>
            </Text>
          </View>
        </Swiper>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: 40,
    position: "absolute", // child
    bottom: "5%", // position where you want
    shadowOpacity: 10,
  },
  bgImage: {
    height: 300,
    width: "100%",
    position: "relative", // because it's parent
    textAlign: "center",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#1e436b",
    paddingTop: 20,
  },
  header3: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#17203d",
    paddingTop: 2,
    paddingBottom: 10,
  },
  regFont: {
    fontSize: 15,
    color: "#778798",
    fontWeight: "bold",
    padding: 9,
  },
  hyperlink: {
    fontSize: 15,
    color: "blue",
    textDecorationLine: "underline",
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5f7f9",
    padding: 20,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5f7f9",
    padding: 20,
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5f7f9",
    padding: 20,
  },
});
