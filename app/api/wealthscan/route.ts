import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SHEET_NAME = "wealthscan";

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

// POST /api/wealthscan — save wealth scan results
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const score = Number(body.score ?? 0);
    const categoryLabel = String(body.categoryLabel ?? "");
    const answers: string[] = Array.isArray(body.answers) ? body.answers : [];

    const now = new Date();
    const { dateStr, timeStr } = formatDateTime(now);

    // Columns: Email | Date | Time | Score | Category | Q1…Q9
    const row = [
      email,
      dateStr,
      timeStr,
      score,
      categoryLabel,
      ...answers.slice(0, 9),
    ];

    const sheets = getSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:N`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[wealthscan POST]", err);
    return NextResponse.json(
      { error: "Failed to save results." },
      { status: 500 },
    );
  }
}
