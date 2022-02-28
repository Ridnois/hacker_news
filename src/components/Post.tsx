import React, { useEffect, useState } from "react";
import { timePassed } from '../utils';

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  objectID: string;
  onToggle: (...args: any[]) => any;
  onFavorites?: boolean;
}

export const PostCard: React.FunctionComponent<IPost> = (props: IPost) => {
  const [ onFavorites, setOnFavorites ] = useState(props.onFavorites);
  const { onToggle } = props; 
  
  const toggleFavorites = () => {
    setOnFavorites((fav: any) => !fav);
  }
  
  useEffect(() => {
    //console.log("Toggled ->", onFavorites)
    onToggle(onFavorites, {...props})

  }, [onFavorites, setOnFavorites])
 
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

export const TopicBox: React.FunctionComponent<{value: string, label:string}> = (props) => {
  return (
    <div className="topic-box" {...props}>
      { props.children }
    </div>
  ) 
}

