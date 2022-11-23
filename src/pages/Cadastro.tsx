import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Alert } from "react-native";
import { useTheme } from "styled-components";
import { EnvelopeSimple, Lock } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../services/firebase";
import { cutMessageErrorFirebase } from "../utils";
import { createUserWithEmailAndPassword } from "firebase/auth";

import logoImg from "../assets/logo.png";

import { Input } from "../components/Input";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { TextNavigate } from "../components/TextNavigate";
import { SafeAreaBackground } from "../components/SafeAreaBackground";

const signInSchema = zod.object({
  email: zod
    .string({ required_error: "Email obrigatório" })
    .email("Email incorreto."),
  password: zod
    .string({ required_error: "Senha obrigatória" })
    .min(6, "Senha precisa ter pelo menos 6 caracteres"),
});

type SignInFormData = zod.infer<typeof signInSchema>;

export function Cadastro() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [loadingRegister, setLoadingRegister] = useState(false);

  const {
    // conectar o input
    control,
    // para enviar os dados
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    // validações aqui
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  async function handleCreateAccount(data: SignInFormData) {
    // createUserWithEmailAndPassword
    try {
      setLoadingRegister(true);

      await createUserWithEmailAndPassword(auth, data?.email, data?.password);

      Alert.alert("", "Conta registrada com sucesso");
      reset();
      navigation.goBack();
    } catch (error) {
      const message = cutMessageErrorFirebase(error?.message);
      let messageAlert = "";

      // validações do firebase
      if (message === "auth/too-many-requests") {
        messageAlert =
          "Tentativas de cadastro excedidas. Aguarde um tempo e tente novamente";
      } else {
        messageAlert =
          "Ocorreu um problema ao realizar o cadastro, tente novamente!";
      }

      Alert.alert("", messageAlert);
    } finally {
      setLoadingRegister(false);
    }
  }

  function handleNavigateScreenLogin() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

      <Title text="Cadastro" />

      <Input
        name="email"
        control={control}
        label="E-mail:"
        placeholder="jondoe@example.com"
        error={errors?.email?.message}
        IconLeft={<EnvelopeSimple size={24} color={colors.gray500} />}
        keyboardType="email-address"
      />

      <Input
        name="password"
        control={control}
        label="Senha:"
        placeholder="***********"
        error={errors?.password?.message}
        IconLeft={<Lock size={24} color={colors.gray500} />}
        isPassword
      />

      <Button
        title="Cadastrar"
        style={{ marginTop: 12 }}
        loading={loadingRegister}
        onPress={handleSubmit(handleCreateAccount)}
      />

      <TextNavigate
        label="Ja possuí conta?Faça o login"
        style={{ marginVertical: 18 }}
        onPress={handleNavigateScreenLogin}
      />
    </SafeAreaBackground>
  );
}
