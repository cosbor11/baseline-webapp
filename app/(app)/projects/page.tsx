import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { PageHeader } from "@/app/components/page-header";

export const metadata = {
  title: "Projects",
} satisfies Metadata;

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <PageHeader title="Projects" description="Organize your work." />

      <Card>
        <CardContent className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
          <div className="bg-muted text-muted-foreground ring-border flex size-12 items-center justify-center rounded-lg ring-1 ring-inset">
            <FolderKanban className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">No projects yet</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Create a project to start organizing your work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
