import { useState, useEffect } from "react";

export interface Post {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  objectID: string;
}

export const usePosts = (query: string = '') => {
  const [ posts, setPosts ] = useState<Post[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string>();
  const [ pages, setPages ] = useState(0);
  const [ page, setPage ] = useState(0);

  const suitablePost = (post: Partial<Post>) => {
    const {
      author,
      story_title,
      story_url,
      created_at,
    } = post;

    if (author && story_title && story_url && created_at) {
      return true;
    }
    return false;
  }

  const clean = () => {
    setPosts([]);
    setPages(0);
    setPage(0);
  }

  const load = () => {
    if (!query) return;
    setLoading(true);
    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`)
    .then(response => response.json())
    .then((posts) => {
      setPages(posts.nbPages)
      setPosts((current) => [
        ...current,
        ...posts.hits.filter((post: Partial<Post>) => suitablePost(post))
      ]);
      setPage(page => page + 1)
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      setError(error.message);
    })
  }

  useEffect(() => { 
    load();
  },[query]);
  
  return {
    posts,
    pages,
    loading,
    error,
    load,
    clean,
    page,
    setPage,
  }
}
