import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  return (
    <div className="w-full h-screen flex flex-col item-center justify-center">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl">
            <p>Your personal workspace</p>
            <p className="text-5xl md:text-6xl">
              for <span className="text-blue-600">better productivity</span>
            </p>
          </h1>
          <p className="mt-6 text-base- lg:text-lg text-muted-foreground max-w-2xl ma-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vel
            aliquid labore, assumenda optio quos autem accusantium tenetur saepe
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            {isLoggedIn ? (
              <>
                <Button asChild>
                  <Link href="/workspace">Go to Workspace</Link>
                </Button>
              </>
            ) : (
              <>
                <Button>
                  <RegisterLink>Get Started</RegisterLink>
                </Button>

                <Button asChild variant="outline">
                  <LoginLink>Sign in</LoginLink>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
