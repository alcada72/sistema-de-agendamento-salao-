import api from "@/api/api";
import { Comment } from "@/types/comments";

export const GetAllServices = async (): Promise<Comment[]> => {
  const response = await api.get("/services", {});
  return response.data.services;
};

export const postComment = async (id: string, commentText: string): Promise<Comment> => {

  try {
    const response = await api.post(`/services/${id}/comment`, {
      
      commentText: commentText,
    });
    return response.data.comment;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to post comment");
  }
};

export const GetCommentsByServiceId = async (id: string): Promise<Comment[]> => {
  try {
    const response = await api.get(`/services/${id}/comments`, {});
    return response.data.comments;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch comments");
  }
};