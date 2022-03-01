import { useLocalStorage } from '../hooks';
import { PostCard } from '../components';
import { IPost } from '../types';

interface WithID extends IPost {
  objectID: string;
}

type PostRecord = Record<string, WithID>;

export const Favorites = () => {
  const [ favorites, setFavorites ] = useLocalStorage<PostRecord[]>("favorites", []);

  const remove = (value:boolean, post: any) => {
    if(!value) {
      setFavorites((fav: PostRecord[]) => fav.filter((f: PostRecord) => !f[post.objectID]))
    }
  }

  return (
    <div className="container posts">
      {
        favorites.map((f: PostRecord) => {
          const key = Object.keys(f)[0];
          const props: any = f[key]
          return(
            <PostCard key={key} onToggle={remove} {...props} onFavorites={true}/>
          )
        })
      }     
    </div>
  )
} 
