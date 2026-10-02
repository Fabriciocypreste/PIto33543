
import React, { useEffect, useState } from 'react';
import { fetchTrending, fetchPopular, fetchByGenre, getImageUrl } from '../services/tmdb';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Play, Info, ChevronRight, Star, Flame, Zap, Smile, Ghost, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GenreRow {
  title: string;
  items: Movie[];
  icon: any;
  type: 'movie' | 'tv';
}

const HomePage: React.FC = () => {
  const [featured, setFeatured] = useState<Movie | null>(null);
  const [rows, setRows] = useState<GenreRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          trending,
          popularTv,
          actionMovies,
          comedyMovies,
          horrorMovies,
          animationTv
        ] = await Promise.all([
          fetchTrending('movie'),
          fetchPopular('tv'),
          fetchByGenre('movie', 28), // Action
          fetchByGenre('movie', 35), // Comedy
          fetchByGenre('movie', 27), // Horror
          fetchByGenre('tv', 16),    // Animation
        ]);

        const categories: GenreRow[] = [
          { title: 'Tendências Globais', items: trending, icon: Flame, type: 'movie' },
          { title: 'Séries que Todos Amam', items: popularTv, icon: Tv, type: 'tv' },
          { title: 'Adrenalina & Ação', items: actionMovies, icon: Zap, type: 'movie' },
          { title: 'Para Rir Muito', items: comedyMovies, icon: Smile, type: 'movie' },
          { title: 'Terror & Suspense', items: horrorMovies, icon: Ghost, type: 'movie' },
          { title: 'Mundo das Animações', items: animationTv, icon: Info, type: 'tv' },
        ];

        setRows(categories);
        setFeatured(trending[Math.floor(Math.random() * 5)] || trending[0]);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !featured) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030303]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-red-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#030303]">
      {/* Cinematic Hero */}
      <section className="relative w-full h-[95vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(featured.backdrop_path, 'original')}
            alt={featured.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center px-8 md:px-24">
          <div className="max-w-4xl animate-in fade-in slide-in-from-left-16 duration-1000">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 glass rounded-xl text-[10px] font-black uppercase tracking-[0.4em] text-red-500 border border-red-500/30">Destaque Exclusivo</span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-500">
                 <Star size={14} fill="currentColor" />
                 <span className="text-xs font-black">{featured.vote_average.toFixed(1)}</span>
              </div>
            </div>

            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none text-gradient uppercase italic drop-shadow-2xl">
              {featured.title || featured.name}
            </h1>
            
            <p className="text-zinc-300 text-xl md:text-2xl mb-12 line-clamp-3 leading-relaxed max-w-2xl font-light italic">
              {featured.overview}
            </p>

            <div className="flex items-center gap-6">
              <Link 
                to={`/details/movie/${featured.id}`}
                className="flex items-center gap-4 px-14 py-6 bg-white text-black rounded-full font-black transition-all transform hover:scale-110 shadow-[0_15px_45px_rgba(255,255,255,0.2)] uppercase text-sm tracking-widest"
              >
                <Play fill="currentColor" size={24} />
                ASSISTIR AGORA
              </Link>
              <Link 
                to={`/details/movie/${featured.id}`}
                className="flex items-center gap-4 px-14 py-6 glass text-white rounded-full font-black transition-all transform hover:scale-110 border-white/20 uppercase text-sm tracking-widest"
              >
                <Info size={24} />
                MAIS INFORMAÇÕES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorized Rows */}
      <div className="px-8 md:px-24 -mt-40 relative z-20 space-y-32">
        {rows.map((row, idx) => (
          <section key={idx} className="animate-in fade-in slide-in-from-bottom-12 duration-700 delay-150">
            <div className="flex items-center justify-between mb-10 pl-4 border-l-4 border-red-600">
              <div className="flex items-center gap-4">
                <row.icon size={28} className="text-red-500" />
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">{row.title}</h2>
              </div>
              <button className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-all group">
                Ver Tudo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar scroll-smooth">
              {row.items.map((movie) => (
                <MovieCard key={movie.id} movie={movie} type={row.type} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
