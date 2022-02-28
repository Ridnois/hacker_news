import React, { useEffect } from 'react';
import { useLocalStorage } from '../hooks';
import { PostCard } from '../components';

export interface IPost {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  story_id: string;
}

