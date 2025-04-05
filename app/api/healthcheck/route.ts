import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "Comprehend Web Service is running",
    },
    { status: 200 }
  );
}
