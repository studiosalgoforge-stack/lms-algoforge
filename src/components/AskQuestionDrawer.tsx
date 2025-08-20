'use client';
import { useState } from 'react';
import { createQuestion } from '../lib/api';

export default function AskQuestionDrawer({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General Question');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title.trim() || !body.trim()) return alert('Please enter title and details');
    setLoading(true);
    try {
      await createQuestion({ title, body, category, tags: tags.split(',').map(t => t.trim()).filter(Boolean) });
      setTitle(''); setBody(''); setTags(''); setCategory('General Question');
      setOpen(false); onCreated();
    } finally { setLoading(false); }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>Ask a Question</button>


      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-2 sm:p-6 overflow-y-auto" onClick={() => setOpen(false)}>
          <div className="card w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between rounded-t-2xl bg-teal-700 text-white px-4 py-3">
              <h2 className="text-lg font-semibold">Ask a Question</h2>
              <button className="text-white" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="p-4 grid gap-4">
              <input placeholder="Your Question" value={title} onChange={(e) => setTitle(e.target.value)} />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>General Question</option>
                <option>Interview Questions</option>
                <option>Doubt Questions</option>
                <option>Badges</option>
              </select>
              <textarea rows={8} placeholder="Describe your issue..." value={body} onChange={(e) => setBody(e.target.value)} />
              <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
              <div className="flex justify-end gap-3">
                <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-primary" disabled={loading} onClick={submit}>{loading ? 'Posting…' : 'Post'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
