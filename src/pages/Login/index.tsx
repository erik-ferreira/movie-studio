import { Text, View, Image, TextInput } from "react-native";

import { SafeAreaBackground } from "../../components/SafeAreaBackground";

import logoImg from "../../assets/logo.png";

import { Block, Label, Input } from "./styles";

export function Login() {
  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

      <Block>
        <Label>Endereço de e-mail:</Label>
        <Input />
      </Block>
    </SafeAreaBackground>
  );
}
