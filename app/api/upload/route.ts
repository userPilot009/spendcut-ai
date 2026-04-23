import { NextResponse } from "next/server";

import { parseCSV } from "@/lib/parseCSV";
import { getSupabase } from "@/lib/supabase";
import type { Transaction } from "@/types";

type ErrorBody = {
  error: string;
};

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const formData = await request.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!(file instanceof File)) {
      return NextResponse.json<ErrorBody>(
        { error: "Missing or invalid file." },
        { status: 400 },
      );
    }

    if (typeof userId !== "string" || userId.trim().length === 0) {
      return NextResponse.json<ErrorBody>(
        { error: "Missing or invalid userId." },
        { status: 400 },
      );
    }

    const rawCSV = await file.text();
    const transactions: Transaction[] = parseCSV(rawCSV);

    const { data: upload, error: uploadError } = await supabase
      .from("uploads")
      .insert({
        user_id: userId,
        filename: file.name,
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single();

      if (uploadError || !upload) {
        return NextResponse.json<ErrorBody>(
          { error: uploadError?.message ?? "Failed to create upload record." },
          { status: 500 },
        );
      }

    if (transactions.length > 0) {
      const transactionRows = transactions.map((transaction) => ({
        upload_id: upload.id,
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        currency: transaction.currency,
      }));

      const { error: transactionError } = await supabase
        .from("transactions")
        .insert(transactionRows);

      if (transactionError) {
        return NextResponse.json<ErrorBody>(
          { error: "Failed to insert transactions." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        upload_id: upload.id as string,
        count: transactions.length,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ErrorBody>(
      { error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
