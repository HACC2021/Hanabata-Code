import React from 'react';
import { Text, View, Image, ImageBackground, ScrollView, StyleSheet, SafeAreaView, StatusBar} from 'react-native';

const Intro = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
        style={styles.scrollView}
      >
   <ImageBackground
 source={{ uri: 'https://www.journeyera.com/wp-content/uploads/2016/04/DSC08316-scaled-2048x1366.jpg'}}
 style={styles.bgImage}
>
 <Text
   style={styles.title}
 >
   Welcome to HITT App!
 </Text>
</ImageBackground>

<View
style={{
  top: '5%',
  left: 10,
}}>
<Text
  style={styles.header}
>
  What can you do on our app?
</Text>
<Text
  style={styles.regFont}>
{"\n"}1. Confirm the geographical location of hiking trails through the map provided on our app.{"\n"}
2. Get detailed information on each hiking trails pinned on the map such as difficulty or operating hours.{"\n"}
3. Share your experiences on hiking trails where you have visited with other people using our app.{"\n"}{"\n"}
</Text>
<Text
  style={styles.header}
>
  Hiking Trail Etiquette 101
</Text>
<Text
  style={styles.regFont}>
{"\n"}1. Know your right of way. {"\n"}
2. Do not disturb wildlife.{"\n"}
3. Be mindful of trail conditions and your surroundings.{"\n"}
4. Be aware of your surroundings.{"\n"}
5. Stay on the trail.{"\n"}
</Text>
<Text>
Lorem ipsum dolor sit amet. Est modi enim 33 voluptatem fugiat et iusto ipsa ut rerum sunt? Hic voluptas nemo qui itaque accusamus ut blanditiis vero ab voluptas dolor in ipsum cumque qui quasi dicta et accusantium nulla! Est tempora consectetur sed eius sint aut totam voluptas qui eius saepe et laborum galisum.
</Text>
<Text>
Lorem ipsum dolor sit amet. Est modi enim 33 voluptatem fugiat et iusto ipsa ut rerum sunt? Hic voluptas nemo qui itaque accusamus ut blanditiis vero ab voluptas dolor in ipsum cumque qui quasi dicta et accusantium nulla! Est tempora consectetur sed eius sint aut totam voluptas qui eius saepe et laborum galisum.
</Text>
</View>

</ScrollView>
</SafeAreaView>


  )
}


export default Intro;

const styles = StyleSheet.create({

  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    position: 'absolute', // child
    bottom: '25%', // position where you want
  },
  bgImage: {
    height: 300,
    width: '100%',
    position: 'relative', // because it's parent
    textAlign: 'center',
    alignItems: 'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  regFont: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    height: '20%',
    margin: 10,
    alignSelf: 'center',
    padding: 20,
    //borderWidth: 5,
    //borderRadius: 5,
    //borderColor: 'black',
    backgroundColor: 'lightblue'
  }
});
