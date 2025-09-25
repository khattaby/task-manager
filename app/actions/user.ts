"use server";

import { UserDataType } from "@/components/onboarding-form";
import { userRequired } from "../data/user/is-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { user } = await userRequired();

      const validatedData = userSchema.parse(data);

      // Ensure database connection with retry
      try {
        await db.$connect();
      } catch (connectionError) {
        console.error(`Database connection failed (attempt ${attempt}):`, connectionError);
        if (attempt === maxRetries) {
          return { success: false, error: "Database connection failed after multiple attempts. Please try again." };
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }

      // Check if user already exists with timeout and retry logic
      let existingUser;
      try {
        existingUser = await Promise.race([
          db.user.findUnique({
            where: {
              id: user?.id as string,
            },
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Query timeout')), 8000)
          )
        ]);
      } catch (dbError: any) {
        console.error(`Database query error (attempt ${attempt}):`, dbError);
        if (dbError.code === 'P1001' || dbError.message === 'Query timeout') {
          if (attempt === maxRetries) {
            return { success: false, error: "Database connection timeout. Please check your internet connection and try again." };
          }
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
        throw dbError;
      }

      if (existingUser) {
         // User already exists, just update onboarding status and fetch workspaces in one transaction
         const userWithWorkspaces = await Promise.race([
           db.user.update({
             where: {
               id: user?.id as string,
             },
             data: {
               onboardingCompleted: true,
             },
             include: {
               workspaces: true,
             },
           }),
           new Promise((_, reject) => 
             setTimeout(() => reject(new Error('Update timeout')), 8000)
           )
         ]) as any;

         if (userWithWorkspaces?.workspaces?.length === 0) {
           return { success: true, redirectTo: "/create-workspace" };
         }
         return { success: true, redirectTo: "/workspace" };
       }

      // Create new user with timeout protection
       const userData = await Promise.race([
         db.user.create({
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
                 currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
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
         }),
         new Promise((_, reject) => 
           setTimeout(() => reject(new Error('Create timeout')), 10000)
         )
       ]) as any;

       // TODO: send user welcome email

       if (userData?.workspaces?.length === 0) {
         // create default workspace
         return { success: true, redirectTo: "/create-workspace" };
       }
       return { success: true, redirectTo: "/workspace" };

    } catch (error) {
      console.error(`Error creating user (attempt ${attempt}):`, error);
      
      // Handle specific Prisma errors
      if (error instanceof Error) {
        if (error.message.includes('P1001') || error.message.includes('timeout')) {
          if (attempt === maxRetries) {
            return { success: false, error: "Database connection timeout. Please check your internet connection and try again." };
          }
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
        if (error.message.includes('P2002')) {
          return { success: false, error: "User already exists with this email." };
        }
      }
      
      if (attempt === maxRetries) {
        return { success: false, error: "Failed to create user after multiple attempts. Please try again." };
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  return { success: false, error: "Failed to create user after multiple attempts. Please try again." };
};
