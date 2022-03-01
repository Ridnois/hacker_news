import { useLocalStorage } from '../hooks';
import { PostCard } from '../components';
import { removeFromArr } from '../utils';
import { IPost } from '../types';

interface WithID extends IPost {
  objectID: string;
}

type PostRecord = Record<string, WithID>;

export const Favorites = () => {
  const [ favorites, setFavorites ] = useLocalStorage<PostRecord[]>("favorites", []);

  const remove = (value:boolean, item: any) => {
    if(!value) {
      setFavorites((fav: PostRecord[]) => removeFromArr(fav, item.objectID))
    }
  }

  return (
    <div className="container posts">
      {
        favorites.map((post: PostRecord) => {
          const key = Object.keys(post)[0];
          const props = post[key]
          return(
            <PostCard key={key} onToggle={remove} {...props} onFavorites={true}/>
          )
        })
      }     
    </div>
  )
} 
