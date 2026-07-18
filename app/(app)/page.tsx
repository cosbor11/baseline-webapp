import { Suspense } from "react";

import { ControlsSection } from "./_components/controls-section";
import { FoundationsSection } from "./_components/foundations-section";
import { PatternsSection } from "./_components/patterns-section";

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      <FoundationsSection />
      <ControlsSection />

      {/* useQueryState reads search params, which requires Suspense during static prerender. */}
      <Suspense>
        <PatternsSection />
      </Suspense>
    </div>
  );
}
