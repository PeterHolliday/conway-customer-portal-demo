// app/api/depots/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const depots = await prisma.depot.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(depots);
}
