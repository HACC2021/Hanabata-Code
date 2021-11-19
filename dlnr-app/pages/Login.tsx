import React, { useEffect } from "react";
import {SafeAreaView, StyleSheet, Image } from "react-native";
import { Input, Button } from 'react-native-elements';
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
      <>
          <Image source={require('../assets/logo_hit.jpeg')} style={{borderRadius: 8, height:200, width:200, alignItems: "center", marginTop: 60, marginBottom: 40, alignSelf:"center"}}/>
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: -150 }}
    >
      <Input
        label="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope', color:'grey' }}
        style={{ width: 20 }}
        onChangeText={onChangeId}
        value={id}
        placeholder="  email@address.com"
      />
      <Input
        label="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock', color:'grey' }}
        style={{ width: 20 }}
        onChangeText={onChangePasswords}
        value={passwords}
        secureTextEntry={true}
        placeholder="    Passwords"

      />
      <Button
          onPress={onLogin}
          title="Login"
          style={styles.button}
      />
    </SafeAreaView></>
  );
};

const styles = StyleSheet.create({
  input: {
    //height: 40,
    width: 1,
    //margin: 12,
    //borderWidth: 1,
    //padding: 10,
  },
    button: {
      width: 300,
      margin: 12,
    },
});

export default Login;
