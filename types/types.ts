export interface UserType {
  displayName: string;
  username: string;
  email: string;
  _id: string;
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
  _id: string;
  favourites: userRef[];
  createdAt: string;
  updatedAt: string;
}

// =====

interface userRef {
  userId: string;
}
