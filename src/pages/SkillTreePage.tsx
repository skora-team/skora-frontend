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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-sky-200">LOADING...</div>;

  const getColor = (index: number) => {
    if (index === 0) return 'yellow';
    if (index === 1) return 'blue';
    return 'orange';
  };

  const renderHeader = (title: string) => {
    return (
      <div className="flex items-center justify-center">
        {/* Dark text for light background */}
        <h2 className="text-2xl font-extrabold text-slate-700 uppercase drop-shadow-sm select-none font-sans tracking-wide">
          {title}
        </h2>
      </div>
    );
  };

  return (
    // UPDATED: Background image is now blue.webp
    <div 
      className="min-h-screen p-8 pb-32 flex flex-col items-center overflow-x-auto bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: "url('/blue.webp')",
        backgroundColor: "#bfdbfe" // Light blue fallback
      }}
    >
      <div className="relative z-10 flex flex-col items-center" style={{ minWidth: '750px' }}>

        {/* AIML HEADER */}
        <div style={{ marginTop: '25px', marginBottom: '45px' }}>
          {/* Dark text for light background */}
          <h1 className="text-4xl font-extrabold text-[#451a03] uppercase drop-shadow-lg select-none font-sans tracking-widest">
            AIML
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '35px' }}>
          
          {courses.map((course, index) => {
            const theme = getColor(index);

            return (
              <div key={course.id} className="flex flex-col items-center flex-shrink-0" style={{ width: '200px' }}>
                
                <div className="w-full flex justify-center" style={{ marginBottom: '35px' }}>
                  {renderHeader(course.title)}
                </div>

                <div className="relative flex flex-col items-center w-full">
                  
                  {course.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex flex-col items-center w-full">
                      
                      <div style={{ height: '20px' }}></div>
                      
                      <LessonNode lesson={lesson} colorTheme={theme} />
                      
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}