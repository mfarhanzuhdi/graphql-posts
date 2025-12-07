import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from './PostCard';
import './PostsList.css';
import CreatePostForm from './CreatePostForm';

const PostsList: React.FC = () => {
  const { posts, loading, error, page, limit, goNext, goPrev, totalCount, refresh } = usePosts(1, 10);

  return (
    <div className="container">
      <h1>Posts</h1>

      <CreatePostForm onCreated={refresh} />

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && posts.length === 0 && <p>No posts found.</p>}

      <div className="posts-grid">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={goPrev} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} — total {totalCount}
        </span>
        <button
          onClick={goNext}
          disabled={page * limit >= totalCount && totalCount !== 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsList;
