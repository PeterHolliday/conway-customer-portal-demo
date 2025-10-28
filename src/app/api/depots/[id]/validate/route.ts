// app/api/configs/[configId]/validate/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { configZ, validateUniqueKeys } from "@/schemas/depot-config";

const prisma = new PrismaClient();

export async function POST(_: Request, { params }: { params: { configId: string } }) {
  const cfg = await prisma.depotConfig.findUnique({ where: { id: params.configId } });
  if (!cfg) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const parsed = configZ.safeParse(cfg.json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten() }, { status: 200 });
  }
  const extra = validateUniqueKeys(parsed.data);
  return NextResponse.json({ ok: extra.length === 0, issues: extra });
}
