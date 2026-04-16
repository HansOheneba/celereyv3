import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";
import { ContactNotificationEmail } from "@/emails/contact-notification";

const SHEET_NAME = "cs";
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

// POST /api/contact — save enquiry to "cs" sheet and send emails
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
    const subject = String(body.subject ?? "")
      .trim()
      .slice(0, 300);
    const message = String(body.message ?? "")
      .trim()
      .slice(0, 5000);

    // Validate required fields
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
    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const now = new Date();
    const { dateStr, timeStr } = formatDateTime(now);
    const dateString = `${dateStr}, ${timeStr} UTC`;

    // Append row: Full Name | Email | Subject | Message | Date | Time
    const sheets = getSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[fullName, email, subject, message, dateStr, timeStr]],
      },
    });

    // Render email HTML
    const resend = new Resend(process.env.RESEND_API_KEY);

    const confirmationHtml = await render(
      ContactConfirmationEmail({
        name: fullName,
        subject: subject || undefined,
      }),
    );

    const notificationHtml = await render(
      ContactNotificationEmail({
        name: fullName,
        email,
        subject: subject || undefined,
        message,
        date: dateString,
        sheetUrl: SHEET_URL,
      }),
    );

    const notificationEmails = (process.env.NOTIFICATION_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    await Promise.all([
      // Confirmation to the user
      resend.emails.send({
        from: "Celerey <hello@no-reply.celerey.co>",
        to: [email],
        subject: "We\u2019ve received your message \u2014 Celerey",
        html: confirmationHtml,
      }),
      // Internal notification to the team
      notificationEmails.length > 0
        ? resend.emails.send({
            from: "Celerey Alerts <hello@no-reply.celerey.co>",
            to: notificationEmails,
            subject: `New CS enquiry from ${fullName} (${email})`,
            html: notificationHtml,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact POST]", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
