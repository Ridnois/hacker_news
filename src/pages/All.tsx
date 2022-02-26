import React, { useState, useEffect, useRef, useCallback, ForwardedRef } from "react";
import { Dropdown, TopicBox } from '../components';
import { usePosts } from "../hooks";
import { PostCard } from "../components";

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
}

export const AllPage = () => {
  const [ query, setQuery ] = useState<string>();
  const [ page, setPage ] = useState(0);
  const { posts, loading, error } = usePosts(query, 0);
 
  const observer = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(node => {
    if (loading) return;
    if (observer) {
      (observer as any).current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        console.log('visible')
        setPage(p => p+1)
      }
    })

    if (node) {
      observer.current.observe(node);
    }
    console.log(node); 
  }, [loading]); 
  
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
        {
          posts.map((post: IPost, index: number) => {
            if (posts.length === index+1) {
              const Forwarded = React.forwardRef((ref: any, props: any) => {
                return (<PostCard ref={ref} {...props}/>)
              })
              
              return (<Forwarded key={index} ref={lastPostRef} {...post} />)
            }
            return (
              <PostCard key={index} {...post} />
            )
          })
        }
        {( loading && <p>Loading...</p>)}
      </div>
    </div>
  )
}
