import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

type Props = {
  apiContent: string;
};

export function LessonContent({ apiContent }: Props) {
  return (
    <section className="lesson-shell">
      <article className="lesson-card sci-markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
        >
          {apiContent}
        </ReactMarkdown>
      </article>
    </section>
  );
}
