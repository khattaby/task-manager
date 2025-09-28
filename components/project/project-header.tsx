import { ProjectProps } from "@/utils/types";
import { ProjectAvatar } from "./project-avatar";
import { CreateTaskDialog } from "../task/create-task-dialog";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const ProjectHeader = ({ project }: { project: ProjectProps }) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex gap-2">
            <ProjectAvatar name={project.name} />
            <div>
              <h1 className="text-xl 2xl:text-2xl font-bold">{project.name}</h1>
              {project.description && (
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-3 md:mt-0 gap-3">
            <CreateTaskDialog project={project} />
          </div>
        </div>
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h3 className="text-sm font-medium">Team Members</h3>

            <div className="flex flex-wrap space-x-2">
              {project.members.map((member) => (
                <Avatar
                  className="size-9 2xl-size-10 border-2 border-background shadow"
                  key={member.id}
                >
                  <AvatarImage src={member?.user?.image || ""} />
                  <AvatarFallback className="text-sm 2xl:text-base">
                    {member?.user?.name?.substring(0, 2).toLocaleUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
