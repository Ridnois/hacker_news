import { usePosts, useLocalStorage } from "../../hooks";
import { onArr } from "../../utils"; 
import { PostCard } from "../../components";
import { PostRecord } from '../../types';

import InfiniteScroll from "react-infinite-scroll-component";
import TopicDropdown from "./TopicDropdown";

export const AllPage = () => {
  const [ selection, setSelection ] = useLocalStorage<string>("query_selection", "Select your news");
  const { posts, page, pages, load, clear } = usePosts(selection);
  const [ favorites, setFavorites] = useLocalStorage<PostRecord[]>("favorites", []) 

  const handleDropdown = (value: string) => {
    if(selection !== value) {
      clear();
    }
    setSelection(value);
  }
  
  const toggle = (...args: any[]) => {
    const [ onFavorites, props ] = args;
    const onStorage = onArr(props.objectID, favorites); 
    
    if(!onStorage && onFavorites) {
      setFavorites((favs) => [...favs, {[props.objectID]: props}])
    }
    
    if(onStorage && !onFavorites) {
      setFavorites((favs) => favs.filter(fav => !fav[props.objectID]))
    }
  }

  return (
    <div className="container">
      <TopicDropdown label={selection}  callback={handleDropdown}/>
      <div className="posts">
        <InfiniteScroll
          dataLength={posts.length}
          next={load}
          hasMore={page < pages}
          loader={<h4>Loading...</h4>}
        >
        {
          posts.map((post, index) => (
            <PostCard onToggle={toggle} onFavorites={onArr(post.objectID, favorites)} {...post} key={index}/> 
          ))
        }
        </InfiniteScroll>
      </div>
    </div>
  )
}
