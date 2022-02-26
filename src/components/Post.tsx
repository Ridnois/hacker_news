import React from "react";
import { timePassed } from '../utils';

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
}

export const PostCard: React.FunctionComponent<IPost & {ref?: any}> = (props: IPost) => {
  return (
    <div className="post-card">
      <div className="post-card__content">
        <div className="post-card__date date-checker">
          <img src="./iconmonstr-time-2.svg" className="iconmonstr-time-2"/>
          <p className="date-checker__legend">
            { timePassed(props.created_at) } ago by { props.author }
          </p> 
        </div>
        <h3 className="post-card__story-title">
          {props.story_title}
        </h3>
      </div>
      <div className="post-card__favorite">
        <img src="./iconmonstr-favorite-3.svg" className="iconmonstr-favorite-3"/>
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

