import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Login = () => {
  const [id, onChangeId] = React.useState("");
  const [passwords, onChangePasswords] = React.useState(null);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
