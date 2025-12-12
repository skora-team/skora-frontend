// src/mockApi.ts

import type{ Course } from './types';

// This is what the data from your `GET /courses/` endpoint will look like.
const mockSkillTreeData: Course[] = [
  {
    id: 10,
    title: 'Python',
    lessons: [
      { id: 11, title: 'Fundamentals', status: 'unlocked', description: 'Learn the basic syntax, variables, and data types in Python.' },
      { id: 12, title: 'Stats & Matrix', status: 'locked', description: 'Understand how to perform statistical analysis and work with matrices.' },
      { id: 13, title: 'Adv. Data & Vis.', status: 'locked', description: 'Dive into advanced data manipulation and create compelling visualizations.' },
      { id: 14, title: 'System & Optimization', status: 'locked', description: 'Optimize your code for performance and system efficiency.' },
    ],
  },
  {
    id: 20,
    title: 'R',
    lessons: [
      { id: 21, title: 'Control Structure', status: 'unlocked', description: 'Master loops, conditionals, and functions to control your program\'s flow.' },
      { id: 22, title: 'Functions & Exceptions', status: 'locked', description: 'Write reusable functions and handle errors gracefully with exceptions.' },
      { id: 23, title: 'OOP & File Handling', status: 'locked', description: 'Explore object-oriented programming concepts and read/write from files.' },
      { id: 24, title: 'Adv. Data Manipulation', status: 'locked', description: 'Use powerful packages to wrangle and transform complex datasets in R.' },
    ],
  },
  {
    id: 30,
    title: 'SQL',
    lessons: [
      { id: 31, title: 'Data Retrieval', status: 'unlocked', description: 'Learn the fundamentals of querying databases to retrieve information with SELECT.' },
      { id: 32, title: 'Aggregation & Sorting', status: 'locked', description: 'Group and sort data to derive meaningful insights and summaries.' },
      { id: 33, title: 'Joins & Schemas', status: 'locked', description: 'Combine data from multiple tables using various types of JOINs.' },
      { id: 34, title: 'Filtering Groups', status: 'locked', description: 'Apply advanced filtering techniques on grouped data using HAVING.' },
    ],
  },
];

export const fetchSkillTreeData = async (): Promise<Course[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSkillTreeData;
};