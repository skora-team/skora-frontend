import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useTheme } from '../context/ThemeContext';
import { User, Volume2 } from 'lucide-react';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-pixel text-[var(--text-main)] mb-8">SYSTEM SETTINGS</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-[var(--bg-sidebar)] border border-[var(--border-color)] p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-blue-500/20 rounded-full text-blue-500"><User size={24} /></div><div><h3 className="font-bold text-[var(--text-main)]">User Profile</h3><p className="text-xs text-[var(--text-muted)]">ID: STUDENT_01</p></div></div>
        </div>
        <div className="bg-[var(--bg-sidebar)] border border-[var(--border-color)] p-6 rounded-lg">
          <h3 className="font-bold text-[var(--text-main)] mb-4 flex items-center gap-2"><Volume2 size={18} /> Preferences</h3>
          <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)]">
            <span className="text-[var(--text-main)]">Visual Theme</span>
            <button onClick={toggleTheme} className="px-4 py-2 bg-[var(--bg-main)] border border-[var(--border-color)] rounded text-xs font-bold hover:border-[var(--accent)] transition-all">{theme === 'dark' ? 'SWITCH TO LIGHT' : 'SWITCH TO DARK'}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}