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
