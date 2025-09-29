"use client";

import { workspaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Workspace } from "@prisma/client";

import { AccessLevel } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CreateWorkspaceDataType } from "./create-workspace-form";
import { toast } from "sonner";
import { updateWorkspace, inviteUserToWorkspace, regenerateInviteCode, deleteWorkspace } from "@/app/actions/workspace";
import { Link, UserPlus, RotateCcw, Trash2 } from "lucide-react";

interface DataProps extends Workspace {
  members: {
    userId: string;
    accessLevel: $Enums.AccessLevel;
  }[];
}
export const WorkspaceSettingsForm = ({ data }: { data: DataProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [isRegenerating, setIsRegenerating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  //   const [isOpen, confirm, handleConfirm, handleCancel, confirmationOptions] =
  //     useConfirmation();
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [currentInviteCode, setCurrentInviteCode] = React.useState(data.inviteCode);

  const form = useForm<CreateWorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
    },
  });

  const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/workspace-invite/${data.id}/join/${currentInviteCode}`;

const copyInviteLink = ()=>{
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard");
}

const handleRegenerateInviteCode = async () => {
  setIsRegenerating(true);
  try {
    const result = await regenerateInviteCode(data.id);
    if (result.success && result.inviteCode) {
      setCurrentInviteCode(result.inviteCode);
      toast.success(result.message || "Invite code regenerated successfully");
    } else {
      toast.error(result.message || "Failed to regenerate invite code");
    }
  } catch (error) {
    console.log("Regenerate invite code error:", error);
    toast.error("An unexpected error occurred");
  } finally {
    setIsRegenerating(false);
  }
};

const handleDeleteWorkspace = async () => {
  setIsDeleting(true);
  try {
    const result = await deleteWorkspace(data.id);
    if (result.success) {
      toast.success(result.message || "Workspace deleted successfully");
      router.push("/"); // Redirect to home page after deletion
    } else {
      toast.error(result.message || "Failed to delete workspace");
    }
  } catch (error) {
    console.log("Delete workspace error:", error);
    toast.error("An unexpected error occurred");
  } finally {
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  }
};


  const handleOnSubmit = async (values: CreateWorkspaceDataType) => {
    setIsPending(true);
    try {
      const result = await updateWorkspace(data.id, values);
      if (result.success) {
        toast.success(result.message || "Workspace updated successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update workspace");
      }
    } catch (error) {
      console.log("Form submission error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const handleInvitation = async () => {
    setIsLoading(true);
    try {
      const result = await inviteUserToWorkspace(data.id, inviteEmail);
      if (result.success) {
        toast.success(result.message || "User invited successfully");
        setInviteEmail("");
      } else {
        toast.error(result.message || "Failed to invite user");
      }
    } catch (error) {
      console.log("Invitation error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 md:p-6 max-w-4xl w-full mx-auto space-y-6">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
          <CardDescription>
            Manage your workspace settings from here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add a description for your workspace"
                        className="resize-none"
                      ></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-row items-center gap-4 justify-end">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer flex-1"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Invite Members</CardTitle>
          <CardDescription>
            Invite new members to your workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="gap-2 flex ">
            <Input
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => handleInvitation()}
              disabled={isPending}
              className="cursor-pointer flex-1"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>

          <div className="space-y-2 ">
            <Input
              placeholder="Enter email address"
              value={inviteLink}
              readOnly
            />

            <div className="flex items-center justify-end mt-4 gap-2">
            <Button type="button" variant="outline" onClick={() => copyInviteLink()}>
              <Link className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={() => handleRegenerateInviteCode()}
              disabled={isRegenerating}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {isRegenerating ? "Regenerating..." : "Reset"}
            </Button>
          </div>


          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-red-600/80">
            Permanently delete this workspace and all its data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showDeleteConfirm ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Workspace
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-100 border border-red-200 rounded-md">
                <p className="text-sm text-red-800 font-medium mb-2">
                  Are you absolutely sure?
                </p>
                <p className="text-sm text-red-700">
                  This will permanently delete the workspace "{data.name}" and all its projects, tasks, and data. 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteWorkspace}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? "Deleting..." : "Yes, Delete Workspace"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
