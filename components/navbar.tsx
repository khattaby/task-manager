import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ProfileAvatar } from "./profile-avatar";
import { Separator } from "./ui/separator";

interface Props {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const Navbar = ({ id, name, email, image }: Props) => {
  return (
    <nav className="w-full flex items-center justify-between p-4">
      <div>
        <h1 className="text-2xl  font-bold">Home</h1>
        <span className="text-sm text-muted-foreground">
          Manage your tasks efficiently in one place.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost">
          <Bell />
        </Button>

        <ModeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <ProfileAvatar url={image} name={name} />
          </PopoverTrigger>

          <PopoverContent className="flex flex-col items-center gap-3">
            <div className="mb-4 w-full flex flex-col items-center justify-center gap-2">
              <ProfileAvatar url={image} name={name} />
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <Separator />
            {/* <Button variant="ghost" className="w-full"> */}
              <LogoutLink>Sign Out</LogoutLink>
            {/* </Button> */}
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};
