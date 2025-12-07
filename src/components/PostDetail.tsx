import React, { useEffect, useState } from 'react';
import { gqlClient } from '../api/client';
import { GET_POST_DETAIL } from '../api/queries';
import { Post, Comment } from '../types';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';

type Data = {
  post: {
    id: string;
    title: string;
    body: string;
    user?: { id: string; name: string; email?: string };
    comments?: { data: Comment[] };
  };
};

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await gqlClient.request<Data>(GET_POST_DETAIL, { id });
        setPost({
          id: data.post.id,
          title: data.post.title,
          body: data.post.body,
          user: data.post.user ? { id: data.post.user.id, name: data.post.user.name, email: data.post.user.email } : undefined
        });
        setComments(data.post.comments?.data || []);
      } catch (err: any) {
        setError(err.message || 'Error loading post');
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="container">
      <Link to="/">← Back to posts</Link>

      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <div className="author-card">
        <h3>Author</h3>
        <p><strong>Name:</strong> {post.user?.name || '-'}</p>
        <p><strong>Email:</strong> {post.user?.email || '-'}</p>
      </div>

      <div className="comments">
        <h3>Comments ({comments.length})</h3>
        {comments.length === 0 && <p>No comments</p>}
        {comments.map(c => (
          <div key={c.id} className="comment">
            <p className="comment-name">{c.name} <span className="comment-email">({c.email})</span></p>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
