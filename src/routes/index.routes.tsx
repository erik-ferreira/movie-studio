import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "../components/Header";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";
import { Favoritos } from "../pages/Favoritos";

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: (props) => (
            <Header
              title={props.route?.name}
              hideButtonRight={props?.route?.name === "Favoritos"}
              isButtonBackInLeft={props?.route?.name === "Favoritos"}
            />
          ),
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
        <Screen name="Home" component={Home} />
        <Screen name="Favoritos" component={Favoritos} />
      </Navigator>
    </NavigationContainer>
  );
}
