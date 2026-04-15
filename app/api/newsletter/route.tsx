import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { NewsletterWelcomeEmail } from "@/emails/newsletter-welcome";
import { NewsletterNotificationEmail } from "@/emails/newsletter-notification";

const SHEET_NAME = "newsletter";
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

async function getExistingEmails(): Promise<string[]> {
  const sheets = getSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:A`,
  });

  const rows = response.data.values ?? [];
  return rows.flat().map((e) => String(e).toLowerCase().trim());
}

async function findRowByEmail(email: string): Promise<number | null> {
  const sheets = getSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:A`,
  });

  const rows = response.data.values ?? [];
  const index = rows.findIndex(
    (row) => String(row[0]).toLowerCase().trim() === email.toLowerCase().trim(),
  );

  // Sheets are 1-indexed; row 1 is the header, data starts at row 2
  return index > 0 ? index + 1 : null;
}

// POST /api/newsletter — save email immediately (step 1)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const existing = await getExistingEmails();
    if (existing.includes(email)) {
      return NextResponse.json({ duplicate: true }, { status: 200 });
    }

    const sheets = getSheets();
    const now = new Date();
    const { dateStr, timeStr } = formatDateTime(now);

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, "", dateStr, timeStr]],
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[newsletter POST]", err);
    return NextResponse.json(
      { error: "Failed to save email." },
      { status: 500 },
    );
  }
}

// PATCH /api/newsletter — update name + send emails (step 2)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const name = String(body.name ?? "").trim();

    if (!email) {
      return NextResponse.json({ error: "Email required." }, { status: 400 });
    }

    // Update name in sheet
    const rowNumber = await findRowByEmail(email);
    if (rowNumber !== null) {
      const sheets = getSheets();
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!B${rowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[name]],
        },
      });
    }

    // Render email HTML with React Email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const displayName = name || undefined;
    const dateString =
      new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";

    const welcomeHtml = await render(
      NewsletterWelcomeEmail({ name: displayName, email }),
    );

    const notificationHtml = await render(
      NewsletterNotificationEmail({
        name: displayName,
        email,
        date: dateString,
        sheetUrl: SHEET_URL,
      }),
    );

    const notificationEmails = (process.env.NOTIFICATION_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    // Fire both emails concurrently
    await Promise.all([
      resend.emails.send({
        from: "Celerey <hello@no-reply.celerey.co>",
        to: [email],
        subject: "Welcome to the Celerey Community",
        html: welcomeHtml,
      }),
      notificationEmails.length > 0
        ? resend.emails.send({
            from: "Celerey Alerts <hello@no-reply.celerey.co>",
            to: notificationEmails,
            subject: `New community lead: ${email}`,
            html: notificationHtml,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[newsletter PATCH]", err);
    return NextResponse.json(
      { error: "Failed to update record." },
      { status: 500 },
    );
  }
}
