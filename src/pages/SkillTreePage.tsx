import { useEffect, useState } from 'react';
import { fetchSkillTreeData } from '../mockApi';
import type { Course } from '../types';
import { LessonNode } from '../components/LessonNode';

export function SkillTreePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSkillTreeData().then(data => {
      setCourses(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white">LOADING...</div>;

  const getColor = (index: number) => {
    if (index === 0) return 'yellow';
    if (index === 1) return 'blue';
    return 'orange';
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center overflow-x-auto w-full bg-white">
      
      {/* 1. Header Title */}
      <h1 className="text-5xl md:text-6xl font-black text-[#f97316] mb-2 tracking-widest drop-shadow-[4px_4px_0_#7c2d12]">
        AIML
      </h1>

      {/* 2. Top Connector (Orange) */}
      <div className="h-8 w-2 bg-orange-500 shadow-[0_0_15px_#f97316] mb-0" />

      {/* 3. The Root Node (Empty Yellow Box) */}
      <div className="w-64 h-16 bg-[#fbbf24] border-4 border-[#b45309] shadow-[6px_6px_0_rgba(0,0,0,0.5)] z-20 relative"></div>

      {/* 4. Branching System Container */}
      <div className="flex flex-col items-center w-full max-w-4xl">
        
        {/* Main Vertical Stem */}
        <div className="w-2 h-10 bg-orange-500 shadow-[0_0_15px_#f97316]" />

        {/* Horizontal Distributor Bar */}
        {/* Width calculation: spans roughly from center of col 1 to center of col 3 */}
        <div className="w-[calc(100%-12rem)] md:w-[680px] h-2 bg-orange-500 shadow-[0_0_15px_#f97316] relative flex justify-between">
           {/* Dropdown Line: Left */}
           <div className="absolute left-0 top-0 w-2 h-10 bg-orange-500 shadow-[0_0_15px_#f97316]" />
           {/* Dropdown Line: Center */}
           <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-10 bg-orange-500 shadow-[0_0_15px_#f97316]" />
           {/* Dropdown Line: Right */}
           <div className="absolute right-0 top-0 w-2 h-10 bg-orange-500 shadow-[0_0_15px_#f97316]" />
        </div>
      </div>

      {/* 5. The Three Columns */}
      <div className="flex justify-between items-start w-full max-w-5xl mt-8 px-2 md:px-0 gap-4">
        {courses.map((course, index) => {
          const theme = getColor(index);
          const headerColors = {
            yellow: 'bg-[#fbbf24] border-[#b45309] text-black',
            blue: 'bg-[#3b82f6] border-[#1d4ed8] text-white',
            orange: 'bg-[#f97316] border-[#c2410c] text-black',
          }[theme];

          return (
            <div key={course.id} className="flex flex-col items-center flex-1">
              {/* Column Header Box */}
              <div className={`w-full max-w-[200px] h-14 flex items-center justify-center border-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)] mb-8 ${headerColors}`}>
                <h2 className="text-sm md:text-lg font-bold uppercase tracking-widest text-center">
                  {course.title}
                </h2>
              </div>

              {/* Lesson Stack */}
              <div className="flex flex-col items-center">
                {course.lessons.map((lesson) => (
                  <LessonNode key={lesson.id} lesson={lesson} colorTheme={theme} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}