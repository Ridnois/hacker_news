import { useLocalStorage } from '../hooks';
import { PostCard } from '../components';

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  objectID: string;
  onToggle: (...args: any[]) => any;
}

export const Favorites = () => {
  const [ favorites, setFavorites ] = useLocalStorage<IPost[]>("favorites", []);

  const remove = (value:boolean, g: any) => {
    if(!value) {
      setFavorites((fav: any) => fav.filter((f: any) => !f[g.objectID]))
    }
  }

  return (
    <div className="container posts">
      {
        favorites.map((f: any) => {
          const key = Object.keys(f)[0];
          const fProps: any = f[key]
          return(
            <PostCard key={key} onToggle={remove} {...fProps} onFavorites={true}/>
          )
        })
      }     
    </div>
  )
} 
