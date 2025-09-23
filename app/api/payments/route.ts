import { NextResponse } from "next/server";
import { getContact, getInvoices } from "@/lib/bitrix";

export async function GET() {
  try {
    const invoices = await getInvoices();
    const payments = [];

    for (const invoice of invoices) {
      let contactName = "Неизвестно";
      let contactEmail = "Нет email";

      if (invoice.CONTACT_ID) {
        const contact = await getContact(invoice.CONTACT_ID);
        contactName =
          `${contact.NAME || ""} ${contact.LAST_NAME || ""}`.trim() ||
          "Неизвестно";
        contactEmail = contact.EMAIL?.[0]?.VALUE || "Нет email";
      }

      payments.push({
        id: invoice.ID,
        employee: {
          name: contactName,
          email: contactEmail,
          avatar: "/assets/images/profile.svg",
        },
        status:
          invoice.STATUS_ID === "P"
            ? "Оплачен"
            : invoice.STATUS_ID === "N"
            ? "Не оплачен"
            : "В обработке",
        completed: invoice.STATUS_ID === "P" ? 100 : 0,
      });
    }

    return NextResponse.json({ payments });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ошибка получения платежей" },
      { status: 500 }
    );
  }
}
