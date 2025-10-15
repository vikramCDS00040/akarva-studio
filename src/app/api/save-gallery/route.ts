import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const images = await req.json();
    
    // For S3/CloudFront deployment, you would use AWS SDK here
    // For now, saving to public folder for local development
    const jsonPath = path.join(process.cwd(), "public", "gallery-images.json");
    fs.writeFileSync(jsonPath, JSON.stringify(images, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, message });
  }
}
