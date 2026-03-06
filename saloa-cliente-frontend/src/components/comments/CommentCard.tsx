import { Comment } from "@/types/comments";
import { formatRelativeTime } from "@/utils/format-ralative";
import { Avatar } from "./avatar";

interface CommentCardProps {
  comment: Comment;
  index: number;
}

export function CommentCard({ comment, index }: CommentCardProps) {
  return (
    <div
      className="group relative vbg border border-white/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-4">
        <Avatar src={comment.user.image} size={3} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5 overflow-hidden">
            <span className="font-bold text-sm truncate">
              {comment.user.nome}
            </span>
            <span className="text-xs  flex-shrink-0">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-wrap text-sm leading-relaxed w-full">
            {comment.commentText}
          </p>
        </div>
      </div>
    </div>
  );
}
