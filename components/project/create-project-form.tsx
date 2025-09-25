"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { projectSchema } from "@/lib/schema";
import { workspaceMembersProps } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { createNewProject } from "@/app/actions/project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  workspaceMembers: workspaceMembersProps[];
}

export type ProjectDataType = z.infer<typeof projectSchema>;

export const CreateProjectForm = ({ workspaceMembers }: Props) => {
  const workspaceId = useWorkspaceId();
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const form = useForm<ProjectDataType>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      memberAccess: [],
      workspaceId: workspaceId as string,
    },
  });

  const handleSubmit = async (data: ProjectDataType) => {
    try {
      setPending(true);
      const result = await createNewProject(data);
      if (result.success) {
        toast.success("Project created successfully!");
        form.reset();
        // Refresh the page to update the sidebar with the new project
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="size-5">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Card className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit as any)}
                className="space-y-5"
              >
                <FormField
                  control={form.control as any}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter workspace name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as any}
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

                <div>
                  <FormField
                    control={form.control as any}
                    name="memberAccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Access</FormLabel>
                        <FormDescription className="text-xs text-muted-foreground mb-4">
                          Select witch workspace member should have access to
                          this project
                        </FormDescription>
                        <div>
                          {workspaceMembers?.map((member) => (
                            <div
                              key={member.user.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={member.user.id}
                                checked={field.value?.includes(member.user.id)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  if (checked) {
                                    field.onChange([
                                      ...currentValue,
                                      member.user.id,
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValue.filter(
                                        (id: string) => id !== member.user.id
                                      )
                                    );
                                  }
                                }}
                              />

                              <label
                                htmlFor={member.user.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                              >
                                {member.user.name} (
                                {member.accessLevel.toLowerCase()})
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-row items-center gap-4">
                  <Button type="button" variant="outline" disabled={pending}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={pending}
                    className="cursor-pointer flex-1"
                  >
                    Create Project
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};
