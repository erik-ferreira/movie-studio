import * as zod from "zod";
import { Image } from "react-native";
import { useTheme } from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  async function handleSignIn(data: SignInFormData) {
    console.log(data);
    // try {
    //   const response = await signInWithEmailAndPassword(
    //     auth,
    //     "jasda@gmail.com",
    //     "123456"
    //   );
    //   console.log(response);
    // } catch (error) {
    //   const message = error?.message.substring(17, 36);
    //   console.log(message);
    // }
  }

  // console.log("errors", errors);

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
