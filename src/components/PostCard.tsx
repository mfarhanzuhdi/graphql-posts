import React from 'react';
import { Post } from '../types';
import { Link } from 'react-router-dom';
import './PostCard.css';

type Props = {
  post: Post;
};

const truncate = (text: string, n = 100) => (text.length > n ? text.slice(0, n) + '…' : text);

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="post-card">
      <h3 className="post-title">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-body">{truncate(post.body || '', 100)}</p>
      <p className="post-author">Author: {post.user?.name || 'Unknown'}</p>
    </div>
  );
};
