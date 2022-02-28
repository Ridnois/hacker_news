import React, { useState, useEffect, useRef, useCallback, ForwardedRef } from "react";
import { Dropdown, TopicBox } from '../components';
import { usePosts } from "../hooks";
import { PostCard } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
}

export const AllPage = () => {
  const [ query, setQuery ] = useState<string>();
  const { posts, page, pages, loading, error, load, clean } = usePosts(query);
 
  const handleDropdown = (value: string) => {
    clean();
    setQuery(value.toLowerCase());
  }

  return (
    <div className="container">
      <Dropdown label="Select your news" callback={handleDropdown}>
        <TopicBox value="Angular">
          <div className="option-box">
            <img className="option-box__image" src="./image-138.png" />
            <h3 className="dropdown__text">Angular</h3>
          </div>
        </TopicBox>
        <TopicBox value="Reactjs">
          <div className="option-box">
            <img className="option-box__image" src="./image-140.png" />
            <h3 className="dropdown__text">React</h3>
          </div>
        </TopicBox>
        <TopicBox value="Vuejs">
          <div className="option-box">
            <img className="option-box__image" src="./image-141.png" />
            <h3 className="dropdown__text">Vue</h3>
          </div>
        </TopicBox>
      </Dropdown>
      <div className="posts">
        <InfiniteScroll
          dataLength={posts.length}
          next={load}
          hasMore={page < pages}
          loader={<h4>Loading...</h4>}
        >
        {
          posts.map((post, index) => (
            <PostCard {...post} key={index}/> 
          ))
        }
        </InfiniteScroll>
      </div>
    </div>
  )
}
