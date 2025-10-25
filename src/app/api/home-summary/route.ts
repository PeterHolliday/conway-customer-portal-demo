import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    announcement: "Opening Hours: Aldershot Asphalt is now open from 06:00 until 18:00",
    creditLimit: 999999.0,
    currentBalance: -35918.18,
    user: { firstName: "Peter" },
  });
}
