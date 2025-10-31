// app/api/depots/[id]/configs/route.ts
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";
import { configZ, validateUniqueKeys } from "@/schemas/depot-config";

const prisma = new PrismaClient();

const bodyZ = z.object({
  json: z.unknown().optional(),
  effectiveFrom: z.union([z.string(), z.date()]).optional(),
  createdById: z.string().optional(),
  cloneFromVersion: z.number().int().optional(),
});

// GET: list versions for a depot (latest first)
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: depotId } = await params;
  const configs = await prisma.depotConfig.findMany({
    where: { depotId },
    orderBy: [{ version: "desc" }],
  });
  return NextResponse.json(configs);
}

// POST: create or upsert a DRAFT config (optionally clone)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: depotId } = await params;
  const body = bodyZ.parse(await request.json());
  const { effectiveFrom, createdById, cloneFromVersion } = body;

  let candidateJson: unknown = body.json;

  if (cloneFromVersion != null) {
    const source = await prisma.depotConfig.findFirst({
      where: { depotId, version: cloneFromVersion },
      select: { json: true },
    });
    if (!source) {
      return NextResponse.json({ error: "Source version not found" }, { status: 404 });
    }
    candidateJson = source.json;
  }

  if (candidateJson === undefined) {
    return NextResponse.json({ error: "`json` is required when not cloning" }, { status: 400 });
  }

  const parsed = configZ.safeParse(candidateJson);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const extraIssues = validateUniqueKeys(parsed.data);
  if (extraIssues.length) {
    return NextResponse.json({ error: { issues: extraIssues } }, { status: 400 });
  }

  const latest = await prisma.depotConfig.findFirst({
    where: { depotId },
    orderBy: [{ version: "desc" }],
    select: { version: true },
  });
  const nextVersion = (latest?.version ?? 0) + 1;

  const effectiveFromDate =
    effectiveFrom instanceof Date
      ? effectiveFrom
      : effectiveFrom
        ? new Date(effectiveFrom)
        : new Date();

  const created = await prisma.depotConfig.create({
    data: {
      depotId,
      version: nextVersion,
      effectiveFrom: effectiveFromDate,
      status: "DRAFT",
      json: parsed.data as unknown as Prisma.InputJsonValue,
      createdById: createdById ?? "admin",
    },
  });

  return NextResponse.json(created, { status: 201 });
}