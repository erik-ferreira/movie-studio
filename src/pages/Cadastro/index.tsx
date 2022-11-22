import { Image } from "react-native";
import { useTheme } from "styled-components";
import { User, EnvelopeSimple, Lock } from "phosphor-react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";

import logoImg from "../../assets/logo.png";

import { Input } from "../../components/Input";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";
import { Button } from "../../components/Button";
import { TextNavigate } from "../../components/TextNavigate";

import {} from "./styles";

export function Cadastro() {
  const { colors } = useTheme();

  function handleCreateAccount() {
    // createUserWithEmailAndPassword
  }

  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

      <Input
        label="Nome:"
        placeholder="jondoe"
        IconLeft={<User size={24} color={colors.gray500} />}
      />
      <Input
        label="E-mail:"
        placeholder="jondoe@example.com"
        IconLeft={<EnvelopeSimple size={24} color={colors.gray500} />}
      />
      <Input
        label="Senha:"
        placeholder="***********"
        IconLeft={<Lock size={24} color={colors.gray500} />}
      />

      <Button title="Cadastrar" style={{ marginTop: 12 }} />

      <TextNavigate
        label="Ja possuí conta?Faça o login"
        style={{ marginVertical: 18 }}
      />
    </SafeAreaBackground>
  );
}
