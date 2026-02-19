
export interface Author {
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: Author;
  text: string;
  createdAt: string;
  likes: number;
}

export interface Step {
  id: number;
  title: string;
  content: string;
  image?: string;
}

export interface Recipe {
  id: string;
  category: string;
  difficulty: '입문' | '중급' | '고급';
  title: string;
  description: string;
  author: Author;
  views: number;
  comments: number;
  likes: number;
  bookmarks?: number;
  gradientClass: string;
  createdAt: string;
  steps?: Step[];
  commentsList?: Comment[];
}

export interface FilterState {
  category: string;
  difficulty: string;
  sort: string;
  search: string;
}
