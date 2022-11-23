import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Alert } from "react-native";
import { auth } from "../services/firebase";
import { useTheme } from "styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { EnvelopeSimple } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import { Input } from "../components/Input";
import { Title } from "../components/Title";
import { Button, Button2 } from "../components/Button";
import { SafeAreaBackground } from "../components/SafeAreaBackground";

import { cutMessageErrorFirebase } from "../utils";

import logoImg from "../assets/logo.png";

const signInSchema = zod.object({
  email: zod
    .string({ required_error: "Email obrigatório" })
    .email("Email incorreto."),
});

type SignInFormData = zod.infer<typeof signInSchema>;

export function Redefinir() {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const [loadingResetAccount, setLoadingResetAccount] = useState(false);

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

  async function handleResetAccount(data: SignInFormData) {
    try {
      setLoadingResetAccount(true);

      await sendPasswordResetEmail(auth, data?.email);

      Alert.alert(
        "",
        "Um email será enviado para redefinir sua senha. Verifique a caixa de entrada."
      );
      reset();
      navigation.goBack();
    } catch (error) {
      console.log(error);
      const message = cutMessageErrorFirebase(error?.message);
      let messageAlert = "";

      // validações do firebase
      if (message === "auth/too-many-requests") {
        messageAlert =
          "Tentativas de recuperação de senha excedidas. Aguarde um tempo e tente novamente";
      } else if (message === "auth/user-not-found") {
        messageAlert = "Esse email não está cadastrado na nossa plataforma.";
      } else {
        messageAlert =
          "Ocorreu um problema ao realizar o login, tente novamente!";
      }

      Alert.alert("", messageAlert);
    } finally {
      setLoadingResetAccount(false);
    }
  }

  function handleNavigateScreenLogin() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

      <Title text="Redefinir senha" />

      <Input
        name="email"
        control={control}
        label="E-mail:"
        placeholder="jondoe@example.com"
        error={errors?.email?.message}
        IconLeft={<EnvelopeSimple size={24} color={colors.gray500} />}
        keyboardType="email-address"
      />

      <Button
        title="Enviar"
        style={{ marginTop: 12 }}
        loading={loadingResetAccount}
        onPress={handleSubmit(handleResetAccount)}
      />
      <Button2
        title="Cancelar"
        style={{ marginTop: 12 }}
        onPress={handleNavigateScreenLogin}
      />
    </SafeAreaBackground>
  );
}
