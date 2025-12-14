// src/pages/SkillTreePage.tsx
import { useEffect, useState } from "react";
import { fetchSkillTreeData } from "../mockApi";
import type { Course } from "../types";
import { LessonNode } from "../components/LessonNode";
import { SkillTreeLines } from "../components/SkillTreeLines";

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
      <div className="relative w-full flex justify-center pt-16">
        <SkillTreeLines />

        <div className="relative flex flex-col items-center z-10 w-[900px]">
          <h1 className="font-pixel text-4xl text-[#451a03] tracking-widest mb-16">
  AIML
</h1>


          <div className="flex justify-between w-full">
            {courses.map((course) => (
              <div key={course.id} className="flex flex-col items-center w-[220px]">
                <h2 className="pixel-font text-xl text-slate-800 mb-2">
                  {course.title.toUpperCase()}
                </h2>

                <div className="flex flex-col items-center gap-4">
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
