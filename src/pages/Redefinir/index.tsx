import * as zod from "zod";
import { Image, Alert } from "react-native";
import { useTheme } from "styled-components";
import { User, EnvelopeSimple, Lock } from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../../services/firebase";
import { cutMessageErrorFirebase } from "../../utils";
import { signInWithEmailAndPassword } from "firebase/auth";

import logoImg from "../../assets/logo.png";

import { Input } from "../../components/Input";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";
import { Button, Button2 } from "../../components/Button";
import { TextNavigate } from "../../components/TextNavigate";

import {} from "./styles";


const signInSchema = zod.object({
  email: zod
    .string({ required_error: "Email obrigatório" })
    .email("Email incorreto.")
});

type SignInFormData = zod.infer<typeof signInSchema>;

export function Redefinir() {
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

  async function handleResetAccount(data: SignInFormData) {
    // sendPasswordResetEmail
    try {
      const response = await sendPasswordResetEmail(
        auth,
        data?.email
      );

      console.log("deu certo", response);
    } catch (error) {
      const message = cutMessageErrorFirebase(error?.message);
      let messageAlert = "";

      // validações do firebase
      if (message === "auth/wrong-password") {
        messageAlert = "Email incorreta";
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

      <Button title="Enviar"
       style={{ marginTop: 12 }} 
       onPress={handleSubmit(handleResetAccount)}
       />
       <Button2 title="Cancelar"
       style={{ marginTop: 12  }} 
       onPress={handleNavigateScreenLogin}
       />

    </SafeAreaBackground>
  );
}




