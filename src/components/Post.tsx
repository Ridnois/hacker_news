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

interface IFavoriteToggle extends IPostCard {
  onClick: (...args: any[]) => any;
}

const DateChecker: React.FC<Pick<IPostCard, "created_at" | "author">> = (props) => {
  return(
    <div className="post-card__date date-checker">
      <img alt="" src="./iconmonstr-time-2.svg" className="iconmonstr-time-2"/>
      <p className="date-checker__legend">
        { timePassed(props.created_at) } ago by { props.author }
      </p> 
    </div>
  )
}

const PostCardContent: React.FC<IPostCard> = (props) => {
  return( 
    <a className="post-card__content" rel="noreferrer" href={props.story_url} target={"_blank"}>
      {props.children}
      <h3 className="post-card__story-title">
        {props.story_title}
      </h3>
    </a>
  )
} 


const FavoriteToggle: React.FC<IFavoriteToggle> = (props) => {
  return (
    <div className="post-card__favorite" onClick={props.onClick}>
      <img 
        alt={ props.onFavorites ? 
          `remove from favorites` : 
          `add to favorites`
          }
        src={
          `./iconmonstr-favorite-${props.onFavorites ? '3' : '2'}.svg`}
        className="iconmonstr-favorite-2" />
    </div>
  )
}

export const PostCard: React.FC<IPostCard> = (props) => {
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


