
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import SearchPage from './pages/SearchPage';
import ChannelsPage from './pages/ChannelsPage';
import { Search, User, Home, Tv, Film, Radio, Bookmark, Plus } from 'lucide-react';

const NavLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group ${
        isActive 
          ? 'bg-red-600/20 text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
          : 'text-zinc-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={18} className={`${isActive ? 'text-red-500' : 'group-hover:text-white transition-colors'}`} />
      <span className="text-xs font-black uppercase tracking-widest hidden lg:block">{label}</span>
    </Link>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#030303]">
        {/* Floating Premium Nav Bar */}
        <header className="fixed top-0 left-0 right-0 h-24 z-[100] px-4 md:px-12 flex items-center justify-between pointer-events-none">
          {/* Logo Section */}
          <Link to="/" className="pointer-events-auto flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_8px_25px_rgba(220,38,38,0.4)] transform hover:rotate-6 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-gradient uppercase italic leading-none">SAINTSTREAM</span>
              <span className="text-[8px] font-black tracking-[0.4em] text-red-600 uppercase">Premium Glass</span>
            </div>
          </Link>
          
          {/* Main Navigation Pill */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-3xl border border-white/10 p-1.5 rounded-full shadow-2xl">
            <NavLink to="/" icon={Home} label="Home" />
            <NavLink to="/series" icon={Tv} label="Séries" />
            <NavLink to="/movies" icon={Film} label="Filmes" />
            <NavLink to="/channels" icon={Radio} label="Canais" />
            <NavLink to="/mylist" icon={Bookmark} label="Minha Lista" />
          </div>

          {/* User & Search Section */}
          <div className="pointer-events-auto flex items-center gap-3 bg-black/40 backdrop-blur-3xl border border-white/10 p-1.5 rounded-full">
            <Link to="/search" className="p-2.5 text-zinc-400 hover:text-white transition-colors bg-white/5 rounded-full">
              <Search size={20} />
            </Link>
            <Link to="/profile" className="flex items-center gap-2 p-1.5 pr-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-lg shadow-red-600/20">
              <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Perfil</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation (Visible only on small screens) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-2xl">
            <Link to="/" className="p-3 text-red-500"><Home size={22} /></Link>
            <Link to="/series" className="p-3 text-zinc-400"><Tv size={22} /></Link>
            <Link to="/movies" className="p-3 text-zinc-400"><Film size={22} /></Link>
            <Link to="/channels" className="p-3 text-zinc-400"><Radio size={22} /></Link>
            <Link to="/mylist" className="p-3 text-zinc-400"><Bookmark size={22} /></Link>
          </div>
        </div>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/series" element={<HomePage />} />
            <Route path="/movies" element={<HomePage />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/mylist" element={<div className="pt-40 text-center flex flex-col items-center gap-6">
              <Bookmark size={80} className="text-red-600 opacity-20" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Minha Lista</h2>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">Sua curadoria exclusiva aparecerá aqui</p>
            </div>} />
            <Route path="/details/:type/:id" element={<DetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<div className="pt-40 text-center">Configurações de conta premium...</div>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
