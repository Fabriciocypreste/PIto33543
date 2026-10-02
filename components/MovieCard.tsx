
import React from 'react';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdb';
import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  type?: 'movie' | 'tv';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, type = 'movie' }) => {
  return (
    <Link 
      to={`/details/${type}/${movie.id}`}
      className="group relative flex-shrink-0 w-[220px] sm:w-[280px]"
    >
      <div className="glass p-2 rounded-[32px] shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/5">
        <div className="aspect-[2/3] overflow-hidden rounded-[24px] bg-zinc-900 relative">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
              <Play fill="black" size={28} className="ml-1" />
            </div>
          </div>

          <div className="absolute top-4 left-4">
             <div className="px-3 py-1 glass rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
               {type === 'movie' ? 'Film' : 'Show'}
             </div>
          </div>
        </div>
        
        <div className="mt-4 px-3 pb-2">
          <h4 className="text-base font-bold truncate text-white tracking-tight">
            {movie.title || movie.name}
          </h4>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-lg border border-yellow-500/20">
              <Star size={12} fill="currentColor" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.1em]">
              {(movie.release_date || movie.first_air_date)?.split('-')[0]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
