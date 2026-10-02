
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetails, fetchEpisodes, getImageUrl } from '../services/tmdb';
import { MovieDetails, Episode, Season } from '../types';
import { Play, Star, Calendar, Clock, ArrowLeft, Users, Film, ChevronDown, ChevronRight, Layers } from 'lucide-react';

const DetailsPage: React.FC = () => {
  const { type, id } = useParams<{ type: 'movie' | 'tv'; id: string }>();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetails = async () => {
      if (!id || !type) return;
      setLoading(true);
      try {
        const data = await fetchDetails(Number(id), type);
        setDetails(data);
        if (type === 'tv' && data.seasons && data.seasons.length > 0) {
          const firstSeason = data.seasons.find(s => s.season_number > 0) || data.seasons[0];
          setActiveSeason(firstSeason.season_number);
          loadEpisodes(Number(id), firstSeason.season_number);
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Failed to load details', error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id, type]);

  const loadEpisodes = async (tvId: number, seasonNumber: number) => {
    setEpisodesLoading(true);
    try {
      const data = await fetchEpisodes(tvId, seasonNumber);
      setEpisodes(data);
    } catch (error) {
      console.error('Failed to load episodes', error);
    } finally {
      setEpisodesLoading(false);
    }
  };

  const handleSeasonChange = (seasonNum: number) => {
    setActiveSeason(seasonNum);
    if (details) loadEpisodes(details.id, seasonNum);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030303]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  if (!details) return null;

  const logo = details.images?.logos?.[0]?.file_path;
  const trailer = details.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen pb-32 animate-in fade-in duration-1000">
      {/* Dynamic Red/Black Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src={getImageUrl(details.backdrop_path, 'original')} 
          alt={details.title} 
          className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
        />
        {/* Red Glow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-[#030303]"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-red-900/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-red-600/5 blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative z-10 pt-32 px-8 md:px-24">
        {/* Header Content */}
        <div className="flex flex-col xl:flex-row gap-16 items-start">
          
          {/* Main Visual Group */}
          <div className="w-full xl:w-[450px] flex-shrink-0 group">
            <div className="glass p-3 rounded-[40px] shadow-[0_0_50px_rgba(220,38,38,0.15)] transform transition-transform duration-700 hover:scale-[1.02]">
              <div className="rounded-[30px] overflow-hidden aspect-[2/3] bg-zinc-900 relative">
                <img 
                  src={getImageUrl(details.poster_path, 'original')} 
                  alt={details.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <p className="text-white text-sm font-medium leading-relaxed italic">"{details.tagline}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Group */}
          <div className="flex-1 space-y-12">
            <div>
              {logo ? (
                <img 
                  src={getImageUrl(logo, 'original')} 
                  alt={details.title || details.name} 
                  className="max-h-40 mb-8 object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                />
              ) : (
                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-gradient">
                  {details.title || details.name}
                </h1>
              )}

              <div className="flex flex-wrap items-center gap-6 text-zinc-300">
                <div className="flex items-center gap-2 bg-red-600/20 text-red-500 px-5 py-2.5 rounded-2xl border border-red-600/30 font-bold shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                  <Star size={20} fill="currentColor" />
                  <span className="text-xl">{details.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2 font-bold tracking-[0.2em] text-xs uppercase text-zinc-400 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
                  <Calendar size={16} className="text-red-500" />
                  <span>{(details.release_date || details.first_air_date)?.split('-')[0]}</span>
                </div>
                {details.runtime && (
                  <div className="flex items-center gap-2 font-bold tracking-[0.2em] text-xs uppercase text-zinc-400 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
                    <Clock size={16} className="text-red-500" />
                    <span>{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  {details.genres?.map(g => (
                    <span key={g.id} className="px-5 py-2.5 glass rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white border-white/10 hover:border-red-500/40 transition-colors">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass p-10 rounded-[40px] space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full"></div>
              <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                <Film size={24} className="text-red-600" /> 
                <span className="uppercase tracking-widest text-lg">Sinopse Premium</span>
              </h3>
              <p className="text-zinc-400 text-xl leading-relaxed font-light">
                {details.overview || 'Uma jornada cinematográfica épica aguarda você.'}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <button className="flex items-center gap-4 px-12 py-5 bg-red-600 hover:bg-red-700 text-white rounded-full font-black tracking-widest transition-all transform hover:scale-105 shadow-[0_10px_40px_rgba(220,38,38,0.4)] uppercase">
                  <Play fill="currentColor" size={24} /> Assistir Agora
                </button>
                <div className="flex flex-col gap-1 px-8 border-l border-white/10">
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">Status</span>
                  <span className="text-white font-bold tracking-tight">{details.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TV SHOW SEASONS & EPISODES */}
        {type === 'tv' && details.seasons && (
          <section className="mt-32 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-2">
                <span className="text-red-600 font-black uppercase tracking-[0.4em] text-xs">Exclusivo Saintstream</span>
                <h3 className="text-5xl font-black tracking-tighter text-white uppercase italic">Temporadas</h3>
              </div>
              
              {/* Season Selection - Styled as Glass Tabs */}
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {details.seasons.filter(s => s.season_number > 0).map((season) => (
                  <button
                    key={season.id}
                    onClick={() => handleSeasonChange(season.season_number)}
                    className={`flex-shrink-0 px-8 py-4 rounded-2xl font-black tracking-widest transition-all border text-sm uppercase ${
                      activeSeason === season.season_number 
                      ? 'bg-red-600 text-white border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.4)]' 
                      : 'bg-white/5 text-zinc-500 border-white/10 hover:border-red-500/40 hover:text-white'
                    }`}
                  >
                    S{season.season_number}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {episodesLoading ? (
                <div className="col-span-full py-32 flex flex-col items-center justify-center gap-4">
                   <div className="w-16 h-1 w-32 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 animate-[loading_1.5s_infinite]"></div>
                   </div>
                   <span className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] font-black">Sincronizando episódios...</span>
                </div>
              ) : (
                episodes.map((ep) => (
                  <div key={ep.id} className="glass p-5 rounded-[36px] flex flex-col sm:flex-row gap-8 hover:bg-white/[0.05] transition-all group border-white/5 hover:border-red-500/20">
                    <div className="w-full sm:w-72 h-44 flex-shrink-0 rounded-[28px] overflow-hidden relative shadow-2xl">
                      <img 
                        src={getImageUrl(ep.still_path, 'w500')} 
                        alt={ep.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                          <Play size={24} className="text-black fill-black ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                          {ep.air_date?.split('-')[0]}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 py-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] bg-red-500/10 px-3 py-1 rounded-full">EPISÓDIO {ep.episode_number}</span>
                        <div className="flex items-center gap-1.5 text-yellow-500 text-xs font-black">
                           <Star size={14} fill="currentColor" /> {ep.vote_average.toFixed(1)}
                        </div>
                      </div>
                      <h4 className="text-2xl font-black text-white mb-3 line-clamp-1 tracking-tight group-hover:text-red-500 transition-colors uppercase italic">{ep.name}</h4>
                      <p className="text-zinc-500 text-sm line-clamp-2 font-medium leading-relaxed tracking-wide">{ep.overview || "O conteúdo deste episódio é restrito ou não possui sinopse disponível."}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* CAST SECTION */}
        <section className="mt-40">
          <h3 className="text-5xl font-black tracking-tighter mb-12 text-white uppercase italic border-l-8 border-red-600 pl-8">Elenco de Gala</h3>
          <div className="flex gap-10 overflow-x-auto pb-12 no-scrollbar">
            {details.credits.cast.slice(0, 15).map((person) => (
              <div key={person.id} className="flex-shrink-0 w-48 group">
                <div className="glass p-2.5 rounded-[36px] mb-6 group-hover:shadow-[0_15px_40px_rgba(220,38,38,0.2)] transition-all duration-700">
                  <div className="aspect-[4/5] rounded-[28px] overflow-hidden bg-zinc-900 shadow-2xl relative">
                    <img 
                      src={getImageUrl(person.profile_path || '', 'w300')} 
                      alt={person.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <h4 className="text-xl font-black text-white truncate px-2 italic uppercase tracking-tighter">{person.name}</h4>
                <p className="text-[10px] text-zinc-500 truncate px-2 uppercase tracking-[0.2em] font-black mt-2 text-red-500/70">{person.character}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TRAILER SECTION */}
        {trailer && (
          <section className="mt-40">
            <h3 className="text-5xl font-black tracking-tighter mb-12 text-white uppercase italic text-center">Preview Digital</h3>
            <div className="glass p-1.5 rounded-[60px] shadow-[0_30px_100px_rgba(220,38,38,0.2)] overflow-hidden aspect-video relative group border-white/5">
              <div className="absolute inset-0 bg-red-600/5 pointer-events-none"></div>
              <iframe
                className="w-full h-full rounded-[55px] shadow-2xl"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0&modestbranding=1&controls=1&showinfo=0`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {/* RECOMENDADOS */}
        {details.recommendations.results.length > 0 && (
          <section className="mt-40">
            <div className="flex items-center gap-4 mb-16">
              <Layers className="text-red-600" size={32} />
              <h3 className="text-5xl font-black tracking-tighter text-white uppercase italic">Sessão Recomendada</h3>
            </div>
            <div className="flex gap-10 overflow-x-auto pb-12 no-scrollbar">
              {details.recommendations.results.slice(0, 10).map((item) => (
                <div key={item.id} className="flex-shrink-0 w-72 glass p-3.5 rounded-[40px] group cursor-pointer border-white/5 hover:border-red-500/30 transition-all" onClick={() => navigate(`/details/${type}/${item.id}`)}>
                   <div className="rounded-[28px] overflow-hidden aspect-[2/3] mb-5 shadow-2xl">
                      <img src={getImageUrl(item.poster_path)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                   </div>
                   <h4 className="text-lg font-black text-white truncate px-2 uppercase italic tracking-tight group-hover:text-red-500 transition-colors">{item.title || item.name}</h4>
                   <div className="flex items-center justify-between mt-3 px-2">
                      <div className="flex items-center gap-1.5 bg-red-600/10 px-2 py-1 rounded-lg">
                        <Star size={12} fill="#ef4444" className="text-red-500" />
                        <span className="text-xs text-red-500 font-black">{item.vote_average.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest italic">{(item.release_date || item.first_air_date)?.split('-')[0]}</span>
                   </div>
                </div>
              ))}
            </div>
          </section>
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

export default DetailsPage;
