export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  creatorName: string;
  creatorId: string;
};

export type AddComment = {
  content: string;
};
