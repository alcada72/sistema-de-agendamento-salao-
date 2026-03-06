import { User } from "./user";

export interface Comment {
  id: string;
  serviceId: string;
  commentText: string;
  createdAt: string;
  user: User
}

export interface AvatarProps {
  src: string;
  size: 1 | 2 | 3
}

