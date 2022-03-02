export interface IPost {
  author: string;
  story_url: string;
  story_title: string;
  created_at: string;
}

export interface WithID extends IPost {
  objectID: string;
}

export type PostRecord = Record<string, WithID>;

