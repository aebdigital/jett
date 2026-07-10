import { NextRequest, NextResponse } from "next/server";

// Standard aebdigital contact pipeline: SMTP2GO API with
// CONTACT_FORM_RECIPIENT / SMTP2GO_API_KEY / SMTP2GO_SENDER env vars,
// and a Reply-To custom header so replies go straight to the customer.
async function sendEmailViaSMTP2GO(payload: {
  api_key: string;
  sender: string;
  to: string[];
  subject: string;
  text_body: string;
  html_body: string;
  custom_headers?: { header: string; value: string }[];
}): Promise<{ success: boolean }> {
  const res = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return { success: res.ok && data?.data?.succeeded > 0 };
}

const esc = (s: unknown) =>
  String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] as string));

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, date, persons, from, to, message } = body;

    if (!name || !phone || !email || !date || !from || !to) {
      return NextResponse.json({ message: "Vyplňte prosím všetky povinné polia." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Zadajte prosím platnú e-mailovú adresu." }, { status: 400 });
    }

    const apiKey = process.env.SMTP2GO_API_KEY;
    const sender = process.env.SMTP2GO_SENDER;
    const recipient = process.env.CONTACT_FORM_RECIPIENT;

    if (!apiKey || !sender || !recipient) {
      console.error("Missing env vars: SMTP2GO_API_KEY, SMTP2GO_SENDER, or CONTACT_FORM_RECIPIENT");
      return NextResponse.json({ message: "Konfiguračná chyba servera." }, { status: 500 });
    }

    const rows: [string, unknown][] = [
      ["Meno", name], ["Telefón", phone], ["E-mail", email],
      ["Dátum a čas", date], ["Počet osôb", persons],
      ["Vyzdvihnutie", from], ["Cieľ", to], ["Poznámka", message || "—"],
    ];
    const text_body = rows.map(([k, v]) => `${k}: ${v ?? "—"}`).join("\n");
    const html_body = `
      <h2 style="font-family:sans-serif">Nová rezervácia — jettransfer.sk</h2>
      <table style="font-family:sans-serif;border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join("")}
      </table>`;

    const sent = await sendEmailViaSMTP2GO({
      api_key: apiKey,
      sender,
      to: [recipient],
      subject: `Rezervácia: ${to} — ${date} (${name})`,
      text_body,
      html_body,
      // reply lands directly in the customer's inbox thread
      custom_headers: [{ header: "Reply-To", value: String(email) }],
    });

    if (!sent.success) {
      return NextResponse.json({ message: "Odoslanie zlyhalo. Zavolajte nám prosím." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Neočakávaná chyba. Skúste to prosím znova." }, { status: 500 });
  }
}
