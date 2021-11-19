import * as React from "react";
import { Input } from "react-native-elements";
import { useUserInfo } from "../services/useUserInfo";

export default function Account({ navigation }) {
  const { state: data, dispatch: setData } = useUserInfo();

  return <Input placeholder="INPUT" />;
}
