export type LoggedUser = {
  id: string;
  username: string;
  roles: string[];
  avatar?: string;
};

export type UserStats = {
  artworksCount: { artType: number; count: number }[];
  artworksCommentsCount: { artType: number; count: number }[];
  artworksViewsCount: { artType: number; count: number }[];
  votes: { upvotes: number; downvotes: number };
};

export type UserData = {
  id: string;
  username: string;
  stats: { artType: number; count: number }[];
  avatar?: string;
};
