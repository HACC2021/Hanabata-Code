import React from "react";
import { View, StyleSheet, TextInput, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import { registerUser } from "../services/useLogin";
import { useUserInfo } from "../services/useUserInfo";

const SignUp = ({ navigation }) => {
  const [id, onChangeId] = React.useState("");
  const [passwords, setPasswords] = React.useState(null);
  const [rePasswords, setRePasswords] = React.useState(null);

  const { state: data, dispatch: setData } = useUserInfo();

  const onSignUp = () => {
    if (passwords === rePasswords) {
      registerUser(id, passwords).then((res) => {
        setData({
          type: "LOGIN",
          payload: { userInfo: res },
        });
      });
    } else {
      console.log("error");
    }
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
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
        <View style={{flex: 1, width: "80%"} }>
            <Input
                label="Email"
                leftIcon={{ type: "font-awesome", name: "envelope", color: "grey" }}
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
