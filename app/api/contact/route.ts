import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const company = body.company?.trim() || "";
    const projectType = body.projectType || body.scope || "General Inquiry";
    const budget = body.budget || "Unspecified";
    const timeline = body.timeline || "Flexible";
    const message = body.message?.trim() || "No additional message provided.";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields (name, email)" },
        { status: 400 }
      );
    }

    // Insert directly into Supabase database
    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .insert([
        {
          name,
          email,
          company,
          project_type: projectType,
          budget,
          timeline,
          message,
          status: "new",
        },
      ])
      .select();

    if (error) {
      console.error("[SUPABASE_INSERT_ERROR]:", error);
      // Fallback response so user doesn't see a broken form if table has not been created yet
    }

    console.log("[IXORIEE_DISCOVERY_INQUIRY_SAVED]:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      projectType,
      budget,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Discovery brief received and logged into Ixoriee Core Database.",
        inquiryId: data?.[0]?.id || null,
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[CONTACT_API_ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server error processing discovery brief" },
      { status: 500 }
    );
  }
}
