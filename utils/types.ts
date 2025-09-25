import { AccessLevel, Workspace } from "@prisma/client";

export interface workspaceMembersProps extends Workspace {
  accessLevel: AccessLevel;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  projectAccess: {
    id: string;
    hasAccess: boolean;
    projectId: string;
  };
}

export interface ProjectProps {
  id: string;
  name: string;
  description?: string | null;
  workspaceId: string;
  members: {
    id: string;
    userId: string;
    workspaceId: string;
    accessLevel: AccessLevel;
    createdAt: Date;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }[];
}

export interface WorkspaceProps {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  workspaceId: string;
  accessLevel: string;
  Workspace: {
    name: string;
  };
}
