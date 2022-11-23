// -------- configs --------
import axios from "axios";

import { MovieDTO, ImagesMovie } from "./dtos/MovieDTO";

const apiKeyMovieDB = "2e197f6f1cb05c42e43b100e12936b69";
const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

// -------- get movies --------

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

// -------- get url movie --------

export function getUrlMovie(pathImage: string) {
  const urlMovie = `https://image.tmdb.org/t/p/w342/${pathImage}`;

  return urlMovie;
}

// -------- get details one movie --------

export async function getMovieDetails(movieId: string) {
  const response = await api.get<MovieDTO>(
    `/movie/${movieId}?api_key=${apiKeyMovieDB}&language=pt-BR`
  );

  return response;
}

// -------- get images movie --------

export async function getImagesMovie(movieId: string) {
  const response = await api.get<ImagesMovie>(
    `/movie/${movieId}/images?api_key=${apiKeyMovieDB}`
  );

  return response;
}

// https://api.themoviedb.org/3/movie/663712/images?api_key={{ _.api_key }}
