import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug } from "@/services/serviceService";

export async function GET(
  req: NextRequest,
  context: { params: { slug?: string } }
) {
  const slug = context.params?.slug;

  if (!slug || slug === "undefined") {
    return NextResponse.json(
      { success: false, error: "Missing or invalid slug" },
      { status: 400 }
    );
  }

  const { service, error } = await getServiceBySlug(slug);

  if (!service) {
    return NextResponse.json(
      { success: false, error: error || "Service not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, data: service },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    }
  );
}