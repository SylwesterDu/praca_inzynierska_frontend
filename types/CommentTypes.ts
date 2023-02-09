export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  creatorName: string;
  creatorAvatar: string;
  creatorId: string;
  rating?: number;
};

export type AddComment = {
  content: string;
  rating?: number;
};
