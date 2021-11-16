import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";
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
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        value={id}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPasswords}
        value={passwords}
        secureTextEntry={true}
        placeholder="Enter Passwords"
      />
      <TextInput
        style={styles.input}
        onChangeText={setRePasswords}
        value={rePasswords}
        secureTextEntry={true}
        placeholder="Re-Enter Passwords"
      />
      <Button onPress={onSignUp} title="Sign Up" color="#841584" />
    </SafeAreaView>
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
