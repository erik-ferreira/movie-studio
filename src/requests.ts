import axios from "axios";

import { MovieDTO } from "./dtos/MovieDTO";

const apiKeyMovieDB = "2e197f6f1cb05c42e43b100e12936b69";
const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

interface ReturnGetMovies {
  page: number;
  results: MovieDTO[];
}

export async function getMoviesUpComing() {
  const response = await api.get<ReturnGetMovies>(
    `/movie/upcoming?api_key=${apiKeyMovieDB}`
  );

  return response;
}

export function getUrlMovie(pathImage: string) {
  const urlMovie = `https://image.tmdb.org/t/p/w342/${pathImage}`;

  return urlMovie;
}
