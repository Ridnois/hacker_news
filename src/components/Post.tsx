import React, { useEffect, useRef, useState } from "react";
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
  const prevProps = useRef(props);

  const toggleFavorites = () => {
    setOnFavorites((fav: any) => !fav);
  }
  
  useEffect(() => {
    props.onToggle(onFavorites, {...props});
    prevProps.current = props;
    // eslint-disable-next-line
    },[onFavorites])
 
  return (
    <div className="post-card">
      <a className="post-card__content" rel="noreferrer" href={props.story_url} target={"_blank"}>
        <div className="post-card__date date-checker">
          <img alt="" src="./iconmonstr-time-2.svg" className="iconmonstr-time-2"/>
          <p className="date-checker__legend">
            { timePassed(props.created_at) } ago by { props.author }
          </p> 
        </div>
        <h3 className="post-card__story-title">
          {props.story_title}
        </h3>
      </a>
      <div className="post-card__favorite" onClick={toggleFavorites}>
        <img alt={ onFavorites ? `remove from favorites` : `add to favorites`} src={`./iconmonstr-favorite-${onFavorites ? '3' : '2'}.svg`} className="iconmonstr-favorite-2"/>
      </div>
    </div>
  )
}


