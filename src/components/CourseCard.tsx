import React from "react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  category: string;
  title: string;
  description: string;
  level: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  category,
  title,
  description,
  level,
  image,
}) => {
  return (
    <Link
      to="/skills"   // 👈 THIS links to SkillTreePage.tsx
      className="relative w-96 max-w-xs md:max-w-sm lg:max-w-md bg-slate-950 rounded-2xl overflow-hidden border border-white border-opacity-10 shadow-2xl transition-all duration-200 hover:-translate-y-4 hover:shadow-3xl hover:border-white hover:border-opacity-20 block no-underline"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover block"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black from-0% via-black via-40% to-transparent to-100%" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 text-white">
          <span className="text-xs uppercase tracking-wider opacity-80">
            {category}
          </span>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
