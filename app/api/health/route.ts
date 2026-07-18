import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { application: "baselineawebapp", status: "ok" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
