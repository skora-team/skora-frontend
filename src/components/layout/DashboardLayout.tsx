import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Cpu, Sun, Moon, Network } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../services/api'; // FIXED PATH

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(); 
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <div className="flex min-h-screen transition-colors duration-300 bg-[var(--bg-main)] text-[var(--text-main)] relative">
      <aside className="w-72 bg-[var(--bg-sidebar)] border-r-4 border-[var(--border-color)] hidden md:flex flex-col relative z-20">
        <div className="p-8 border-b-4 border-[var(--border-color)]">
          <h1 className="text-2xl font-pixel text-[var(--accent)] drop-shadow-md leading-loose">SKORA</h1>
          <div className="text-[10px] text-[var(--text-muted)] font-mono mt-2">SYS.VER.2.4.0</div>
        </div>  

        <nav className="flex-1 p-6 space-y-6">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Main Modules</div>
          <Link to="/DashboardHome" className="group flex items-center space-x-4 p-3 hover:bg-[var(--accent-glow)] border-l-4 border-transparent hover:border-[var(--accent)] transition-all">
            <LayoutDashboard className="text-[var(--text-muted)] group-hover:text-[var(--accent)]" size={20} />
            <span className="font-bold tracking-wide group-hover:text-[var(--accent)] transition-all">DASHBOARD</span>
          </Link>
          <Link to="/settings" className="group flex items-center space-x-4 p-3 hover:bg-[var(--accent-glow)] border-l-4 border-transparent hover:border-[var(--accent)] transition-all">
            <Cpu className="text-[var(--text-muted)] group-hover:text-[var(--accent)]" size={20} />
            <span className="font-bold tracking-wide group-hover:text-[var(--accent)] transition-all">SETTINGS</span>
          </Link>
           <Link to="/skills" className="group flex items-center space-x-4 p-3 hover:bg-[var(--accent-glow)] border-l-4 border-transparent hover:border-[var(--accent)] transition-all">
            <Network className="text-[var(--text-muted)] group-hover:text-[var(--accent)]" size={20} />
            <span className="font-bold tracking-wide group-hover:text-[var(--accent)] transition-all">SKILLTREE</span>
          </Link>
        </nav>

        <div className="p-6 border-t-4 border-[var(--border-color)] space-y-4">
          <button onClick={toggleTheme} className="flex items-center justify-between w-full p-3 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded hover:border-[var(--accent)] transition-all">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase">{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
          </button>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-3 text-red-500 hover:text-red-400 w-full p-2 transition-colors group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-pixel text-xs uppercase">Logout</span>
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