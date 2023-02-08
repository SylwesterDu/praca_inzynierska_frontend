import { UserData } from "./UserTypes";

export type Artwork = {
  id: string;
  title: string;
  upvotes: number;
  downvotes: number;
  views: number;
  artType: number;
  genres: string[];
  tags: string[];
  thumbnailUrl: string;
};

export type UploadArtwork = {
  title: string;
  description: string;
  artType: number;
  genres: string[];
  tags: string[];
  adultContent: boolean;
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
  owner: UserData;
  upvotes: number;
  downvotes: number;
  views: number;
  artType: number;
  genres: string[];
  tags: string[];
};
