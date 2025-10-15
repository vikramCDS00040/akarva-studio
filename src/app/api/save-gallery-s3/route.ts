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
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, message });
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
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
