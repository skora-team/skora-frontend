import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, Cpu, Sun, Moon, Network } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../services/api'; // FIXED PATH

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    auth.logout(); 
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <div className="flex min-h-screen transition-colors font-p2p text-[10px] duration-300 bg-[var(--bg-main)] text-[var(--text-main)] relative">
      <aside className="w-72 bg-[var(--bg-sidebar)] font-p2p text-[10px] border-r-4 border-[var(--border-color)] hidden md:flex flex-col relative z-20">
        <div className="p-8 border-b-4 border-[var(--border-color)]">
          <h1 className="text-2xl pixel-font text-[var(--accent)] drop-shadow-md leading-loose">SKORA</h1>
          
        </div>  

        <nav className="flex-1 p-6 space-y-6">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Main Modules</div>
          <Link to="/DashboardHome" className={`group flex items-center space-x-4 p-3 transition-all border-l-4 ${
            location.pathname === '/DashboardHome' || location.pathname === '/'
              ? 'bg-[var(--accent-glow)] border-[var(--accent)]'
              : 'hover:bg-[var(--accent-glow)] border-transparent hover:border-[var(--accent)]'
          }`}>
            <LayoutDashboard className={`pixel-font ${
              location.pathname === '/DashboardHome' || location.pathname === '/'
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] group-hover:text-[var(--accent)]'
            }`} size={20} />
            <span className={`font-bold tracking-wide pixel-font transition-all ${
              location.pathname === '/DashboardHome' || location.pathname === '/'
                ? 'text-[var(--accent)]'
                : 'group-hover:text-[var(--accent)]'
            }`}>DASHBOARD</span>
          </Link>
          <Link to="/settings" className={`group flex items-center space-x-4 p-3 transition-all border-l-4 ${
            location.pathname === '/settings'
              ? 'bg-[var(--accent-glow)] border-[var(--accent)]'
              : 'hover:bg-[var(--accent-glow)] border-transparent hover:border-[var(--accent)]'
          }`}>
            <Cpu className={`pixel-font ${
              location.pathname === '/settings'
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] group-hover:text-[var(--accent)]'
            }`} size={20} />
            <span className={`font-bold tracking-wide pixel-font transition-all ${
              location.pathname === '/settings'
                ? 'text-[var(--accent)]'
                : 'group-hover:text-[var(--accent)]'
            }`}>PROFILE</span>
          </Link>
          <Link to="/skills" className={`group flex items-center space-x-4 p-3 transition-all border-l-4 ${
            location.pathname === '/skills'
              ? 'bg-[var(--accent-glow)] border-[var(--accent)]'
              : 'hover:bg-[var(--accent-glow)] border-transparent hover:border-[var(--accent)]'
          }`}>
            <Network className={`pixel-font ${
              location.pathname === '/skills'
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] group-hover:text-[var(--accent)]'
            }`} size={20} />
            <span className={`font-bold tracking-wide pixel-font transition-all ${
              location.pathname === '/skills'
                ? 'text-[var(--accent)]'
                : 'group-hover:text-[var(--accent)]'
            }`}>SKILLTREE</span>
          </Link>
        </nav>

        <div className="p-6 border-t-4 border-[var(--border-color)] space-y-4">
          <button onClick={toggleTheme} className="flex items-center justify-between w-full p-3 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded hover:border-[var(--accent)] transition-all">
            <span className="text-xs font-bold pixel-font text-[var(--text-muted)] uppercase">{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
          </button>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-3 text-red-500 hover:text-red-400 w-full p-2 transition-colors group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="pixel-font text-xs uppercase">Logout</span>
          </button>
        </div>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto relative z-10">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(var(--border-color) 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}