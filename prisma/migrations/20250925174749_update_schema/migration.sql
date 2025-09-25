-- DropIndex
DROP INDEX "public"."Project_workspaceId_name_key";

-- CreateIndex
CREATE INDEX "Project_workspaceId_idx" ON "public"."Project"("workspaceId");
