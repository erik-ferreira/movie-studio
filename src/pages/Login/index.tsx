import * as zod from "zod";
import { Image, Alert } from "react-native";
import { useTheme } from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EnvelopeSimple, Lock } from "phosphor-react-native";

import { auth } from "../../services/firebase";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { TextNavigate } from "../../components/TextNavigate";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";

import logoImg from "../../assets/logo.png";

import { cutMessageErrorFirebase } from "../../utils";

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

export function Login() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const {
    // conectar o input
    control,
    // para enviar os dados
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    // validações aqui
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  // ignora por em quanto
  async function handleSignIn(data: SignInFormData) {
    try {
      const response = await signInWithEmailAndPassword(
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

  return (
    <SafeAreaBackground>
      <Image source={logoImg} />

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
        onPress={handleSubmit(handleSignIn)}
      />

      <TextNavigate
        label="Esqueceu sua senha?"
        style={{ marginVertical: 16 }}
      />
      <TextNavigate label="Não possuí conta? Crie uma agora!" />
    </SafeAreaBackground>
  );
}
