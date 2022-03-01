import { useState, useEffect } from "react";
import { Dropdown, TopicBox } from '../components';
import { usePosts, useLocalStorage } from "../hooks";
import { PostCard } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  objectID: string;
  onToggle: (...args: any[]) => any;
}

export const AllPage = () => {
  const [ selection, setSelection ] = useLocalStorage<string>("query_selection", "Select your news");
  const { posts, page, pages, load, clear } = usePosts(selection);
  const [ favorites, setFavorites] = useLocalStorage<{[key: string]: Partial<IPost>}[]>("favorites", []) 
  
  const handleDropdown = (value: string) => {
    if(selection != value) {
      clear();
    }
    setSelection(value);
  }
  
  const elementOnStorage = (props: any) => {
    const item = favorites.find((element) => element[props.objectID])
    if(item) {
      return true;
    }
    return false;
  }

  const logToggle = (...args: any[]) => {
    const [ onFavorites, props ] = args;
    const item = elementOnStorage(props) 
    if(!item && onFavorites) {
      setFavorites((favs) => [...favs, {[props.objectID]: props}])
    } if(item && !onFavorites) {
      setFavorites((favs) => favs.filter(fav => !fav[props.objectID]))
    }
  }
  
  useEffect(() => {
    if(selection !== "Select your news") {
      setSelection(selection)
    }
  }, [selection])

  return (
    <div className="container">
      <Dropdown label={selection} callback={handleDropdown}>
        <TopicBox label="Angular" value="angular">
          <div className="option-box">
            <img alt="Angular" className="option-box__image" src="./image-138.png" />
            <h3 className="dropdown__text">Angular</h3>
          </div>
        </TopicBox>
        <TopicBox label="Reactjs" value="reactjs">
          <div className="option-box">
            <img alt="ReactJS" className="option-box__image" src="./image-140.png" />
            <h3 className="dropdown__text">React</h3>
          </div>
        </TopicBox>
        <TopicBox label="Vuejs" value="vuejs">
          <div className="option-box">
            <img alt="Vuejs" className="option-box__image" src="./image-141.png" />
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
            <PostCard onToggle={logToggle} onFavorites={elementOnStorage(post)} {...post} key={index}/> 
          ))
        }
        </InfiniteScroll>
      </div>
    </div>
  )
}
