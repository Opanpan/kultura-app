import { NextResponse } from "next/server";

const content = `# Kultura Properties

> Pengembang perumahan terpercaya di Cisauk, Tangerang, Banten, Indonesia. Lebih dari 20 tahun pengalaman membangun hunian yang relevan, nyaman, dan menciptakan kebahagiaan.

## About

Kultura Properties is a trusted residential property developer based in Cisauk, Tangerang, Banten, Indonesia. With over 20 years of experience, we have developed 100+ hectares of land and delivered 7000+ residential units. We build homes that are relevant, comfortable, and create lasting happiness.

## Projects

- **Cluster Fontana**: Modern cluster housing in Cisauk, starting from Rp 600jt-an
- **Cluster Innari**: Contemporary residential cluster near Cisauk Station, starting from Rp 800jt-an
- **Matano Boulevard**: Boulevard-style residential with lake view, starting from Rp 900jt-an
- **New Abaya Village**: Village-style residential community, starting from Rp 900jt-an
- **New Maninjau**: Lakeside residential with green environment, starting from Rp 1.6M-an

## Location

Cisauk, Tangerang, Banten, Indonesia
- 1.2 km from Cisauk Station (3 min)
- 2.5 km from Serbaraja Toll Gate (5 min)
- 4.2 km from AEON Mall BSD (10 min)
- 3.8 km from Multimedia Nusantara University (8 min)

## Contact

- WhatsApp: +62-811-1200-4007
- Email: kulturaproperties.info@gmail.com
- Instagram: @kulturaproperties
- TikTok: @kulturaproperties
- YouTube: @kulturaproperties
- Website: https://kultura.id

## Key Facts

- Founded: 2004
- Area Developed: 100+ hectares
- Units Built: 7000+
- Experience: 20+ years
- Location: Cisauk, Tangerang, Banten
- Price Range: Rp 600.000.000 - Rp 2.000.000.000
`;

export function GET() {
  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
