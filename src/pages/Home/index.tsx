import { View, FlatList } from "react-native";

import { CardMovie } from "../../components/CardMovie";
import { InputFilter } from "../../components/InputFilter";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";

export function Home() {
  const list = [1, 2, 3, 4, 5, 6];

  return (
    <SafeAreaBackground minimizePadding isScreenMovies>
      <InputFilter placeholder="Pesquisar..." />

      <FlatList
        data={list}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <CardMovie />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          marginTop: 10,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 10 }} />
        )}
      />
    </SafeAreaBackground>
  );
}
