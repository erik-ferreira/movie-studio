import { Image } from "react-native";
import { useTheme } from "styled-components";
import { EnvelopeSimple, Lock } from "phosphor-react-native";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { TextNavigate } from "../../components/TextNavigate";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";

import logoImg from "../../assets/logo.png";

import {} from "./styles";

export function Login() {
  const { colors } = useTheme();

  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

      <Input
        label="Endereço de e-mail:"
        placeholder="jondoe@example.com"
        IconLeft={<EnvelopeSimple size={24} color={colors.gray500} />}
      />
      <Input
        label="Sua senha:"
        placeholder="***********"
        IconLeft={<Lock size={24} color={colors.gray500} />}
      />
      <Button title="Entrar" style={{ marginTop: 12 }} />

      <TextNavigate
        label="Esqueceu sua senha?"
        style={{ marginVertical: 16 }}
      />
      <TextNavigate label="Não possuí conta? Crie uma agora!" />
    </SafeAreaBackground>
  );
}
