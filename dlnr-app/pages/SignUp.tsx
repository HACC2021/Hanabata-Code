import { registerUser } from "../services/authenticationService";
import React, { useEffect } from "react";
import { View, StyleSheet, TextInput, Image, Text, Keyboard } from "react-native";
import { Input, Button } from "react-native-elements";
import { useUserInfo } from "../services/useUserInfo";

const SignUp = ({ navigation }) => {
  const [email, onChangeId] = React.useState("");
  const [errorMessage, onErrorChanged] = React.useState("");
  const [passwords, setPasswords] = React.useState(null);
  const [rePasswords, setRePasswords] = React.useState(null);
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);

  const { state: data, dispatch: setData } = useUserInfo();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onSignUp = () => {
    if (email.length > 5 && passwords === rePasswords) {
      registerUser(email, passwords).then((res) => {
        if (res.error) {
          onErrorChanged(res.message);
        }
        else {
          setData({
            type: "LOGIN",
            payload: { userInfo: res },
          });
        }
      }).catch(e => {
        console.error(e);
        onErrorChanged("A communication error occurred");
      });
    } else {
      onErrorChanged("Please check your email or passwords");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!keyboardStatus && (
        <Image
          source={require("../assets/logo_hit.jpeg")}
          style={{
            borderRadius: 8,
            height: 200,
            width: 200,
            alignItems: "center",
            marginTop: 60,
            marginBottom: 30,
            alignSelf: "center",
          }}
        />
      )}
      <View style={{ flex: 1, width: "80%" }}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope", color: "grey" }}
          onChangeText={onChangeId}
          value={email}
          placeholder="  email@address.com"
        />
        <Input
          label="Password"
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            color: "grey",
            size: 30,
          }}
          onChangeText={setPasswords}
          value={passwords}
          secureTextEntry={true}
          placeholder="    Passwords"
        />
        <Input
          label="Password"
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            color: "grey",
            size: 30,
          }}
          onChangeText={setRePasswords}
          value={passwords}
          secureTextEntry={true}
          placeholder="    Re-Enter Passwords"
        />
      { 
        errorMessage != null && <Text style={{ color: 'red' }}>{ errorMessage }</Text> 
      }
        <Button
          onPress={onSignUp}
          title="Sign Up"
          style={{ flex: 1, width: 100, maxWidth: 500 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignUp;
