import { formatDistanceToNow } from "date-fns";
import { ProfileAvatar } from "../profile-avatar";

export interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <ProfileAvatar
            url={activity.user.image}
            name={activity.user.name}
            numOfChars={2}
            size="lg"
          />
          <div className="flex flex-col">
            <p className="text-sm">
              <span className="font-medium"> {" "}
                {activity.user.name} {activity.description}
              </span>
            </p>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(activity.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
