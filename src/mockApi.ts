import type { Course } from './types';

export const mockSkillTreeData: Course[] = [
  {
    id: 1,
    title: 'Python',
    lessons: [
      { id: 11, title: 'Fundamentals', status: 'completed' },
      { id: 12, title: 'Stats & Matrix', status: 'completed' },
      { id: 13, title: 'Adv. Data & Vis.', status: 'unlocked' },
      { id: 14, title: 'System & Optimization', status: 'locked' },
    ],
  },
  {
    id: 2,
    title: 'R',
    lessons: [
      { id: 21, title: 'Control Structure', status: 'unlocked' },
      { id: 22, title: 'Functions & Exceptions', status: 'locked' },
      { id: 23, title: 'OOP & File Handling', status: 'locked' },
      { id: 24, title: 'Adv. Data Manipulation', status: 'locked' },
    ],
  },
  {
    id: 3,
    title: 'SQL',
    lessons: [
      { id: 31, title: 'Data Retrieval', status: 'locked' },
      { id: 32, title: 'Aggregation & Sorting', status: 'locked' },
      { id: 33, title: 'Joins & Schemas', status: 'locked' },
      { id: 34, title: 'Filtering Groups', status: 'locked' },
    ],
  },
];

export const fetchSkillTreeData = async (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSkillTreeData), 500);
  });
};