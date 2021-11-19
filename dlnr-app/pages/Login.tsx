import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { useLogin } from "../services/useLogin";
import { useUserInfo } from "../services/useUserInfo";

const Login = ({ navigation }) => {
  const [id, onChangeId] = React.useState("");
  const [passwords, onChangePasswords] = React.useState(null);
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  const { state: data, dispatch: setData } = useUserInfo();

  const onLogin = () => {
    useLogin(id, passwords).then((res) => {
      setData({
        type: "LOGIN",
        payload: { userInfo: res },
      });
    });
  };

  useEffect(() => {
    data.userInfo && navigation.navigate("Home");
  }, [data]);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {keyboardStatus ? <View style={{flex: 0.2}}></View>:(
            <Image
              source={require("../assets/logo_hit.jpeg")}
              style={{
                borderRadius: 8,
                height: 200,
                width: 200,
                alignItems: "center",
                marginTop: 60,
                marginBottom: 60,
                alignSelf: "center",
              }}
            />
          )}
          <View style={{ flex: 1, width: "80%" }}>
            <Input
              label="Email"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "grey",
              }}
              onChangeText={onChangeId}
              value={id}
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
              onChangeText={onChangePasswords}
              value={passwords}
              secureTextEntry={true}
              placeholder="    Passwords"
            />
            <Button onPress={onLogin} title="Login" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 1,
  },
  button: {
    width: "100%",
    margin: 12,
    padding: 40,
  },
});

export default Login;
