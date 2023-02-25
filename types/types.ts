export interface UserType {
  displayName: string;
  username: string;
  email: string;
  id: string;
  following: string[];
  followers: string[];
  profileImage: string;
  createdAt: string;
}
export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  username: string;
  password: string;
  email: string;
  profileImage: string;
}

export interface PostType {
  content: string;
  authorId: string;
  author: {
    username: string;
    displayName: string;
    profileImage: string;
  };
  id: string;
  favourites: string[];
  createdAt: string;
  updatedAt: string;
  comments: string[];
}

export default interface CommentType {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: {
    displayName: string;
    username: string;
    profileImage: string;
  };
  createdAt: string;
}

// =====
