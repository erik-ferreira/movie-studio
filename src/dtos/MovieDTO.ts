export interface MovieDTO {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  genres?: [
    {
      id: number;
      name: string;
    }
  ];
  production_companies?: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface ImageProps {
  file_path: string;
}

export interface ImagesMovie {
  backdrops: ImageProps[];
}
