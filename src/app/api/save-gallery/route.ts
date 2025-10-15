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
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

// For AWS S3 deployment, replace the above with:
/*
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function POST(req: NextRequest) {
  try {
    const images = await req.json();
    
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: "gallery-images.json",
      Body: JSON.stringify(images, null, 2),
      ContentType: "application/json"
    });
    
    await s3Client.send(command);
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
*/
