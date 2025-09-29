import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const ProfileAvatar = ({
  url,
  name,
  size = "md",
  className,
  numOfChars = 1,
}: {
  name: string;
  url: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  numOfChars?: number;
}) => {
  return (
    <Avatar
      className={cn(
        "h-8 w-8 rounded-md",
        size === "sm" && "h-6 w-6",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-12 w-12",
        className
      )}
    >
      <AvatarImage src={url || undefined} alt={name} />
      <AvatarFallback className="bg-blue-500 text-white rounded-md">
        {name ? name.substring(0, numOfChars).toLocaleUpperCase() : "?"}
      </AvatarFallback>
    </Avatar>
  );
};
