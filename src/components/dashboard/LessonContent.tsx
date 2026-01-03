import { Terminal, Copy } from 'lucide-react';

interface LessonContentProps {
  title: string;
  courseTitle: string;
  apiContent?: string;
}

export function LessonContent({ title, courseTitle, apiContent }: LessonContentProps) {
  if (apiContent && apiContent.length > 10) {
    return <div className="prose dark:prose-invert max-w-none">{apiContent}</div>;
  }

  const isPython = courseTitle.toLowerCase().includes('python');
  const isSQL = courseTitle.toLowerCase().includes('sql');
  const isR = courseTitle.toLowerCase().includes('r');

  let codeSnippet = '';
  let introText = '';

  if (isPython) {
    introText = `In this module on ${title}, we explore Python's core syntax. Python is known for its readability.`;
    codeSnippet = `# Example: ${title}\ndef main():\n    print(f"Processing {title}...")\n    return True\n\nif __name__ == "__main__":\n    main()`;
  } else if (isSQL) {
    introText = `Structured Query Language (SQL) is essential for ${title}. Optimize your queries!`;
    codeSnippet = `-- Example: ${title}\nSELECT * FROM data\nWHERE type = '${title}'\nORDER BY id DESC;`;
  } else if (isR) {
    introText = `R is a powerhouse for statistical computing. In ${title}, we verify dataframes.`;
    codeSnippet = `# Example: ${title}\nlibrary(ggplot2)\ndf <- data.frame(x=1:10, y=rnorm(10))\nplot(df$x, df$y)`;
  } else {
    introText = `Welcome to the lesson on ${title}. Read carefully before attempting the quiz.`;
    codeSnippet = `// System initialized for: ${title}`;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[var(--bg-sidebar)] p-6 rounded-lg border border-[var(--border-color)]">
        <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Introduction</h2>
        <p className="text-[var(--text-muted)] leading-relaxed">{introText}</p>
      </div>
      <div className="relative group">
        <div className="absolute -top-3 left-4 bg-[var(--accent)] text-black text-[10px] font-bold px-2 py-1 rounded uppercase">CODE EXAMPLE</div>
        <div className="bg-[#0f0f1a] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-lg">
          <div className="flex justify-between items-center px-4 py-2 bg-[#1a1a2e] border-b border-[var(--border-color)]">
            <div className="flex space-x-2"><div className="w-3 h-3 rounded-full bg-red-500/50"></div><div className="w-3 h-3 rounded-full bg-yellow-500/50"></div><div className="w-3 h-3 rounded-full bg-green-500/50"></div></div>
            <Copy size={14} className="text-gray-500 cursor-pointer hover:text-white" />
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-300"><code>{codeSnippet}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}