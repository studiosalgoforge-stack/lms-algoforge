'use client';
import { useState } from 'react';

export default function QuestionCard({ q, onAnswered }: { q: any; onAnswered?: () => void }) {
  const [expanded, setExpanded] = useState(false);

  const hasAnswer = q.answers && q.answers.length > 0;
  const answer = hasAnswer ? q.answers[q.answers.length - 1] : null;

  return (
    <article className="card p-4 flex flex-col gap-3">
      <a href={`/q/${q._id}`} className="text-lg font-semibold hover:underline">{q.title}</a>
      <div className="text-sm text-gray-500 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1">📁 {q.category}</span>
        <span>🕒 {new Date(q.createdAt).toLocaleDateString()}</span>
        <span>👁 {q.views || 0} Views</span>
      </div>

      {/* Answer preview (compressed) */}
      {hasAnswer && (
        <div className="relative">
          <div className={`${expanded ? '' : 'max-h-24 overflow-hidden'} prose prose-sm`}>{answer.body}</div>
          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white pointer-events-none" />
          )}
          <button className="text-sm font-medium text-teal-700 mt-1" onClick={() => setExpanded(v => !v)}>
            {expanded ? 'Show less' : 'Show full answer'}
          </button>
        </div>
      )}

      {!hasAnswer && (
        <div className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">No answer yet</div>
      )}

      {q.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {q.tags.map((t: string) => (
            <span key={t} className="px-2 py-1 text-xs rounded-full bg-gray-100 border">#{t}</span>
          ))}
        </div>
      )}
    </article>
  );
}
