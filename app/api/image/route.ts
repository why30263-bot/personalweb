import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");
  if (!src) return NextResponse.json({ message: "missing src" }, { status: 400 });

  try {
    const url = decodeURIComponent(src);
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0",
        referer: "https://blog.csdn.net/"
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return NextResponse.json({ message: "upstream failed" }, { status: 502 });
    }

    const ct = res.headers.get("content-type") || "image/jpeg";
    const ab = await res.arrayBuffer();
    return new NextResponse(ab, {
      headers: {
        "content-type": ct,
        "cache-control": "public, max-age=3600, s-maxage=3600"
      }
    });
  } catch {
    return NextResponse.json({ message: "proxy error" }, { status: 500 });
  }
}
