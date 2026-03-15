import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { Lesson, Question } from '../../types/api.types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LessonContent } from '../../components/dashboard/LessonContent';
import { ChevronLeft, CheckCircle2, Circle, Play } from 'lucide-react';

export function LessonPage() {
  const { courseId, lessonId } = useParams();
  
  // Data State
  const [courseTitle, setCourseTitle] = useState('Module');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      if (!courseId || !lessonId) return;
      setLoading(true);
      
      try {
        // 1. Fetch Course Info
        const courses = await api.getCourses();
        const c = Array.isArray(courses) ? courses.find(x => x.id === Number(courseId)) : null;
        if (c) setCourseTitle(c.title);

        // 2. Fetch Lessons to find order_index
        const lessons = await api.getLessons(Number(courseId));
        const currentLesson = lessons.find(l => l.id === Number(lessonId));
        
        if (currentLesson) {
          setLesson(currentLesson);

          // 3. Fetch Questions using the specific path from your API docs
          // Path: /courses/{id}/lessons/order/{index}/questions/random
          console.log(`Fetching questions for Order Index: ${currentLesson.order_index}`);
          try {
            const qs = await api.getRandomQuestionsByOrder(Number(courseId), currentLesson.order_index, 10);
            setQuestions(Array.isArray(qs) ? qs : []);
          } catch (error) {
            console.error('Failed to fetch questions:', error);
            setQuestions([]); // Keep as empty to show no questions message
          }
        }

      } catch (e) { 
        console.error("Error loading lesson data:", e); 
      } finally { 
        setLoading(false); 
      }
    }
    load();
  }, [courseId, lessonId]);

  if (loading) return <DashboardLayout><div className="flex h-[60vh] items-center justify-center text-[var(--accent)] font-pixel">LOADING DATA...</div></DashboardLayout>;
  if (!lesson) return <DashboardLayout><div className="text-red-500 p-10">Lesson Not Found</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-20">
        <Link to={`/course/${courseId}`} className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--accent)] mb-6 font-mono text-xs">
          <ChevronLeft size={14} className="mr-2" /> BACK TO MODULE
        </Link>
        
        <header className="mb-8 border-b border-[var(--border-color)] pb-6">
          <h1 className="text-3xl font-bold text-[var(--text-main)]">{lesson.title}</h1>
        </header>
        
        <LessonContent title={lesson.title} courseTitle={courseTitle} apiContent={lesson.content} />

        <section className="bg-[var(--bg-sidebar)] border-t-4 border-[var(--accent)] rounded-lg shadow-2xl overflow-hidden mt-12">
          <div className="bg-[var(--bg-main)] p-6 border-b border-[var(--border-color)] flex justify-between">
            <h2 className="text-xl font-bold font-pixel text-[var(--text-main)]">KNOWLEDGE CHECK</h2>
            <Play className="text-[var(--accent)]" />
          </div>
          
          <div className="p-8 space-y-10">
            {questions.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-muted)] border border-dashed border-[var(--border-color)]">
                NO QUESTIONS GENERATED FOR THIS ORDER INDEX ({lesson.order_index})
              </div>
            ) : (
              questions.map((q, idx) => (
                <div key={`question-${q.id || idx}`}>
                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-4">
                    <span className="text-[var(--text-muted)] mr-2">
                      {idx + 1}/{questions.length}.
                    </span>
                    {/* FIXED: Changed q.text to q.question_text */}
                    {q.question_text || q.text} 
                  </h3>
                  
                  <div className="grid gap-3">
                    {/* 
                       Note: Your backend JSON doesn't include an 'options' array. 
                       This fallback will display for every question.
                    */}
                    {(q.options || [{id: 1, text: "True", is_correct: true}, {id: 2, text: "False", is_correct: false}]).map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === opt.id;
                      let cls = "border-[var(--border-color)] bg-[var(--bg-main)]/50 text-[var(--text-muted)]";
                      
                      if (quizSubmitted) {
                        if (opt.is_correct) cls = "border-green-500 bg-green-500/10 text-green-500";
                        else if (isSelected) cls = "border-red-500 bg-red-500/10 text-red-500";
                      } else if (isSelected) {
                        cls = "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)]";
                      }
                      
                      return (
                        <button 
                          key={`opt-${q.id}-${opt.id || optIdx}`} 
                          onClick={() => !quizSubmitted && setSelectedAnswers(p => ({...p, [q.id]: opt.id}))} 
                          className={`w-full text-left p-4 border rounded flex items-center gap-3 transition-all ${cls}`}
                        >
                          {isSelected ? <CheckCircle2 size={18}/> : <Circle size={18}/>} 
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-6 bg-[var(--bg-main)] border-t border-[var(--border-color)] flex justify-end">
             {!quizSubmitted ? (
               <button 
                 onClick={() => setQuizSubmitted(true)} 
                 disabled={questions.length === 0} 
                 className="bg-[var(--accent)] text-black font-bold font-pixel py-3 px-8 rounded disabled:opacity-50"
               >
                 SUBMIT
               </button> 
             ) : (
               <div className="flex items-center gap-4">
                  <button 
                    onClick={() => window.location.reload()} 
                    className="text-[var(--text-muted)] text-xs underline font-pixel"
                  >
                    RETRY
                  </button>
                  <span className="text-green-500 font-bold font-pixel">COMPLETE</span>
               </div>
             )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}