import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Alert } from "react-native";
import { useTheme } from "styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EnvelopeSimple, Lock } from "phosphor-react-native";

import { auth } from "../services/firebase";

import { Input } from "../components/Input";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { TextNavigate } from "../components/TextNavigate";
import { SafeAreaBackground } from "../components/SafeAreaBackground";

import logoImg from "../assets/logo.png";

import { cutMessageErrorFirebase } from "../utils";

const signInSchema = zod.object({
  email: zod
    .string({ required_error: "Email obrigatório" })
    .email("Email incorreto."),
  password: zod
    .string({ required_error: "Senha obrigatória" })
    .min(6, "Senha precisa ter pelo menos 6 caracteres"),
});

type SignInFormData = zod.infer<typeof signInSchema>;

export function Login() {
  const { colors } = useTheme();
  // navegação de telas
  const navigation = useNavigation();

  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const {
    // conectar o input
    control,
    // para enviar os dados
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    // validações aqui
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  // ignora por em quanto
  async function handleSignIn(data: SignInFormData) {
    try {
      setLoadingSignIn(true);

      await signInWithEmailAndPassword(
        auth,
        data?.email.trim(),
        data?.password.trim()
      );

      reset();
      navigation.navigate("Home");
    } catch (error) {
      console.log("erro", error);
      const message = cutMessageErrorFirebase(error?.message);
      let messageAlert = "";

      // validações do firebase
      if (message === "auth/wrong-password") {
        messageAlert = "Senha incorreta";
      } else if (message === "auth/user-not-found") {
        messageAlert = "Usuário não encontrado";
      } else if (message === "auth/too-many-requests") {
        messageAlert =
          "Tentativas de login excedidas. Aguarde um tempo e tente novamente";
      } else {
        messageAlert =
          "Ocorreu um problema ao realizar o login, tente novamente!";
      }

      Alert.alert("", messageAlert);
    } finally {
      setLoadingSignIn(false);
    }
  }

  // função para navegar para a tela de cadastro
  function handleNavigateScreenCadastro() {
    navigation.navigate("Cadastro");
  }

  function handleNavigateScreenRedefinir() {
    navigation.navigate("Redefinir");
  }

  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

      <Title text="Entrar" />

      <Input
        name="email"
        control={control}
        label="Endereço de e-mail:"
        placeholder="jondoe@example.com"
        IconLeft={<EnvelopeSimple size={24} color={colors.gray500} />}
        error={errors?.email?.message}
        keyboardType="email-address"
      />
      <Input
        name="password"
        control={control}
        label="Sua senha:"
        placeholder="***********"
        IconLeft={<Lock size={24} color={colors.gray500} />}
        error={errors?.password?.message}
        isPassword
      />
      <Button
        title="Entrar"
        style={{ marginTop: 12 }}
        loading={loadingSignIn}
        onPress={handleSubmit(handleSignIn)}
      />

      <TextNavigate
        label="Esqueceu sua senha?"
        style={{ marginVertical: 16 }}
        onPress={handleNavigateScreenRedefinir}
      />
      <TextNavigate
        label="Não possuí conta? Crie uma agora!"
        onPress={handleNavigateScreenCadastro}
      />
    </SafeAreaBackground>
  );
}
