import { NextResponse } from "next/server";

// In-memory rate limiter: 3 submissions per IP per 10 minutes
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function strip(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function isValidPhone(phone: string): boolean {
  return /^(\+62|62|0)[0-9]{7,14}$/.test(phone.replace(/[\s\-().]/g, ""));
}

export async function POST(request: Request) {
  // Block oversized payloads (16 KB max)
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 16_000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  // Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, message, website } = body as Record<string, string>;

  // Honeypot — bots fill this, humans leave it empty
  if (website) {
    return NextResponse.json({ status: "ok" });
  }

  // Presence check
  if (!name || !phone || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Sanitize
  const cleanName = strip(String(name));
  const cleanPhone = strip(String(phone));
  const cleanMessage = strip(String(message));

  // Length validation
  if (cleanName.length < 2 || cleanName.length > 100) {
    return NextResponse.json({ error: "Invalid name" }, { status: 422 });
  }
  if (!isValidPhone(cleanPhone)) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 422 });
  }
  if (cleanMessage.length < 5 || cleanMessage.length > 2000) {
    return NextResponse.json({ error: "Invalid message" }, { status: 422 });
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const url = new URL(webhookUrl);
  url.searchParams.set("name", cleanName);
  url.searchParams.set("phone", cleanPhone);
  url.searchParams.set("message", cleanMessage);

  try {
    await fetch(url.toString());
  } catch {
    return NextResponse.json({ error: "Sheet write failed" }, { status: 502 });
  }

  return NextResponse.json({ status: "ok" });
}
