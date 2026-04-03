import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { AnswerOption, Lesson, Question, RecommendationTarget } from '../../types/api.types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LessonContent } from '../../components/dashboard/LessonContent';
import { ChevronLeft, CheckCircle2, Circle, XCircle } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { XPFloatingText } from '../../components/XPFloatingText';
import { QuizResultsCard } from '../../components/QuizResultsCard';
import { useAchievements } from '../../hooks/useAchievements';
import { AchievementsPanel } from '../../components/AchievementsPanel';
import { AchievementToast } from '../../components/AchievementToast';
import { BattleUI } from '../../components/BattleUI';
import { useBattle } from '../../hooks/useBattle';
import { generateRandomEnemy } from '../../utils/enemyGenerator';
import type { BattleEnemyConfig } from '../../components/BattleUI';

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

  // Battle State
  const [enemy, setEnemy] = useState<BattleEnemyConfig | null>(null);
  const battleHook = useBattle({ difficultyTier: 'apprentice', totalQuestions: 10 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [turnInProgress, setTurnInProgress] = useState(false);

  async function handleSubmitQuiz() {
    if (!lesson || !courseId || questions.length === 0) return;

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
    setCurrentQuestionIndex(0);
    setTurnInProgress(false);
  }

  function handleSubmitTurn() {
    if (!questions[currentQuestionIndex]) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswerId = selectedAnswers[currentQuestion.id];
    
    if (selectedAnswerId === undefined) return;
    
    setTurnInProgress(true);
    
    // Check if answer is correct
    const answers = answersByQuestion[currentQuestion.id] || [];
    const selectedOption = answers.find(a => a.id === selectedAnswerId);
    const isCorrect = selectedOption?.is_correct || false;
    
    // Update battle state
    if (isCorrect) {
      battleHook.recordCorrectAnswer();
    } else {
      battleHook.recordWrongAnswer();
    }
    
    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      // More questions - advance turn
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTurnInProgress(false);
      }, 800); // Let battle animation play
    } else {
      // Last question - submit quiz
      setTimeout(() => {
        handleSubmitQuiz();
      }, 800);
    }
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
          // Generate random enemy for this battle
          const randomEnemy = generateRandomEnemy('apprentice'); // Can be scaled by user rank later
          setEnemy(randomEnemy);

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

        {/* BATTLE MODE - Wrap quiz in BattleUI */}
        {enemy && (
          <BattleUI enemy={enemy} state={battleHook.battleState}>
            <section className="bg-[var(--bg-sidebar)] border-t-4 border-[var(--accent)] rounded-lg shadow-2xl overflow-hidden mt-12">
          
          <div className="p-8 space-y-10">
            {questions.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-muted)] border border-dashed border-[var(--border-color)]">
                NO QUESTIONS GENERATED FOR THIS ORDER INDEX ({lesson.order_index})
              </div>
            ) : !quizSubmitted ? (
              // TURN-BASED MODE: Show only current question
              (() => {
                const q = questions[currentQuestionIndex];
                const questionOptions = getQuestionOptions(q, answersByQuestion[q.id]);
                
                return (
                  <div className="pb-4">
                    {/* Turn Counter */}
                    <div className="mb-6 p-4 bg-[var(--accent-glow)] border border-[var(--accent)] rounded-lg">
                      <div className="text-center">
                        <div className="text-sm font-pixel text-[var(--text-muted)]">⚔️ TURN {currentQuestionIndex + 1} OF {questions.length}</div>
                        <div className="text-2xl font-bold font-pixel text-[var(--accent)] mt-1">KNOWLEDGE STRIKE</div>
                      </div>
                    </div>

                    {/* Question */}
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-6">
                      {getQuestionText(q)}
                    </h3>
                    
                    {/* Answer Options */}
                    {questionOptions.length === 0 ? (
                      <div className="rounded border border-dashed border-[var(--border-color)] px-4 py-3 text-sm font-mono text-[var(--text-muted)]">
                        ANSWER OPTIONS UNAVAILABLE FOR THIS QUESTION.
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {questionOptions.map((opt, optIdx) => {
                          const optIsSelected = selectedAnswers[q.id] === opt.id;
                          let cls = "border-[var(--border-color)] bg-[var(--bg-main)]/50 text-[var(--text-muted)] hover:border-[var(--accent)] hover:bg-[var(--bg-main)]";
                          
                          if (optIsSelected) {
                            cls = "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)] ring-2 ring-[var(--accent)]/50";
                          }
                          
                          return (
                            <button 
                              key={`opt-${q.id}-${opt.id || optIdx}`} 
                              onClick={() => {
                                if (!turnInProgress) {
                                  setSelectedAnswers(p => ({...p, [q.id]: opt.id}));
                                }
                              }}
                              disabled={turnInProgress}
                              className={`w-full text-left p-4 border rounded flex items-center gap-3 transition-all ${cls} disabled:opacity-50`}
                            >
                              {optIsSelected ? <CheckCircle2 size={20} className="flex-shrink-0" /> : <Circle size={20} className="flex-shrink-0" />} 
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              // RESULTS MODE: Show all questions with results
              questions.map((q, idx) => (
                <div key={`question-result-${q.id || idx}`}>
                  {(() => {
                    const questionOptions = getQuestionOptions(q, answersByQuestion[q.id]);
                    const wasCorrect = questionResults[q.id] === true;

                    return (
                      <>
                        <h3 className="text-lg font-bold text-[var(--text-main)] mb-4">
                          <span className="text-[var(--text-muted)] mr-2">
                            {idx + 1}/{questions.length}.
                          </span>
                          {getQuestionText(q)}
                          {wasCorrect ? (
                            <CheckCircle2 className="inline ml-2 text-green-500" size={20} />
                          ) : (
                            <XCircle className="inline ml-2 text-red-500" size={20} />
                          )}
                        </h3>
                        
                        {questionOptions.length === 0 ? (
                          <div className="rounded border border-dashed border-[var(--border-color)] px-4 py-3 text-sm font-mono text-[var(--text-muted)]">
                            ANSWER OPTIONS UNAVAILABLE FOR THIS QUESTION.
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            {questionOptions.map((opt, optIdx) => {
                              const optIsSelected = selectedAnswers[q.id] === opt.id;
                              let cls = "border-[var(--border-color)] bg-[var(--bg-main)]/50 text-[var(--text-muted)]";
                              
                              if (optIsSelected && wasCorrect) {
                                cls = "border-green-500 bg-green-500/10 text-green-500";
                              } else if (optIsSelected && !wasCorrect) {
                                cls = "border-red-500 bg-red-500/10 text-red-500";
                              }
                              
                              return (
                                <button 
                                  key={`result-opt-${q.id}-${opt.id || optIdx}`} 
                                  disabled
                                  className={`w-full text-left p-4 border rounded flex items-center gap-3 ${cls}`}
                                >
                                  {optIsSelected ? <CheckCircle2 size={18}/> : <Circle size={18}/>} 
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
                 onClick={handleSubmitTurn}
                 disabled={selectedAnswers[questions[currentQuestionIndex]?.id] === undefined || turnInProgress}
                 className="bg-[var(--accent)] text-black font-bold font-pixel py-3 px-8 rounded disabled:opacity-50 hover:bg-[var(--accent)]/90 transition-all"
               >
                 {turnInProgress
                   ? 'EXECUTING...'
                   : currentQuestionIndex === questions.length - 1
                     ? 'FINAL STRIKE'
                     : `NEXT TURN ▶︎ ${currentQuestionIndex + 1}/${questions.length}`}
               </button> 
             ) : (
               <div className="flex items-center gap-4">
                  <button 
                    onClick={handleRetry}
                    className="text-[var(--text-muted)] text-xs underline font-pixel hover:text-[var(--accent)]"
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
          </BattleUI>
        )}

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