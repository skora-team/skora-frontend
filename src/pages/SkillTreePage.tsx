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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#11112b]">LOADING...</div>;

  const getColor = (index: number) => {
    if (index === 0) return 'yellow';
    if (index === 1) return 'blue';
    return 'orange';
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center overflow-x-auto w-full bg-white">
      
      {/* 1. Header Title */}
      <h1 className="text-5xl md:text-6xl font-black text-[#ea580c] mb-2 tracking-widest drop-shadow-[4px_4px_0_#7c2d12]" 
          style={{ textShadow: '4px 4px 0px #431407' }}>
        AIML
      </h1>

      {/* 2. Top Vertical Line (Connecting Title to Yellow Box) */}
      <div className="h-10 w-3 bg-[#ea580c] border-x-2 border-[#9a3412] shadow-[0_0_10px_#ea580c]" />

      {/* 3. The Root Node (Empty Yellow Box) */}
      <div className="w-72 h-20 bg-[#fbbf24] border-4 border-[#b45309] shadow-[6px_6px_0_rgba(0,0,0,0.5)] z-20 relative rounded-sm"></div>

      {/* 4. The Fork / Branching System */}
      <div className="flex flex-col items-center w-full">
        
        {/* Main Stem (From Root Box down) */}
        <div className="w-3 h-12 bg-[#ea580c] border-x-2 border-[#9a3412] shadow-[0_0_10px_#ea580c]" />

        {/* The Horizontal Bar (Connects all 3 columns) */}
        {/* We use a fixed width container that matches the columns layout below */}
        <div className="relative w-[760px] h-3 bg-[#ea580c] border-y-2 border-[#9a3412] shadow-[0_0_15px_#ea580c] rounded-full">
           
           {/* Left Drop Line */}
           <div className="absolute left-[120px] top-1 w-3 h-12 bg-[#ea580c] border-x-2 border-[#9a3412]" />
           
           {/* Center Drop Line (connects to the stem above) */}
           <div className="absolute left-1/2 -translate-x-1/2 top-1 w-3 h-12 bg-[#ea580c] border-x-2 border-[#9a3412]" />
           
           {/* Right Drop Line */}
           <div className="absolute right-[120px] top-1 w-3 h-12 bg-[#ea580c] border-x-2 border-[#9a3412]" />
        </div>
      </div>

      {/* 5. The Three Columns */}
      {/* We shift this up slightly (-mt-2) to connect visually with the drop lines */}
      <div className="flex justify-center items-start w-[800px] mt-10 gap-16">
        
        {courses.map((course, index) => {
          const theme = getColor(index);
          const headerColors = {
            yellow: 'bg-[#fbbf24] border-[#b45309] text-black',
            blue: 'bg-[#3b82f6] border-[#1d4ed8] text-white',
            orange: 'bg-[#f97316] border-[#c2410c] text-black',
          }[theme];

          return (
            <div key={course.id} className="flex flex-col items-center w-48">
              
              {/* Column Header Box */}
              <div className={`w-full h-14 flex items-center justify-center border-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)] mb-8 ${headerColors}`}>
                <h2 className="text-md font-bold uppercase tracking-widest text-center">
                  {course.title}
                </h2>
              </div>

              {/* Lesson Stack */}
              <div className="flex flex-col items-center w-full">
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