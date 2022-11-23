import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "../components/Header";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";
import { Redefinir } from "../pages/Redefinir";

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: (props) => <Header title={props.route?.name} />,
        }}
      >
        <Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
         <Screen
          name="Redefinir"
          component={Redefinir}
          options={{ headerShown: false }}
        />
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}
