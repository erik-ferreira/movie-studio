import * as zod from "zod";
import { Image, Alert } from "react-native";
import { useTheme } from "styled-components";
import { User, EnvelopeSimple, Lock } from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    .email("Email incorreto."),
  password: zod
    .string({ required_error: "Senha obrigatória" })
    .min(6, "Senha precisa ter pelo menos 6 caracteres"),
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
     // redefinir
    // createUserWithEmailAndPassword

   
  }

  function handleNavigateScreenLogin(){

    navigation.navigate("Login");

  }


  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

 
      <Input
        name = " email "
        control = {control}
        label="E-mail:"
        placeholder="jondoe@example.com"
        error={errors?.email?.message}
        IconLeft={<EnvelopeSimple size={24} color={colors.gray500}
         />}
      />

      <Button title="Enviar"
       style={{ marginTop: 12 }} 
       onPress={handleSubmit(handleCreateAccount)}
       />
       <Button2 title="Cancelar"
       style={{ marginTop: 12  }} 
       onPress={handleNavigateScreenLogin}
       />

    </SafeAreaBackground>
  );
}




