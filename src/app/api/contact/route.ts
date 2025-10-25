import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    accountManager: {
      name: "Andy Prescott",
      phone: "07770 999961",
      email: "andy.prescott@fmconway.co.uk",
    },
    departments: [
      { title: "Sales",          phone: "0800 276 1122", emailHref: "mailto:aasales@fmconway.co.uk",         emailLabel: "Email sales" },
      { title: "Orders",         phone: "0800 276 1122", emailHref: "mailto:aaorders@fmconway.co.uk",        emailLabel: "Email orders" },
      { title: "Credit Control", phone: "0800 276 1122", emailHref: "mailto:aacreditcontrol@fmconway.co.uk", emailLabel: "Email credit control" },
      { title: "Admin",          phone: "0800 276 1122", emailHref: "mailto:aaadmin@fmconway.co.uk",         emailLabel: "Email admin" },
    ],
  });
}
