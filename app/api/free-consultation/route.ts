import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ConsultationBookingEmail } from "@/emails/consultation-booking";
import { ConsultationNotificationEmail } from "@/emails/consultation-notification";

const SHEET_NAME = "consultation";
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/19q3Jmn1zj6CoVEjMf_0Il-Ia2MuNk9ZMmY0YG4YgOrc/edit?usp=sharing";

// 3 months = 90 days in milliseconds
const THREE_MONTHS_MS = 90 * 24 * 60 * 60 * 1000;

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

type ExistingRow = {
  rowIndex: number; // 1-based sheet row number
  submittedAt: Date;
};

async function findExistingSubmission(
  email: string,
): Promise<ExistingRow | null> {
  const sheets = getSheets();

  // Fetch columns B (email) and E (date string) together
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:E`,
  });

  const rows = response.data.values ?? [];

  for (let i = 1; i < rows.length; i++) {
    const rowEmail = String(rows[i][1] ?? "")
      .toLowerCase()
      .trim();

    if (rowEmail === email) {
      // Column E (index 4) holds the date string, e.g. "16 Apr 2026"
      const rawDate = String(rows[i][4] ?? "");
      const submittedAt = new Date(rawDate);
      return {
        rowIndex: i + 1, // sheets are 1-indexed; row 1 is the header
        submittedAt: isNaN(submittedAt.getTime()) ? new Date(0) : submittedAt,
      };
    }
  }

  return null;
}

// POST /api/free-consultation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = String(body.full_name ?? "")
      .trim()
      .slice(0, 200);
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase()
      .slice(0, 200);
    const goal = String(body.goal ?? "")
      .trim()
      .slice(0, 2000);

    // ── Validate ────────────────────────────────────────────────────────────
    if (!fullName) {
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
    if (!goal) {
      return NextResponse.json(
        { error: "Please share what you hope to achieve in this session." },
        { status: 400 },
      );
    }

    // ── Duplicate check ──────────────────────────────────────────────────────
    const existing = await findExistingSubmission(email);

    if (existing) {
      const ageMs = Date.now() - existing.submittedAt.getTime();
      if (ageMs < THREE_MONTHS_MS) {
        return NextResponse.json({ duplicate: true }, { status: 200 });
      }
      // Older than 3 months — fall through and let them re-register
    }

    // ── Save to sheet ────────────────────────────────────────────────────────
    const now = new Date();
    const { dateStr, timeStr } = formatDateTime(now);
    const dateString = `${dateStr}, ${timeStr} UTC`;

    // Columns: Row# | Email | Full Name | Goal | Date | Time
    const sheets = getSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[fullName, email, goal, dateStr, timeStr]],
      },
    });

    // ── Send emails ──────────────────────────────────────────────────────────
    const bookingLink =
      process.env.FREE_CONSULTATION_BOOKING_LINK ?? "https://celerey.co";

    const resend = new Resend(process.env.RESEND_API_KEY);

    const bookingHtml = await render(
      ConsultationBookingEmail({ name: fullName, bookingLink }),
    );

    const notificationHtml = await render(
      ConsultationNotificationEmail({
        name: fullName,
        email,
        goal,
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
        subject:
          "Your free Celerey consultation \u2014 here\u2019s your booking link",
        html: bookingHtml,
      }),
      notificationEmails.length > 0
        ? resend.emails.send({
            from: "Celerey Alerts <hello@no-reply.celerey.co>",
            to: notificationEmails,
            subject: `New consultation request from ${fullName} (${email})`,
            html: notificationHtml,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[free-consultation POST]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
