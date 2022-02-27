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
  const [ page, setPage ] = useState(0);
  const { posts, loading, error, load } = usePosts(query, 0);
 
  const triggerChange = () => {
    setPage((p) => p +1);
  }
  const handleDropdown = (value: string) => {
    setQuery(value.toLowerCase());
    setPage(0);
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
        <TopicBox value="React">
          <div className="option-box">
            <img className="option-box__image" src="./image-140.png" />
            <h3 className="dropdown__text">React</h3>
          </div>
        </TopicBox>
        <TopicBox value="Vue">
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
          hasMore={true}
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
