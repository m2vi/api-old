export interface PostProps {
  id: string;
  shortCode: string;
  url: string;
  dimensions: never;
  imageUrl: string;
  isVideo: boolean;
  caption: string;
  commentsCount: number;
  commentsDisabled: boolean;
  timestamp: never;
  likeCount: never;
  location: never;
  children: {
    id: string;
    shortCode: string;
    dimensions: never;
    imageUrl: string;
    isVideo: boolean;
  }[];
}

export interface InstagramProps {
  link?: string;
  id?: string;
  biography?: string;
  subscribersCount?: number;
  subscribtions?: number;
  fullName?: string;
  highlightCount?: number;
  isBusinessAccount?: boolean;
  isRecentUser?: boolean;
  accountCategory?: string;
  linkedFacebookPage?: string;
  isPrivate?: boolean;
  isVerified?: boolean;
  profilePic?: string;
  profilePicHD?: string;
  username?: string;
  postsCount?: boolean;
  posts?: PostProps[];
}
