import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { SessionBookingEmail } from "@/emails/session-booking";
import { SessionNotificationEmail } from "@/emails/session-notification";

const SHEET_NAME = "45min";
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/19q3Jmn1zj6CoVEjMf_0Il-Ia2MuNk9ZMmY0YG4YgOrc/edit?usp=sharing";

function getSheets() {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

function formatDateTime(date: Date): { dateStr: string; timeStr: string } {
  const dateStr = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const timeStr = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });
  return { dateStr, timeStr };
}

// POST /api/book-session — log to "45min" sheet and send emails
export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid or empty request body." },
        { status: 400 },
      );
    }

    const firstName = String(body.firstName ?? "")
      .trim()
      .slice(0, 100);
    const lastName = String(body.lastName ?? "")
      .trim()
      .slice(0, 100);
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase()
      .slice(0, 200);
    const phone = String(body.phone ?? "")
      .trim()
      .slice(0, 50);
    const location = String(body.location ?? "")
      .trim()
      .slice(0, 200);
    const paymentUrl = String(body.paymentUrl ?? "").trim();

    // Validate
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 },
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 },
      );
    }

    const now = new Date();
    const { dateStr, timeStr } = formatDateTime(now);
    const dateString = `${dateStr}, ${timeStr} UTC`;

    // Append to sheet: First Name | Last Name | Email | Phone | Location | Date | Time
    const sheets = getSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [firstName, lastName, email, phone, location, dateStr, timeStr],
        ],
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fullName = `${firstName} ${lastName}`;

    const confirmationHtml = await render(
      SessionBookingEmail({
        name: fullName,
        paymentUrl: paymentUrl || SHEET_URL,
      }),
    );

    const notificationHtml = await render(
      SessionNotificationEmail({
        firstName,
        lastName,
        email,
        phone,
        location: location || "Not provided",
        date: dateString,
        sheetUrl: SHEET_URL,
      }),
    );

    const notificationEmails = (process.env.NOTIFICATION_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    await Promise.all([
      resend.emails.send({
        from: "Celerey <hello@no-reply.celerey.co>",
        to: [email],
        subject: "Complete your Celerey session booking",
        html: confirmationHtml,
      }),
      notificationEmails.length > 0
        ? resend.emails.send({
            from: "Celerey Alerts <hello@no-reply.celerey.co>",
            to: notificationEmails,
            subject: `New 45-min session booking from ${fullName} (${email})`,
            html: notificationHtml,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[book-session POST]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
