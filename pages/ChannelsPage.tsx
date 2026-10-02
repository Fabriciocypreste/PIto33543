
import React, { useState, useEffect } from 'react';
import { Search, Play, Tv, Activity, Volume2, VolumeX, Maximize2, ChevronRight, LayoutGrid, Radio } from 'lucide-react';

interface Channel {
  id: string;
  number: string;
  name: string;
  logo: string;
  program: string;
  description: string;
  startTime: string;
  endTime: string;
  category: 'FUTEBOL' | 'FILMES' | 'KIDS' | 'NOTÍCIAS' | 'SHOWS';
  backdrop: string;
  videoId: string;
}

const TEST_CHANNELS: Channel[] = [
  {
    id: 'f1',
    number: '001',
    name: 'SAINT SPORTS 4K',
    logo: 'https://logodownload.org/wp-content/uploads/2018/11/sportv-2-logo.png',
    program: 'Final: Brasil x Argentina',
    description: 'A rivalidade máxima do futebol mundial em uma final histórica. Transmissão exclusiva em ultra-definição.',
    startTime: '21:00',
    endTime: '23:30',
    category: 'FUTEBOL',
    backdrop: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1920&auto=format&fit=crop',
    videoId: 'vW1C8U6pC7c'
  },
  {
    id: 'm1',
    number: '010',
    name: 'CINE PREMIUM',
    logo: 'https://logodownload.org/wp-content/uploads/2018/11/sportv-3-logo.png',
    program: 'Oppenheimer (2023)',
    description: 'O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan.',
    startTime: '22:00',
    endTime: '00:45',
    category: 'FILMES',
    backdrop: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1920&auto=format&fit=crop',
    videoId: 'uYPbbksJxIg'
  },
  {
    id: 'm2',
    number: '011',
    name: 'CINE ACTION',
    logo: 'https://logodownload.org/wp-content/uploads/2018/11/sportv-logo.png',
    program: 'John Wick: Capítulo 4',
    description: 'John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes ele deve enfrentar um novo inimigo.',
    startTime: '20:00',
    endTime: '22:30',
    category: 'FILMES',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop',
    videoId: 'qEVUrkHu324'
  },
  {
    id: 'k1',
    number: '025',
    name: 'SAINT KIDS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Cartoon_Network_logo.svg',
    program: 'Homem-Aranha no Aranhaverso',
    description: 'Após ser atingido por uma teia radioativa, Miles Morales, um jovem do Brooklyn, torna-se o Homem-Aranha.',
    startTime: '10:00',
    endTime: '12:00',
    category: 'KIDS',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop',
    videoId: 'shW9i6k8cB0'
  }
];

const ChannelsPage: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(TEST_CHANNELS[0]);
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [isMuted, setIsMuted] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = TEST_CHANNELS.filter(ch => 
    (activeCategory === 'TODOS' || ch.category === activeCategory) &&
    (ch.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col lg:flex-row overflow-hidden">
      {/* Background Player Section */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020202] via-transparent to-black/30"></div>
        <div className="absolute inset-0 z-0 opacity-40">
           <iframe
            className="w-full h-full scale-[1.3] pointer-events-none"
            src={`https://www.youtube.com/embed/${selectedChannel.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${selectedChannel.videoId}&modestbranding=1&rel=0&iv_load_policy=3`}
            allow="autoplay"
            frameBorder="0"
          ></iframe>
        </div>
        {/* Luxury Scanlines & Grain */}
        <div className="absolute inset-0 z-15 pointer-events-none opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 3px, 3px 100%'
        }}></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="relative z-30 w-full lg:w-[520px] h-screen glass border-r border-white/5 pt-28 flex flex-col animate-in slide-in-from-left duration-1000">
        <div className="px-12 mb-10">
           <div className="flex items-center justify-between mb-10">
              <div className="space-y-1">
                <span className="text-red-500 font-black uppercase tracking-[0.5em] text-[10px]">Glass Experience</span>
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Canais <span className="text-red-600">Live</span></h2>
              </div>
              <div className="w-16 h-16 glass rounded-[24px] flex items-center justify-center text-red-500 shadow-2xl">
                 <Radio size={32} className="animate-pulse" />
              </div>
           </div>

           {/* Premium Search */}
           <div className="relative mb-8 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por canal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-sm font-bold placeholder:text-zinc-600 focus:outline-none focus:bg-white/[0.08] focus:border-red-500/50 transition-all shadow-2xl"
              />
           </div>
           
           {/* Category Tabs */}
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {['TODOS', 'FUTEBOL', 'FILMES', 'KIDS', 'NOTÍCIAS'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                  activeCategory === cat 
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_10px_25px_rgba(220,38,38,0.4)]' 
                    : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto px-8 no-scrollbar pb-32">
          <div className="space-y-4">
            {filtered.map(channel => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`w-full group relative p-6 rounded-[36px] flex items-center gap-6 transition-all duration-500 ${
                  selectedChannel.id === channel.id 
                    ? 'glass bg-white/10 border-white/20 shadow-2xl scale-[1.03]' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`w-12 font-black text-xs ${selectedChannel.id === channel.id ? 'text-red-500' : 'text-zinc-600'}`}>
                  {channel.number}
                </div>
                <div className="w-16 h-16 glass-dark rounded-2xl flex items-center justify-center p-3 border-white/10 overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                  <img src={channel.logo} alt="" className={`w-full object-contain transition-all duration-700 ${selectedChannel.id === channel.id ? 'grayscale-0' : 'grayscale invert opacity-50'}`} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className={`text-base font-black italic uppercase tracking-tighter mb-1 ${selectedChannel.id === channel.id ? 'text-white' : 'text-zinc-400'}`}>
                    {channel.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#ef4444]"></div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest truncate">{channel.program}</p>
                  </div>
                </div>
                {selectedChannel.id === channel.id && <ChevronRight size={20} className="text-red-500 animate-pulse" />}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Info Overlay */}
      <main className="relative flex-1 flex flex-col justify-end px-16 md:px-24 pb-32 z-20 pointer-events-none">
        <div className="max-w-4xl space-y-10 animate-in slide-in-from-bottom-20 duration-1000 pointer-events-auto">
          
          <div className="flex flex-wrap items-center gap-6">
             <div className="px-6 py-2.5 glass-dark border-red-500/40 border-[1.5px] rounded-2xl flex items-center gap-3 text-red-500 font-black uppercase tracking-[0.4em] text-[11px] shadow-[0_0_40px_rgba(220,38,38,0.25)]">
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
               </span>
               TRANSMISSÃO AO VIVO
             </div>
             <div className="text-white/80 font-black uppercase tracking-[0.4em] text-[11px] bg-black/50 backdrop-blur-3xl px-6 py-2.5 rounded-2xl border border-white/10 shadow-xl">
               {selectedChannel.category} • 4K ULTRA HD
             </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-8xl md:text-[150px] font-black italic tracking-tighter text-white uppercase leading-[0.8] drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              {selectedChannel.name}
            </h1>
            
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic drop-shadow-2xl max-w-3xl leading-tight">
                {selectedChannel.program}
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between max-w-md text-red-500 font-black tracking-[0.3em] text-xs">
                   <span>INÍCIO {selectedChannel.startTime}</span>
                   <span className="text-zinc-500">TÉRMINO {selectedChannel.endTime}</span>
                </div>
                <div className="w-full max-w-md h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5 p-[2px]">
                    <div className="h-full bg-gradient-to-r from-red-800 to-red-500 w-[65%] rounded-full shadow-[0_0_20px_#ef4444] animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-zinc-300 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl drop-shadow-lg italic opacity-90">
            {selectedChannel.description}
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-10">
            <button className="flex items-center gap-5 px-16 py-7 bg-red-600 hover:bg-red-700 text-white rounded-full font-black tracking-[0.2em] transition-all transform hover:scale-110 shadow-[0_20px_60px_rgba(220,38,38,0.6)] uppercase text-lg group">
              <Play fill="currentColor" size={32} className="group-hover:rotate-12 transition-transform" /> 
              SINTONIZAR AGORA
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="w-24 h-24 glass flex items-center justify-center rounded-[32px] hover:bg-white/10 transition-all border-white/20 text-white shadow-2xl pointer-events-auto"
              >
                {isMuted ? <VolumeX size={40} /> : <Volume2 size={40} />}
              </button>
              <button className="w-24 h-24 glass flex items-center justify-center rounded-[32px] hover:bg-white/10 transition-all border-white/20 text-white shadow-2xl pointer-events-auto">
                <Maximize2 size={40} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default ChannelsPage;
