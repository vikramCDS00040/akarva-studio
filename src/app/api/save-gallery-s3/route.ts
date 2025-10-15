import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const images = await req.json();
    
    // For AWS S3/CloudFront deployment
    const response = await fetch(`${process.env.CLOUDFRONT_URL || process.env.S3_URL}/gallery-images.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AWS_ACCESS_TOKEN}` // or use AWS SDK
      },
      body: JSON.stringify(images, null, 2)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save to S3');
    }
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

export async function GET() {
  try {
    // Fetch from S3/CloudFront
    const response = await fetch(`${process.env.CLOUDFRONT_URL || process.env.S3_URL}/gallery-images.json`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch from S3');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
