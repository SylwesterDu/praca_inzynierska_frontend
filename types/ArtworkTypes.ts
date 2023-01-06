import { User } from "./UserTypes";

export type Artwork = {
  id: string;
  title: string;
  upvotes: number;
  downvotes: number;
  views: number;
  artType: number;
  genres: string[];
  tags: string[];
};

export type UploadArtwork = {
  title: string;
  description: string;
  artType: number;
  genres: string[];
  tags: string[];
};

export type UpdateArtwork = {
  title: string;
  description: string;
  artType: number;
  genres: string[];
  tags: string[];
};

export type ArtworkDetails = {
  id: string;
  title: string;
  description: string;
  resourceUrls: string[];
  owner: User;
  upvotes: number;
  downvotes: number;
  views: number;
  artType: number;
  genres: string[];
  tags: string[];
};
