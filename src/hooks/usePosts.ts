import { useState, useEffect } from "react";

export interface Post {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
}

export const usePosts = (query: string = '', page: number) => {
  const [ posts, setPosts ] = useState<Post[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string>();

  const suitablePost = (post: Partial<Post>) => {
    const {
      author,
      story_title,
      story_url,
      created_at
    } = post;

    if (author && story_title && story_url && created_at) {
      return true;
    }
    return false;
  }
  
  useEffect(() => setPosts([]), [query]);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`)
    .then(response => response.json())
    .then((posts) => {
      setPosts((current) => [
        ...current,
        ...posts.hits.filter((post: Partial<Post>) => suitablePost(post))
      ]);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      setError(error.message);
    })
  }, [query, page]);
  
  return {
    posts,
    loading,
    error,
  }
}
