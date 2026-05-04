import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, phone, message } = await request.json();

  if (!name || !phone || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const url = new URL(webhookUrl);
  url.searchParams.set("name", name);
  url.searchParams.set("phone", phone);
  url.searchParams.set("message", message);

  try {
    await fetch(url.toString());
  } catch {
    return NextResponse.json({ error: "Sheet write failed" }, { status: 502 });
  }

  return NextResponse.json({ status: "ok" });
}
