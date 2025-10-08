import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Eye, Crown, Settings, Trash2, UserPlus, FolderPlus, FileText } from "lucide-react";

export default function RolePermissionsCard() {
  const roles = [
    {
      name: "OWNER",
      icon: Crown,
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      description: "Full control over the workspace",
      permissions: [
        "Manage all workspace settings",
        "Add and remove members",
        "Change member access levels",
        "Create and delete projects",
        "Delete the entire workspace",
        "View all projects and tasks",
        "Create and edit tasks",
        "Access danger zone"
      ]
    },
    {
      name: "MEMBER",
      icon: Users,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      description: "Can participate in projects and tasks",
      permissions: [
        "View all projects and tasks",
        "Create and edit tasks",
        "Create new projects",
        "Comment on tasks",
        "Upload files and attachments",
        "View workspace members",
        "Update own profile"
      ]
    },
    {
      name: "VIEWER",
      icon: Eye,
      color: "bg-gray-100 text-gray-800 border-gray-200",
      description: "Read-only access to workspace content",
      permissions: [
        "View all projects and tasks",
        "View task details and comments",
        "View workspace members",
        "Download attachments",
        "Update own profile"
      ]
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Role Permissions
        </CardTitle>
        <CardDescription>
          Understanding what each role can do in this workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div key={role.name} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={role.color}>
                    <IconComponent className="h-3 w-3 mr-1" />
                    {role.name}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Permissions:</h4>
                  <ul className="space-y-1">
                    {role.permissions.map((permission, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}