import { useEffect, useState } from 'react';
import { gqlClient } from '../api/client';
import { GET_POSTS } from '../api/queries';
import { Post } from '../types';

type UsePostsResult = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  page: number;
  totalCount: number;
  limit: number;
  goNext: () => void;
  goPrev: () => void;
  setPage: (p: number) => void;
  setLimit: (l: number) => void;
  refresh: () => Promise<void>;
};

export function usePosts(initialPage = 1, initialLimit = 10): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  async function fetchPosts(p = page, l = limit) {
    setLoading(true);
    setError(null);
    try {
      const data = await gqlClient.request(GET_POSTS, { page: p, limit: l });
      const fetched = data.posts.data;
      setPosts(fetched);
      setTotalCount(data.posts.meta.totalCount || 0);
    } catch (err: any) {
      setError(err.message || 'Error fetching posts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return {
    posts,
    loading,
    error,
    page,
    totalCount,
    limit,
    goNext: () => setPage((prev) => prev + 1),
    goPrev: () => setPage((prev) => Math.max(1, prev - 1)),
    setPage,
    setLimit,
    refresh: async () => fetchPosts(page, limit),
  };
}
