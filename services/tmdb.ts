
import { Movie, MovieDetails, Episode } from '../types';
import { TMDB_CONFIG } from '../env/tmdb';

const { API_KEY, BASE_URL, IMAGE_BASE_URL } = TMDB_CONFIG;

export const getImageUrl = (path: string, size: 'w300' | 'w500' | 'original' = 'w500') => 
  path ? `${IMAGE_BASE_URL}/${size}${path}` : 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=500&auto=format&fit=crop';

export const fetchTrending = async (type: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
  const response = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  return data.results;
};

export const fetchPopular = async (type: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
  const response = await fetch(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  return data.results;
};

export const fetchByGenre = async (type: 'movie' | 'tv', genreId: number): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchDetails = async (id: number, type: 'movie' | 'tv' = 'movie'): Promise<MovieDetails> => {
  const response = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits,videos,recommendations,images&include_image_language=pt,en,null`
  );
  return await response.json();
};

export const fetchEpisodes = async (tvId: number, seasonNumber: number): Promise<Episode[]> => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=pt-BR`
  );
  const data = await response.json();
  return data.episodes;
};

export const searchContent = async (query: string): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};
