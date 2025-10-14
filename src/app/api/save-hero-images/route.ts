// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const config = { api: { bodyParser: false } };

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const files = formData.getAll("images") as Blob[];
//     const ids = formData.getAll("ids") as string[];
//     const metadataStr = formData.get("metadata") as string;

//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const id = ids[i];
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const ext = (file as any).name.split(".").pop() || "jpg";
//       const filename = `hero-${id}.${ext}`;
//       fs.writeFileSync(path.join(uploadsDir, filename), buffer);
//     }

//     // Save metadata JSON
//     const jsonPath = path.join(process.cwd(), "public", "hero-images.json");
//     fs.writeFileSync(jsonPath, metadataStr);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: "Save failed" });
//   }
// }
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("images") as Blob[];
    const ids = formData.getAll("ids") as string[];
    const metadataStr = formData.get("metadata") as string;

    const uploadsDir = path.join(process.cwd(), "public", "prod");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = ids[i];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const ext = (file as any).name.split(".").pop() || "jpg";
      const filename = `hero-${id}.${ext}`;
      fs.writeFileSync(path.join(uploadsDir, filename), buffer);
    }

    // Save JSON with public paths
    const jsonPath = path.join(process.cwd(), "public", "hero-images.json");
    fs.writeFileSync(jsonPath, metadataStr);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Save failed" });
  }
}
