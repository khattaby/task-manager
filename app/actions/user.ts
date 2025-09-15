"use server";

import { UserDataType } from "@/components/onboarding-form";
import { userRequired } from "../data/user/is-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
  const { user } = await userRequired();

  const validatedData = userSchema.parse(data);

  const userData = await db.user.create({
    data: {
      id: user?.id as string,
      email: validatedData.email as string,
      name: validatedData.name,
      about: validatedData.about,
      country: validatedData.country,
      industryType: validatedData.industryType,
      role: validatedData.role,
      onboardingCompleted: true,
      image: user?.picture || "",
      subscription: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
          currentPeriodEnd: new Date(),
          cancelAtPeriodEnd: false,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      workspaces: true,
    },
  });
  // TODO: send user welcome email

  if (userData.workspaces.length === 0) {
    // create default workspace
    redirect("/create-workspace");
  }
  redirect("/workspace");
};
