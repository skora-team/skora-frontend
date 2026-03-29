import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { AnswerOption, Lesson, Question, RecommendationTarget } from '../../types/api.types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LessonContent } from '../../components/dashboard/LessonContent';
import { ChevronLeft, CheckCircle2, Circle, Play } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { GameHUD } from '../../components/GameHUD';
import { XPFloatingText } from '../../components/XPFloatingText';
import { QuizResultsCard } from '../../components/QuizResultsCard';
import { useAchievements } from '../../hooks/useAchievements';
import { AchievementsPanel } from '../../components/AchievementsPanel';
import { AchievementToast } from '../../components/AchievementToast';

function getQuestionText(q: Question): string {
  return q.question_text ?? q.text ?? 'Untitled question';
}

function getQuestionOptions(q: Question, fetchedOptions: AnswerOption[] = []) {
  const rawOptions = fetchedOptions.length > 0 ? fetchedOptions : (q.options ?? q.answer_options ?? []);
  if (rawOptions.length > 0) {
    return rawOptions.map((opt, index) => ({
      id: opt.id ?? index + 1,
      text: opt.text ?? opt.option_text ?? opt.answer_text ?? `Option ${index + 1}`,
      is_correct: opt.is_correct
    }));
  }

  return [];
}

export function LessonPage() {
  const { courseId, lessonId } = useParams();
  
  // Data State
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<number, AnswerOption[]>>({});
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({});
  const [completionSaved, setCompletionSaved] = useState<boolean | null>(null);
  const [nextRecommendation, setNextRecommendation] = useState<RecommendationTarget | null>(null);

  // Gamification State
  const gameState = useGameState(lesson?.id ?? 0);
  const [lastAnsweredQuestionId, setLastAnsweredQuestionId] = useState<number | null>(null);

  // Achievements State
  const { achievements, checkAchievements } = useAchievements();
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<string[]>([]);
  const [quizStartTime] = useState<number>(Date.now());
  const [toastQueue, setToastQueue] = useState<Array<{ id: string; name: string; icon: string }>>([]);
  const [currentToast, setCurrentToast] = useState<{ id: string; name: string; icon: string } | null>(null);

  const answeredCount = questions.reduce((count, q) => {
    return selectedAnswers[q.id] !== undefined ? count + 1 : count;
  }, 0);

  const unansweredCount = Math.max(questions.length - answeredCount, 0);

  async function handleSubmitQuiz() {
    if (!lesson || !courseId || questions.length === 0) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const answers = questions.map((q) => ({
        question_id: q.id,
        answer_id: selectedAnswers[q.id]
      }));

      const result = await api.submitLessonQuiz(lesson.id, { answers });
      const normalizedResults = Object.entries(result.results || {}).reduce<Record<number, boolean>>(
        (acc, [questionId, isCorrect]) => {
          const numericId = Number(questionId);
          if (!Number.isNaN(numericId)) {
            acc[numericId] = Boolean(isCorrect);
          }
          return acc;
        },
        {}
      );

      setQuestionResults(normalizedResults);
      setScore(result.correct_count);
      // TODO: Backend returns total_questions as 100 (full dataset), not actual questions shown (10)
      // Fix backend to return count of questions in this quiz, not total in dataset
      setTotalQuestions(10);
      setQuizSubmitted(true);
      setCompletionSaved(null);

      // Check achievements
      const timeSeconds = (Date.now() - quizStartTime) / 1000;
      const unlockedIds = checkAchievements(
        result.correct_count,
        10,
        gameState.metrics.streak,
        timeSeconds,
        lesson?.id ?? 0
      );
      setNewlyUnlockedAchievements(unlockedIds);

      // Queue toasts for each newly unlocked achievement
      if (unlockedIds.length > 0) {
        const toasts = unlockedIds
          .map(id => {
            const ach = achievements.find(a => a.id === id);
            return ach ? { id, name: ach.name, icon: ach.icon } : null;
          })
          .filter(Boolean) as Array<{ id: string; name: string; icon: string }>;
        setToastQueue(toasts);
      }

      try {
        // Keep this explicit completion write for dashboard sync.
        await api.markLessonComplete(Number(courseId), lesson.id, result.score);
        setCompletionSaved(true);

        try {
          const recommendation = await api.getNextLearningRecommendation();
          if (recommendation.lessonId && recommendation.lessonId !== lesson.id) {
            setNextRecommendation(recommendation);
          } else {
            setNextRecommendation(null);
          }
        } catch (recommendationError) {
          console.error('Completion saved but next recommendation fetch failed:', recommendationError);
          setNextRecommendation(null);
        }
      } catch (completionError) {
        console.error('Quiz graded but completion save failed:', completionError);
        setCompletionSaved(false);
        setSubmitError('Quiz was graded, but saving progress failed. Please try again.');
        setNextRecommendation(null);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setSubmitError('We could not submit your quiz to the server. Please try again.');
      setQuizSubmitted(false);
      setCompletionSaved(null);
      setNextRecommendation(null);
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setSubmitError('');
    setScore(null);
    setTotalQuestions(null);
    setQuestionResults({});
    setCompletionSaved(null);
    setNextRecommendation(null);
    gameState.resetMetrics();
    setLastAnsweredQuestionId(null);
    setNewlyUnlockedAchievements([]);
  }

  useEffect(() => {
    async function load() {
      if (!courseId || !lessonId) return;
      setLoading(true);
      
      try {
        // Fetch lessons to find order_index
        const lessons = await api.getLessons(Number(courseId));
        const currentLesson = lessons.find(l => l.id === Number(lessonId));
        
        if (currentLesson) {
          setLesson(currentLesson);

          // 3. Fetch Questions using the specific path from your API docs
          // Path: /courses/{id}/lessons/order/{index}/questions/random
          console.log(`Fetching questions for Order Index: ${currentLesson.order_index}`);
          try {
            const qs = await api.getRandomQuestionsByOrder(Number(courseId), currentLesson.order_index, 10);
            const normalizedQuestions = Array.isArray(qs) ? qs : [];
            setQuestions(normalizedQuestions);

            if (normalizedQuestions.length > 0) {
              try {
                const answerEntries = await Promise.all(
                  normalizedQuestions.map(async (question) => {
                    const answers = await api.getQuestionAnswers(Number(courseId), currentLesson.id, question.id);
                    return [question.id, Array.isArray(answers) ? answers : []] as const;
                  })
                );

                setAnswersByQuestion(Object.fromEntries(answerEntries));
              } catch (answersError) {
                console.error('Failed to fetch question answers:', answersError);
                setAnswersByQuestion({});
              }
            } else {
              setAnswersByQuestion({});
            }
          } catch (error) {
            console.error('Failed to fetch questions:', error);
            setQuestions([]); // Keep as empty to show no questions message
            setAnswersByQuestion({});
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

  // Manage achievement toast queue
  useEffect(() => {
    if (toastQueue.length > 0 && !currentToast) {
      const nextToast = toastQueue[0];
      setCurrentToast(nextToast);
      setToastQueue(toastQueue.slice(1));
    }
  }, [toastQueue, currentToast]);

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
        
        <LessonContent apiContent={lesson.content ?? ''} />

        <section className="bg-[var(--bg-sidebar)] border-t-4 border-[var(--accent)] rounded-lg shadow-2xl overflow-hidden mt-12">
          <div className="bg-[var(--bg-main)] p-6 border-b border-[var(--border-color)] space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-pixel text-[var(--text-main)]">KNOWLEDGE CHECK</h2>
              <Play className="text-[var(--accent)]" />
            </div>
            {!quizSubmitted && (
              <GameHUD
                streak={gameState.metrics.streak}
                totalXP={gameState.metrics.totalXP}
                multiplier={gameState.metrics.xpMultiplier}
                currentQuestion={gameState.metrics.answeredQuestions.size + 1}
                totalQuestions={questions.length}
              />
            )}
          </div>
          
          <div className="p-8 space-y-10">
            {questions.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-muted)] border border-dashed border-[var(--border-color)]">
                NO QUESTIONS GENERATED FOR THIS ORDER INDEX ({lesson.order_index})
              </div>
            ) : (
              questions.map((q, idx) => (
                <div key={`question-${q.id || idx}`}>
                  {(() => {
                    const questionOptions = getQuestionOptions(q, answersByQuestion[q.id]);

                    return (
                      <>
                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-4">
                    <span className="text-[var(--text-muted)] mr-2">
                      {idx + 1}/{questions.length}.
                    </span>
                    {getQuestionText(q)}
                  </h3>
                  
                  {questionOptions.length === 0 ? (
                    <div className="rounded border border-dashed border-[var(--border-color)] px-4 py-3 text-sm font-mono text-[var(--text-muted)]">
                      ANSWER OPTIONS UNAVAILABLE FOR THIS QUESTION.
                    </div>
                  ) : (
                    <div className="grid gap-3">
                    {questionOptions.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === opt.id;
                      let cls = "border-[var(--border-color)] bg-[var(--bg-main)]/50 text-[var(--text-muted)]";
                      
                      if (quizSubmitted) {
                        if (isSelected && questionResults[q.id] === true) {
                          cls = "border-green-500 bg-green-500/10 text-green-500";
                        } else if (isSelected && questionResults[q.id] === false) {
                          cls = "border-red-500 bg-red-500/10 text-red-500";
                        }
                      } else if (isSelected) {
                        cls = "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)]";
                      }
                      
                      return (
                        <button 
                          key={`opt-${q.id}-${opt.id || optIdx}`} 
                          onClick={() => {
                            if (!quizSubmitted) {
                              const isCorrect = opt.is_correct || false;
                              gameState.recordAnswer(q.id, isCorrect);
                              setLastAnsweredQuestionId(q.id);
                              setSelectedAnswers(p => ({...p, [q.id]: opt.id}));
                            }
                          }} 
                          className={`w-full text-left p-4 border rounded flex items-center gap-3 transition-all ${cls}`}
                        >
                          {isSelected ? <CheckCircle2 size={18}/> : <Circle size={18}/>} 
                          {opt.text}
                        </button>
                      );
                    })}
                    </div>
                  )}
                      </>
                    );
                  })()}
                </div>
              ))
            )}
          </div>
          
          <div className="p-6 bg-[var(--bg-main)] border-t border-[var(--border-color)] flex justify-end">
             {!quizSubmitted ? (
               <button 
                 onClick={handleSubmitQuiz}
                 disabled={questions.length === 0 || unansweredCount > 0 || submitting}
                 className="bg-[var(--accent)] text-black font-bold font-pixel py-3 px-8 rounded disabled:opacity-50"
               >
                 {submitting
                   ? 'SUBMITTING...'
                   : unansweredCount > 0
                     ? `ANSWER ${unansweredCount} MORE`
                     : 'SUBMIT'}
               </button> 
             ) : (
               <div className="flex items-center gap-4">
                  <button 
                    onClick={handleRetry}
                    className="text-[var(--text-muted)] text-xs underline font-pixel"
                  >
                    RETRY
                  </button>
                  <span className={`font-bold font-pixel ${completionSaved === false ? 'text-orange-500' : 'text-green-500'}`}>
                    {completionSaved === false ? 'GRADED' : 'COMPLETE'}
                  </span>
               </div>
             )}
          </div>

          {quizSubmitted && score !== null && totalQuestions !== null && (
            <div className="px-6 py-8 space-y-6">
              <QuizResultsCard
                score={score}
                totalQuestions={totalQuestions}
                totalXP={gameState.metrics.totalXP}
                streak={gameState.metrics.streak}
                correctCount={gameState.metrics.correctCount}
              />
              <AchievementsPanel
                achievements={achievements}
                newlyUnlockedIds={newlyUnlockedAchievements}
              />
            </div>
          )}

          {submitError && (
            <div className="px-6 pb-6 text-sm font-mono text-red-400">
              {submitError}
            </div>
          )}

          {quizSubmitted && completionSaved && nextRecommendation?.courseId && nextRecommendation.lessonId && (
            <div className="px-6 pb-6 text-sm font-mono text-[var(--text-main)] space-y-2">
              <div>
                NEXT LEVEL UNLOCKED HERE:{' '}
                <Link
                  to={`/course/${nextRecommendation.courseId}/lesson/${nextRecommendation.lessonId}`}
                  className="font-bold text-[var(--accent)] underline"
                >
                  {`LESSON ${nextRecommendation.lessonId}`}
                </Link>
              </div>
              {nextRecommendation.message && (
                <div>{nextRecommendation.message}</div>
              )}
              {nextRecommendation.reason && (
                <div className="text-[var(--text-muted)]">REASON: {nextRecommendation.reason}</div>
              )}
            </div>
          )}
        </section>

        <XPFloatingText 
          amount={gameState.lastXPGain?.amount ?? 0}
          isVisible={lastAnsweredQuestionId !== null && gameState.lastXPGain !== null}
        />

        {currentToast && (
          <AchievementToast
            achievementName={currentToast.name}
            achievementIcon={currentToast.icon}
            isVisible={!!currentToast}
            onClose={() => setCurrentToast(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}