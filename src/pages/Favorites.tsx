import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks';
import { PostCard } from '../components';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  objectID: string;
  onToggle: (...args: any[]) => any;
}

export const Favorites = () => {
  const [ favorites, setFavorites ] = useLocalStorage<IPost[]>("favorites", []);
  const [ pages, setPages ] = useState(favorites.length / 20);
  const [ page, setPage ] = useState(0);
  const [ chunks, setChunks ] = useState<IPost[]>([]);
  
  const next = () => {
    const chunk = favorites.slice()
  }

  const remove = (value:boolean, g: any) => {
    if(!value) {
      setFavorites((fav: any) => fav.filter((f: any) => !f[g.objectID]))
    }
  }
  return (
    <div className="container">
      {
        favorites.map((f: any) => {
          const key = Object.keys(f)[0];
          const fProps: any = f[key]
          return(
            <PostCard key={key} onToggle={remove} {...fProps} onFavorites/>
          )
        })
      }     
    </div>
  )
} 
