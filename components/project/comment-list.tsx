import { formatDistanceToNow } from "date-fns";
import { ProfileAvatar } from "../profile-avatar";
import { Comment } from "@prisma/client";

export interface CommentProps extends Comment {
  user: {
    id: string;
    name: string;
    image: string;
  };
}

export const CommentList = ({ comments }: { comments: CommentProps[] }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment: CommentProps) => (
        <div key={comment.id} className="flex items-start gap-4">
          <ProfileAvatar
            url={comment.user.image}
            name={comment.user.name}
            numOfChars={2}
            size="lg"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{comment.user.name}</p>
            </div>

            <p className="text-sm">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
