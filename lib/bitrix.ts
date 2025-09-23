import { Deal, RepeatOrderDeal } from "@/types";

const BITRIX_WEBHOOK = process.env.NEXT_PUBLIC_BITRIX_WEBHOOK!;

async function bitrixFetch<
  TBody extends Record<string, unknown> = never,
  TResult = unknown
>(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body?: TBody
): Promise<TResult> {
  const res = await fetch(`${BITRIX_WEBHOOK}/${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data: { result?: TResult; error?: string; error_description?: string } =
    await res.json();

  if (data.error) {
    throw new Error(data.error_description || "Bitrix error");
  }

  return data.result as TResult;
}

export async function createContactInBitrix(name: string, email: string) {
  return await bitrixFetch("crm.contact.add.json", "POST", {
    fields: { NAME: name, EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }] },
  });
}

export async function getDeals(): Promise<Deal[]> {
  return await bitrixFetch<never, Deal[]>(
    "crm.deal.list.json?select[]=ID&select[]=TITLE&select[]=DATE_CREATE&select[]=STAGE_ID"
  );
}

export async function repeatOrder(deal: RepeatOrderDeal) {
  try {
    const result = await bitrixFetch("crm.deal.add.json", "POST", {
      fields: {
        TITLE: deal.TITLE,
        STAGE_ID: deal.STAGE_ID,
        CONTACT_ID: deal.CONTACT_ID,
      },
    });
    return { success: true, result };
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Unknown error while repeating order";
    return { success: false, error: message };
  }
}

export async function getInvoices() {
  return await bitrixFetch("crm.invoice.list.json");
}

export async function getInvoicePayments(invoiceId: number) {
  return await bitrixFetch(
    `crm.invoice.payment.list.json?filter[INVOICE_ID]=${invoiceId}`
  );
}

export async function getContact(contactId: number) {
  return await bitrixFetch(`crm.contact.get.json?ID=${contactId}`);
}
