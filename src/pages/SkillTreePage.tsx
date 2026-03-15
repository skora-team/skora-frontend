// src/pages/SkillTreePage.tsx
import { useEffect, useState } from "react";
import { fetchSkillTreeData } from "../mockApi";
import type { Course } from "../types";
import { LessonNode } from "../components/LessonNode";
import { SkillTreeLines } from "../components/SkillTreeLines";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SkillTreePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchSkillTreeData().then(setCourses);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: "url('/blue.webp')",
        backgroundColor: "#bfdbfe",
      }}
    >
      <div>
        <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/DashboardHome" 
          className="flex items-center gap-2 font-pixel text-[10px] text-[#451a03] bg-white/30 backdrop-blur-sm border-2 border-[#451a03] px-4 py-2 transition-all hover:bg-white/50 hover:-translate-y-0.5 active:translate-y-0 shadow-[4px_4px_0px_#451a03] uppercase"
        >
          <ArrowLeft size={14} /> Back_To_Dashboard
        </Link>
      </div>
      </div>
      <div className="relative w-full flex justify-center pt-16">
        <SkillTreeLines />
        
        <div className="relative flex flex-col items-center z-10 w-[900px]">
          <h1 className="font-pixel text-4xl text-[#451a03] tracking-widest mb-16 pixel-font">
  AIML
</h1>


          <div className="flex justify-between w-full">
            {courses.map((course) => (
              <div key={course.id} className="flex flex-col items-center w-[220px]">
                <h2 className="pixel-font text-xl text-slate-800 mb-2 pixel-font">
                  {course.title.toUpperCase()}
                </h2>

                <div className="flex flex-col items-center gap-4 pixel-font">
                  {course.lessons.map((lesson, index) => (
                    <LessonNode
                      key={lesson.id}
                      lesson={lesson}
                      isLast={index === course.lessons.length - 1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
