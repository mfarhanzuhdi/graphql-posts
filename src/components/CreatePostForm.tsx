import React, { useState } from 'react';
import { gqlClient } from '../api/client';
import { CREATE_POST } from '../api/queries';
import './CreatePostForm.css';

type Props = {
  onCreated?: () => void;
};

const CreatePostForm: React.FC<Props> = ({ onCreated }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const input = { title, body, userId: Number(userId) };
      const data = await gqlClient.request(CREATE_POST, { input });
      setMessage('Post created (mock response). ID: ' + data.createPost.id);
      // optionally reset
      setTitle('');
      setBody('');
      if (onCreated) onCreated();
    } catch (err: any) {
      setMessage('Error: ' + (err.message || 'unknown'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-form">
      <h2>Buat Post Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="field">
          <label>Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>

        <div className="field">
          <label>User ID</label>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreatePostForm;
