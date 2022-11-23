import { useState, useCallback, useEffect } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MovieDTO } from "../../dtos/MovieDTO";

import { getMoviesUpComing } from "../../requests";

import { Loading } from "../../components/Loading";
import { CardMovie } from "../../components/CardMovie";
import { InputFilter } from "../../components/InputFilter";
import { SafeAreaBackground } from "../../components/SafeAreaBackground";

interface PaginationProps {
  page: number;
  total_pages: number;
}

export function Home() {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [moviesFavorites, setMoviesFavorites] = useState<MovieDTO[]>([]);
  const idsMoviesFavorites = moviesFavorites.map((movie) => movie.id);
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    total_pages: 1,
  });

  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);

  const filterMoviesBySearch = !!searchMovie
    ? movies
        .map((movie) =>
          movie.title.toLowerCase().includes(searchMovie.toLowerCase())
            ? movie
            : null
        )
        .filter(Boolean)
    : [...movies];

  async function onLoadMoviesUpComing(loadMore = false) {
    try {
      if (loadMore) {
        setLoadingMoreMovies(true);
      } else {
        setLoadingMovies(true);
      }

      const response = await getMoviesUpComing({
        page: loadMore ? pagination.page + 1 : 1,
      });

      if (response.status === 200) {
        const { results, page, total_pages } = response?.data;

        setMovies((prevState) => [...prevState, ...results]);
        setPagination({
          page,
          total_pages,
        });
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert("Não foi possível buscar os filmes");
    } finally {
      if (loadMore) {
        setLoadingMoreMovies(false);
      } else {
        setLoadingMovies(false);
      }
    }
  }

  async function toggleMovieFavorite(movie: MovieDTO) {
    const movieIsFavorite = moviesFavorites.some(
      (movieFavorite) => movieFavorite.id === movie.id
    );
    let listMoviesUpdated: MovieDTO[] = [];
    if (movieIsFavorite) {
      listMoviesUpdated = moviesFavorites.filter(
        (movieFavorite) => movieFavorite.id !== movie.id
      );
    } else {
      listMoviesUpdated = [...moviesFavorites, movie];
    }

    setMoviesFavorites(listMoviesUpdated);
    await AsyncStorage.setItem(
      "@MOVIE_STUDIO:favorites",
      JSON.stringify(listMoviesUpdated)
    );
  }

  async function getMoviesFavorites() {
    const moviesFavorites = await AsyncStorage.getItem(
      "@MOVIE_STUDIO:favorites"
    );
    if (moviesFavorites) {
      setMoviesFavorites(JSON.parse(moviesFavorites));
    }
  }

  function clearFields() {
    setSearchMovie("");
    setMovies([]);
    setMoviesFavorites([]);
    setPagination({ page: 1, total_pages: 1 });
    setLoadingMovies(false);
    setLoadingMoreMovies(false);
  }

  useFocusEffect(
    useCallback(() => {
      onLoadMoviesUpComing();
      getMoviesFavorites();

      return () => {
        clearFields();
      };
    }, [])
  );

  return (
    <SafeAreaBackground minimizePadding isScreenMovies>
      <InputFilter
        placeholder="Pesquisar..."
        value={searchMovie}
        onChangeText={setSearchMovie}
      />

      {loadingMovies ? (
        <View style={{ marginTop: 20 }}>
          <Loading />
        </View>
      ) : (
        <FlatList
          data={filterMoviesBySearch}
          keyExtractor={(movie) => movie.id.toString()}
          renderItem={({ item: movie }) => (
            <CardMovie
              movie={movie}
              isMovieFavorite={idsMoviesFavorites.includes(movie.id)}
              onPressFavorite={() => toggleMovieFavorite(movie)}
            />
          )}
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
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (!searchMovie) {
              onLoadMoviesUpComing(true);
            }
          }}
          ListFooterComponent={
            loadingMoreMovies ? (
              <View style={{ marginTop: 20 }}>
                <Loading />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaBackground>
  );
}
