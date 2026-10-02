
export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  episode_count: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  episode_number: number;
  air_date: string;
  vote_average: number;
}

export interface Logo {
  file_path: string;
  aspect_ratio: number;
}

export interface MovieDetails extends Movie {
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  seasons?: Season[];
  credits: {
    cast: CastMember[];
  };
  videos: {
    results: Video[];
  };
  images: {
    logos: Logo[];
  };
  recommendations: {
    results: Movie[];
  };
}
