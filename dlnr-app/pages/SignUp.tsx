import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, Button } from "react-native";
import { registerUser } from "../services/authenticationService";
import { useUserInfo } from "../services/useUserInfo";

const SignUp = ({ navigation }) => {
  const [email, onChangeId] = React.useState("");
  const [errorMessage, onErrorChanged] = React.useState("");
  const [passwords, setPasswords] = React.useState(null);
  const [rePasswords, setRePasswords] = React.useState(null);

  const { state: data, dispatch: setData } = useUserInfo();

  const onSignUp = () => {
    if (passwords === rePasswords) {
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
      onErrorChanged("Passwords didn't match");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        autoCapitalize='none'
        value={email}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPasswords}
        autoCapitalize='none'
        value={passwords}
        secureTextEntry={true}
        placeholder="Enter Passwords"
      />
      <TextInput
        style={styles.input}
        onChangeText={setRePasswords}
        autoCapitalize='none'
        value={rePasswords}
        secureTextEntry={true}
        placeholder="Re-Enter Passwords"
      />
      { errorMessage && <Text style={{ color: "red" }}>{ errorMessage }</Text> }
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
