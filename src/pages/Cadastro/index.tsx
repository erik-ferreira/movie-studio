import * as zod from "zod";
import { Image, Alert } from "react-native";
import { useTheme } from "styled-components";
import { EnvelopeSimple, Lock } from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../services/firebase";
import { cutMessageErrorFirebase } from "../../utils";
import { createUserWithEmailAndPassword } from "firebase/auth";

import logoImg from "../../assets/logo.png";

import { Input } from "../../components/Input";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";
import { Button } from "../../components/Button";
import { TextNavigate } from "../../components/TextNavigate";

import {} from "./styles";


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

  const {
    // conectar o input
    control,
    // para enviar os dados
    handleSubmit,
    formState: { errors },
  } = useForm <SignInFormData>({
    // validações aqui
    resolver: zodResolver(signInSchema),
    mode: "all",
  });
  

  async function handleCreateAccount(data: SignInFormData) {
    // createUserWithEmailAndPassword
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );

      console.log("deu certo", response);
    } catch (error) {
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
    }
  }

  function handleNavigateScreenLogin(){

    navigation.navigate("Login");

  }

  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

 
      <Input
        name = "email"
        control = {control}
        label="E-mail:"
        placeholder="jondoe@example.com"
        error={errors?.email?.message}
        IconLeft={<EnvelopeSimple size={24} color={colors.gray500}
         />}
      />

      <Input
        name = "password"
        control = {control}
        label="Senha:"
        placeholder="***********"
        error={errors?.password?.message}
        IconLeft={<Lock size={24} color={colors.gray500} />}
        isPassword
      />

      <Button title="Cadastrar"
       style={{ marginTop: 12 }} 
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


