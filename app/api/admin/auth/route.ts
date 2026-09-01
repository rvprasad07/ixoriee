import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const serverPin = process.env.ADMIN_SECRET_PIN || "ixoriee2026";

    if (!pin || pin.trim() !== serverPin.trim()) {
      return NextResponse.json(
        { error: "Invalid Admin Security Passkey" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        sessionToken: "admin_authenticated_" + Date.now(),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal authentication error" },
      { status: 500 }
    );
  }
}
