import axios from "axios";

import { MovieDTO } from "./dtos/MovieDTO";

const apiKeyMovieDB = "2e197f6f1cb05c42e43b100e12936b69";
const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

interface ReturnGetMovies {
  page: number;
  results: MovieDTO[];
  total_pages: number;
}

interface ParamsGetMovies {
  page?: number;
}

export async function getMoviesUpComing(params?: ParamsGetMovies) {
  const response = await api.get<ReturnGetMovies>(
    `/movie/upcoming?api_key=${apiKeyMovieDB}&language=pt-BR&page=${
      params?.page || 1
    }`
  );

  return response;
}

export function getUrlMovie(pathImage: string) {
  const urlMovie = `https://image.tmdb.org/t/p/w342/${pathImage}`;

  return urlMovie;
}
