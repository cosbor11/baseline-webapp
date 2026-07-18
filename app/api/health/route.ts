import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { application: "app-skeleton", status: "ok" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
