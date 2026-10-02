
import React, { useState, useEffect } from 'react';
import { Search, Loader2, Sparkles, X } from 'lucide-react';
import { searchContent } from '../services/tmdb';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const data = await searchContent(query);
          // Filter out results without posters to maintain premium quality
          setResults(data.filter(item => item.poster_path));
          setHasSearched(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen pb-32 pt-32 px-4 md:px-12 animate-in fade-in duration-700">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-16 relative">
        <div className="text-center mb-10">
          <span className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-2 block animate-pulse">Busca Inteligente</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            O que você quer <span className="text-gradient">assistir?</span>
          </h1>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-red-600/10 blur-2xl rounded-full scale-90 group-focus-within:scale-100 transition-transform duration-700 opacity-0 group-focus-within:opacity-100"></div>
          <div className="relative glass-dark rounded-[40px] p-2 flex items-center border border-white/10 group-focus-within:border-red-500/50 transition-all duration-500 shadow-2xl">
            <div className="p-4 text-red-500">
              {loading ? <Loader2 size={32} className="animate-spin" /> : <Search size={32} />}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquise por títulos, atores ou gêneros..."
              className="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl font-bold py-4 px-2 placeholder:text-zinc-600 text-white"
              autoFocus
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto">
        {loading && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
            <div className="w-16 h-1 w-32 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 animate-[loading_1.5s_infinite]"></div>
            </div>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black">Explorando o multiverso cinematográfico...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {results.map((item) => (
              <MovieCard 
                key={item.id} 
                movie={item} 
                type={item.first_air_date ? 'tv' : 'movie'} 
              />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
            <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center border border-red-500/20">
              <Search size={40} className="text-red-500 opacity-50" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase italic tracking-tight text-white">Nenhum tesouro encontrado</h3>
              <p className="text-zinc-500 max-w-xs uppercase tracking-widest text-[10px] font-bold">Tente palavras-chave diferentes ou verifique a ortografia do título.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center gap-8">
            <Sparkles size={80} className="text-red-600" />
            <div className="space-y-2">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">Pronto para a Experiência?</h3>
              <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs font-black">Busque pelo seu filme ou série favorita acima</p>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default SearchPage;
