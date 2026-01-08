import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, auth } from '../../services/api'; 
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useTheme } from '../../context/ThemeContext';
import { User, Cpu, Loader2, ShieldAlert, Terminal, Database, Code2, Zap, ArrowRight } from 'lucide-react';

// Upgraded Tactical Bar with 4 Blocks
const TacticalBar = ({ percent, label, icon: Icon, courseId }: { percent: number, label: string, icon: any, courseId?: number }) => {
  const segments = 4; // Matches your 4-lesson structure
  const activeSegments = Math.round((percent / 100) * segments);
  const completedCount = Math.min(4, Math.floor((percent / 100) * 4));

  return (
    <div className="group w-full mb-8">
      <div className="flex justify-between items-end mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--bg-main)] border border-[var(--border-color)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-all">
            <Icon size={18} />
          </div>
          <div>
            <span className="block font-pixel text-[10px] text-[var(--text-main)] uppercase tracking-widest leading-none mb-1">
              {label}
            </span>
            <span className="text-[9px] font-mono text-[var(--text-muted)]">
              SYNC_STATUS: {completedCount}/4 MODULES
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="block font-mono text-[11px] text-[var(--accent)] font-bold">{percent}%</span>
          {courseId && (
            <Link to={`/course/${courseId}`} className="text-[8px] font-pixel text-[var(--text-muted)] hover:text-[var(--accent)] flex items-center gap-1 uppercase transition-colors">
              Continue <ArrowRight size={8} />
            </Link>
          )}
        </div>
      </div>
      
      {/* 4 Large Tactical Blocks */}
      <div className="flex gap-2 h-6 w-full">
        {Array.from({ length: segments }).map((_, i) => (
          <div 
            key={i}
            className={`flex-1 border-2 transition-all duration-500 relative overflow-hidden ${
              i < activeSegments 
                ? 'bg-[var(--accent)]/20 border-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]' 
                : 'bg-black/40 border-[var(--border-color)] opacity-40'
            }`}
          >
            {/* Scanline effect on active blocks */}
            {i < activeSegments && (
              <div className="absolute inset-0 bg-white/10 animate-pulse" />
            )}
            {/* Inner fill */}
            <div className={`h-full w-full transition-transform duration-1000 ${i < activeSegments ? 'scale-x-100' : 'scale-x-0'}`} 
                 style={{ backgroundColor: 'var(--accent)', opacity: 0.6 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  
  const [progressData, setProgressData] = useState({
    python: { percent: 0, id: 0 },
    sql: { percent: 0, id: 0 },
    r: { percent: 0, id: 0 }
  });

  useEffect(() => {
    async function loadData() {
      const id = auth.getUserId();
      if (!id) {
        const users = await api.getUsers();
        setAvailableUsers(users);
        setSessionError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [user, courses, completions] = await Promise.all([
          api.getUserProfile(),
          api.getCourses(),
          api.getUserCompletions()
        ]);

        setUserData(user);

        const getStats = (query: string) => {
          const course = courses.find((c: any) => c.title.toLowerCase().includes(query.toLowerCase()));
          if (!course) return { percent: 0, id: 0 };
          
          // Using your logic: check completions against this course's lessons
          const courseLessonIds = course.lessons?.map((l: any) => l.id) || [];
          const finished = completions.filter((c: any) => courseLessonIds.includes(c.lesson_id)).length;
          const total = course.lessons?.length || 4; // Fallback to 4
          
          return {
            percent: Math.round((finished / total) * 100),
            id: course.id
          };
        };

        setProgressData({
          python: getStats('python'),
          sql: getStats('sql'),
          r: getStats('r')
        });

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

  if (sessionError && !loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-red-900/20 bg-red-900/5">
          <ShieldAlert size={48} className="text-red-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-pixel text-red-500 mb-6 uppercase tracking-tighter">Identity_Buffer_Empty</h2>
          <div className="w-full max-w-sm grid grid-cols-1 gap-2">
            {availableUsers.map((u) => (
              <button key={u.id} onClick={() => handleQuickLogin(u.id)} className="p-3 border-2 border-red-900/30 hover:border-red-500 text-[var(--text-muted)] hover:text-red-500 font-mono text-[10px] text-center uppercase transition-all">
                {`> RESTORE_SESSION_${u.username || u.name}`}
              </button>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <header className="mb-12 border-b border-[var(--border-color)] pb-6 text-center">
        <h2 className="text-5xl font-pixel text-[var(--text-main)] uppercase leading-none tracking-tighter pixel-font">
          Operator <span className="text-[var(--accent)]">Profile</span>
        </h2>
       
      </header>

      <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT CARD: IDENTITY (4 columns) */}
        <div className="lg:col-span-4">
          <section className="bg-[var(--bg-sidebar)] border-4 border-[var(--border-color)] p-8 relative flex flex-col h-full group hover:border-[var(--accent)] transition-colors">
            <div className="absolute -top-3 -left-3 bg-[var(--bg-main)] border-2 border-[var(--border-color)] p-1 text-[var(--accent)]"><User size={20} /></div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-40 h-40 bg-[var(--bg-main)] border-4 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)] mb-8">
                {loading ? <Loader2 className="animate-spin" size={48} /> : <Cpu size={80} className="animate-pulse" />}
              </div>
              
              <h3 className="text-4xl font-bold font-mono text-[var(--text-main)] uppercase tracking-tighter mb-1">
                {userData?.username || userData?.name || "----"}
              </h3>
              <p className="text-[var(--accent)] font-pixel text-xs mb-8 uppercase opacity-80">
                ID: {userData?.id.toString().padStart(4, '0') || '----'}
              </p>

              <div className="w-full space-y-2 py-6 border-y border-[var(--border-color)] font-mono text-[9px] text-[var(--text-muted)] text-left">
                
                <p>{`> STATUS: ONLINE`}</p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT CARD: PROGRESS (8 columns) */}
        <div className="lg:col-span-8">
          <section className="bg-[var(--bg-sidebar)] border-4 border-[var(--border-color)] p-10 relative h-full">
            <div className="absolute -top-3 -left-3 bg-[var(--bg-main)] border-2 border-[var(--border-color)] p-1 text-[var(--accent)]"><Zap size={20} /></div>
            
            <h3 className="text-xs font-pixel text-[var(--text-main)] mb-12 uppercase opacity-70 tracking-widest flex items-center gap-2">
              // CORE ABILITY UNLOCKING
            </h3>

            <div className="space-y-4">
              <TacticalBar label="Python_Core"  icon={Code2} courseId={progressData.python.id} />
              <TacticalBar label="SQL_Databases" percent={progressData.sql.percent} icon={Database} courseId={progressData.sql.id} />
              <TacticalBar label="R_Analytics" percent={progressData.r.percent} icon={Terminal} courseId={progressData.r.id} />
            </div>

           
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}