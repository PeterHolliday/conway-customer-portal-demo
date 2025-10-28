// app/api/configs/[configId]/publish/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { configId: string } }) {
  const body = await request.json().catch(() => ({}));
  const effectiveFrom: string | undefined = body.effectiveFrom;

  const cfg = await prisma.depotConfig.findUnique({ where: { id: params.configId } });
  if (!cfg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (cfg.status === "PUBLISHED") {
    return NextResponse.json({ error: "Already published" }, { status: 400 });
  }

  const updated = await prisma.depotConfig.update({
    where: { id: params.configId },
    data: {
      status: "PUBLISHED",
      effectiveFrom: effectiveFrom ? new Date(effectiveFrom) : cfg.effectiveFrom,
    },
  });
  return NextResponse.json(updated);
}
