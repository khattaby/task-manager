import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

export const ProjectAvatar = ({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) => {
  // Safety check to handle undefined or empty name
  const displayName = name || "Project";
  
  return (
    <Avatar
      className={cn("size-6 2xl:size-8 rounded-md items-center", className)}
    >
      <AvatarFallback className="w-6 2xl:w-8 h-6 2xl:h-8 bg-blue-600 text-base text-white rounded-md ">
        {displayName.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
