import { userRequired } from "@/app/data/user/is-authenticated";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import OnboardingForm from "@/components/onboarding-form";
import { redirect } from "next/navigation";

interface OnboardingPageProps {
  searchParams: Promise<{
    redirect_to?: string;
  }>;
}

const page = async ({ searchParams }: OnboardingPageProps) => {
  const { data } = await getUserWorkspaces();
  const { user } = await userRequired();
  const params = await searchParams;

  if (data?.onboardingCompleted && data?.workspaces?.length > 0) {
    // If user has completed onboarding and has workspaces, check for redirect
    if (params.redirect_to) {
      redirect(params.redirect_to);
    }
    redirect("/workspace");
  } else if (data?.onboardingCompleted) {
    // If user has completed onboarding but no workspaces, check for redirect
    if (params.redirect_to) {
      redirect(params.redirect_to);
    }
    redirect("/create-workspace");
  }

  const name = `${user?.given_name || ""} ${user?.family_name || ""}`;

  return (
    <div className="">
      <OnboardingForm
        name={name}
        email={user?.email as string}
        image={user?.picture || ""}
        redirectTo={params.redirect_to}
      />
    </div>
  );
};
export default page;
