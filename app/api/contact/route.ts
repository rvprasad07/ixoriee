import { NextRequest, NextResponse } from "next/server";
import { ContactSubmission } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: ContactSubmission = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    // Server-side audit logging of discovery inquiry
    console.log("[IXORIEE_INQUIRY_RECEIVED]:", {
      timestamp: new Date().toISOString(),
      timezone: "Asia/Kolkata",
      ...body,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Discovery brief received. Our architecture team will respond within 12 hours.",
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error processing discovery brief" },
      { status: 500 }
    );
  }
}
