import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";
import { useLogin } from "../services/useLogin";
import { useUserInfo } from "../services/useUserInfo";

const Login = ({ navigation }) => {
  const [id, onChangeId] = React.useState("");
  const [passwords, onChangePasswords] = React.useState(null);

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

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        value={id}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePasswords}
        value={passwords}
        secureTextEntry={true}
        placeholder="Passwords"
      />
      <Button onPress={onLogin} title="Login" color="#841584" />
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

export default Login;
