"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Mail, Globe, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { updateMemberAccessLevel } from "@/app/actions/workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Member {
  id: string;
  accessLevel: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    country: string | null;
    createdAt: Date;
  };
  Workspace: {
    name: string;
  };
}

interface MembersListProps {
  members: Member[];
  workspaceId: string;
  currentUserAccessLevel?: string | null;
}

const MembersList = ({ members, workspaceId, currentUserAccessLevel }: MembersListProps) => {
  const router = useRouter();
  const [updatingMembers, setUpdatingMembers] = useState<Set<string>>(new Set());

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'OWNER':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'MEMBER':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'VIEWER':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const handleAccessLevelChange = async (memberId: string, newAccessLevel: string) => {
    if (updatingMembers.has(memberId)) return;

    setUpdatingMembers(prev => new Set(prev).add(memberId));

    try {
      const result = await updateMemberAccessLevel(
        workspaceId,
        memberId,
        newAccessLevel as "OWNER" | "MEMBER" | "VIEWER"
      );

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update member access level");
    } finally {
      setUpdatingMembers(prev => {
        const newSet = new Set(prev);
        newSet.delete(memberId);
        return newSet;
      });
    }
  };

  const isCurrentUserOwner = currentUserAccessLevel === "OWNER";

  if (members.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No members found</h3>
          <p className="text-muted-foreground text-center">
            This workspace doesn't have any members yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Members Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Workspace Members ({members.length})
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const isUpdating = updatingMembers.has(member.id);
          const canChangeRole = isCurrentUserOwner && member.accessLevel !== "OWNER";

          return (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.user.image || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(member.user.name, member.user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {member.user.name || "Unknown User"}
                      </h3>
                      {canChangeRole ? (
                        <Select
                          value={member.accessLevel}
                          onValueChange={(value) => handleAccessLevelChange(member.id, value)}
                          disabled={isUpdating}
                        >
                          <SelectTrigger 
                            className="w-auto h-6 text-xs border-0 p-1 bg-transparent hover:bg-muted"
                            suppressHydrationWarning
                          >
                            <SelectValue>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getAccessLevelColor(member.accessLevel)}`}
                              >
                                {member.accessLevel}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OWNER">
                              <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800 border-purple-200">
                                OWNER
                              </Badge>
                            </SelectItem>
                            <SelectItem value="MEMBER">
                              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                                MEMBER
                              </Badge>
                            </SelectItem>
                            <SelectItem value="VIEWER">
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
                                VIEWER
                              </Badge>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getAccessLevelColor(member.accessLevel)}`}
                        >
                          {member.accessLevel}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Email */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{member.user.email}</span>
                </div>

                {/* Country */}
                {member.user.country && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 flex-shrink-0" />
                    <span>{member.user.country}</span>
                  </div>
                )}

                {/* Join Date */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>
                    Joined {(() => {
                      const date = new Date(member.createdAt);
                      return isNaN(date.getTime()) ? "Unknown" : formatDistanceToNow(date, { addSuffix: true });
                    })()}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MembersList;