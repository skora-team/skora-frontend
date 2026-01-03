import { useEffect, useState } from 'react';
import { api, auth } from '../../services/api'; 
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useTheme } from '../../context/ThemeContext';
import { User, Cpu, Loader2, LogOut, ShieldAlert, Lock, Terminal } from 'lucide-react';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const id = auth.getUserId();
      
      if (!id) {
        // If no ID, fetch the list so we can show "Quick Login" buttons
        const users = await api.getUsers();
        setAvailableUsers(users);
        setSessionError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const user = await api.getUserProfile();
        setUserData(user);
      } catch (err) {
        setSessionError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleQuickLogin = (id: number) => {
    auth.setUserId(id);
    window.location.reload();
  };

  const handleLogout = () => {
    auth.logout();
    window.location.reload(); 
  };

  if (sessionError && !loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16 border-4 border-dashed border-red-500/20 bg-red-500/5">
          <ShieldAlert size={60} className="text-red-600 mb-4" />
          <h2 className="text-3xl font-pixel text-red-600 mb-2">ACCESS_DENIED</h2>
          <p className="font-mono text-[10px] text-[var(--text-muted)] mb-8 uppercase text-center">
            NO_OPERATOR_SIGNATURE_FOUND_IN_BUFFER
          </p>

          {/* QUICK LOGIN DEBUG PANEL */}
          <div className="w-full max-w-md bg-black/40 border-2 border-red-900/50 p-6">
            <div className="flex items-center gap-2 mb-4 text-red-500 font-pixel text-[10px]">
              <Terminal size={14} /> ⚡ DEBUG: FORCE_LOGIN_PROTOCOLS
            </div>
            <div className="grid grid-cols-2 gap-2">
              {availableUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u.id)}
                  className="p-2 border border-red-900/30 hover:border-red-500 text-[var(--text-muted)] hover:text-red-500 font-mono text-[10px] text-left transition-all uppercase"
                >
                  {`> INIT_${u.username || u.name}`}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'} 
            className="mt-8 text-[var(--text-muted)] font-mono text-[10px] underline hover:text-white"
          >
            RETURN_TO_LOGIN_PORTAL
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <header className="mb-12 border-b border-[var(--border-color)] pb-6 flex justify-between items-end">
        <h2 className="text-4xl font-pixel text-[var(--text-main)] uppercase">
          System <span className="text-[var(--accent)]">Settings</span>
        </h2>
        <button onClick={handleLogout} className="px-4 py-2 border border-red-500 text-red-500 font-mono text-[10px] hover:bg-red-500 hover:text-white transition-all uppercase">
          <LogOut size={14} className="inline mr-2"/> Terminate_Session
        </button>
      </header>

      <div className="max-w-2xl mx-auto">
        <section className="bg-[var(--bg-sidebar)] border-4 border-[var(--border-color)] p-8 relative">
          <div className="absolute -top-3 -left-3 bg-[var(--bg-main)] border-2 border-[var(--border-color)] p-1 text-[var(--accent)]">
            <User size={20} />
          </div>
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-32 h-32 bg-[var(--accent)]/5 border-4 border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
              {loading ? <Loader2 className="animate-spin" size={48} /> : <Cpu size={64} className="animate-pulse" />}
            </div>
            <div className="space-y-3">
              <h3 className="text-[var(--text-main)] font-bold font-mono text-5xl uppercase tracking-tighter">
                {userData?.username || userData?.name || "----"}
              </h3>
              <p className="text-[var(--accent)] font-pixel text-sm uppercase tracking-widest">
                OPERATOR_ID: {userData?.id.toString().padStart(3, '0') || '---'}
              </p>
            </div>
            <button onClick={toggleTheme} className="w-full py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] hover:border-[var(--accent)] font-pixel text-xs uppercase transition-all">
              Sync Visual Theme ({theme})
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}