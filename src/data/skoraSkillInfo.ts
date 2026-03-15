export type SkillId = "py_fund" | "py_stats" | "py_adv" | "py_sys" |
                      "r_fund" | "r_stats" | "r_adv" | "r_sys" |
                      "sql_ret" | "sql_agg" | "sql_join" | "sql_filt";

export interface Skill {
  id: SkillId;
  label: string;
  description: string;
  icon: string;
}

export const skills: Record<SkillId, Skill> = {
  // Python Skills (4)
  "py_fund": { id: "py_fund", label: "Fundamentals", description: "Basic Python Syntax and structure.", icon: "⚙️" },
  "py_stats": { id: "py_stats", label: "Stats & Matrix", description: "NumPy and basic statistical computing.", icon: "🔢" },
  "py_adv": { id: "py_adv", label: "Advanced Data & Visualization", description: "Pandas, Matplotlib, and Seaborn mastery.", icon: "📊" },
  "py_sys": { id: "py_sys", label: "System & Optimization", description: "Memory management and performance tips.", icon: "🚀" },
  
  // R Skills (4) 
  "r_fund": { id: "r_fund", label: "Control Structure", description: "Loops, conditionals, and flow control.", icon: "➡️" },
  "r_stats": { id: "r_stats", label: "Functions & Exceptions", description: "Custom functions and error handling.", icon: "🛠️" },
  "r_adv": { id: "r_adv", label: "OOP & File Handling", description: "S3/S4 classes and I/O operations.", icon: "📂" },
  "r_sys": { id: "r_sys", label: "System & Optimization", description: "Placeholder for the end of the R path.", icon: "🏁" },

  // SQL Skills (4)
  "sql_ret": { id: "sql_ret", label: "Data Retrieval", description: "SELECT, FROM, and WHERE clauses.", icon: "🔎" },
  "sql_agg": { id: "sql_agg", label: "Aggregation & Sorting", description: "GROUP BY, HAVING, and ORDER BY.", icon: "🗃️" },
  "sql_join": { id: "sql_join", label: "Joins & Schemas", description: "INNER, LEFT, RIGHT, FULL joins and data modeling.", icon: "🔗" },
  "sql_filt": { id: "sql_filt", label: "Filtering Groups", description: "Using subqueries and advanced filtering.", icon: "🛡️" },
};