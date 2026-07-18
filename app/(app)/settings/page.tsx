import type { Metadata } from "next";

import { Settings } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { PageHeader } from "@/app/components/page-header";

export const metadata = {
  title: "Settings",
} satisfies Metadata;

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <PageHeader
        title="Settings"
        description="Manage application preferences."
      />

      <Card>
        <CardContent className="flex min-h-56 flex-col items-center justify-center gap-4 text-center">
          <div className="bg-muted text-muted-foreground ring-border flex size-12 items-center justify-center rounded-lg ring-1 ring-inset">
            <Settings className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">No settings available</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Application preferences will appear here when they are supported.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
