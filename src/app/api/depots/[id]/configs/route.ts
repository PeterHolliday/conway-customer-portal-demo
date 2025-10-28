// app/api/depots/[id]/configs/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { configZ, validateUniqueKeys } from "@/schemas/depot-config";


const prisma = new PrismaClient();

// GET: list versions for a depot (latest first)
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const depotId = params.id;
  const configs = await prisma.depotConfig.findMany({
    where: { depotId },
    orderBy: [{ version: "desc" }],
  });
  return NextResponse.json(configs);
}

// POST: create or upsert a DRAFT config (optionally clone)
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const depotId = params.id;
  const body = await request.json();
  const { json, effectiveFrom, createdById, cloneFromVersion } = body;

  if (cloneFromVersion != null) {
    const source = await prisma.depotConfig.findFirst({
      where: { depotId, version: cloneFromVersion },
    });
    if (!source) return NextResponse.json({ error: "Source version not found" }, { status: 404 });
    body.json = source.json;
  }

  // validate shape
  const parsed = configZ.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const extra = validateUniqueKeys(parsed.data);
  if (extra.length) {
    return NextResponse.json({ error: { issues: extra } }, { status: 400 });
  }

  // next version number
  const latest = await prisma.depotConfig.findFirst({
    where: { depotId },
    orderBy: [{ version: "desc" }],
    select: { version: true },
  });
  const nextVersion = (latest?.version ?? 0) + 1;

  const created = await prisma.depotConfig.create({
    data: {
      depotId,
      version: nextVersion,
      effectiveFrom: new Date(effectiveFrom ?? Date.now()),
      status: "DRAFT",
      json: parsed.data as any,
      createdById: createdById ?? "admin",
    },
  });
  return NextResponse.json(created, { status: 201 });
}
