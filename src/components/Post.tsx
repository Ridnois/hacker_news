import React, { useEffect, useState } from "react";
import { timePassed } from '../utils';
import { useLocalStorage } from '../hooks';
export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  story_id: string;
}

export const PostCard: React.FunctionComponent<IPost & {ref?: any}> = (props: IPost) => {
  const [ onFavorites, setOnFavorites ] = useState(false);
  const [ onStorage, setOnStorage ] = useState(false);
  const [ favorites, setFavorites ] = useLocalStorage<IPost[]>("favorites", []);

  const toggleFavorites = () => {
    setOnFavorites((fav: boolean) => !fav);
  }
 
  useEffect(() => {
    if (!onFavorites && onStorage) {
      setFavorites((old) => [...old.filter((post: IPost) => post.story_id !== props.story_id)])
      setOnStorage(false);
      return;
    }
    if (onFavorites && !onStorage) {
      setFavorites((old) => [...old, props])
      setOnStorage(true);
    }
  }, [onFavorites])

  useEffect(()=> {
    if(onStorage) {
      toggleFavorites();
    }
  }, [onStorage])

  useEffect(() => {
    const found = favorites.find((post: IPost) => props.story_id === post.story_id);
    if (found) {
      setOnStorage(true);
    }
  }, []) 

  return (
    <div className="post-card">
      <a className="post-card__content" href={props.story_url} target={"_blank"}>
        <div className="post-card__date date-checker">
          <img src="./iconmonstr-time-2.svg" className="iconmonstr-time-2"/>
          <p className="date-checker__legend">
            { timePassed(props.created_at) } ago by { props.author }
          </p> 
        </div>
        <h3 className="post-card__story-title">
          {props.story_title}
        </h3>
      </a>
      <div className="post-card__favorite" onClick={toggleFavorites}>
        <img src={`./iconmonstr-favorite-${onFavorites ? '3' : '2'}.svg`} className="iconmonstr-favorite-2"/>
      </div>
    </div>
  )
}

export const TopicBox: React.FunctionComponent<{value: string}> = (props) => {
  return (
    <div className="topic-box" {...props}>
      { props.children }
    </div>
  ) 
}

