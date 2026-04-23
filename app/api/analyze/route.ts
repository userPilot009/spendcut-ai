import { NextResponse } from "next/server";

import { detectSubscriptions } from "@/lib/detectSubscriptions";
import { supabase } from "@/lib/supabase";
import type { Subscription, Transaction, UploadResult } from "@/types";

type AnalyzeRequestBody = {
  upload_id?: unknown;
};

type ErrorBody = {
  error: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    const uploadId = body.upload_id;

    if (typeof uploadId !== "string" || uploadId.trim().length === 0) {
      return NextResponse.json<ErrorBody>(
        { error: "Missing or invalid upload_id." },
        { status: 400 },
      );
    }

    const { data: transactionRows, error: transactionFetchError } = await supabase
      .from("transactions")
      .select("id, date, description, amount, currency")
      .eq("upload_id", uploadId);

    if (transactionFetchError) {
      return NextResponse.json<ErrorBody>(
        { error: "Failed to fetch transactions." },
        { status: 500 },
      );
    }

    const transactions: Transaction[] = (transactionRows ?? []).map((row) => ({
      id: String(row.id),
      date: String(row.date),
      description: String(row.description),
      amount: Number(row.amount),
      currency: String(row.currency),
    }));

    const subscriptions: Subscription[] = detectSubscriptions(transactions);

    if (subscriptions.length > 0) {
      const subscriptionRows = subscriptions.map((subscription) => ({
        id: subscription.id,
        upload_id: uploadId,
        name: subscription.name,
        amount: subscription.amount,
        frequency: subscription.frequency,
        is_duplicate: subscription.is_duplicate,
        is_waste: subscription.is_waste,
      }));

      const { error: insertSubscriptionsError } = await supabase
        .from("subscriptions")
        .insert(subscriptionRows);

      if (insertSubscriptionsError) {
        return NextResponse.json<ErrorBody>(
          { error: "Failed to insert subscriptions." },
          { status: 500 },
        );
      }
    }

    const totalSpend = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
    const wasteAmount = subscriptions.reduce(
      (sum, subscription) =>
        subscription.is_waste ? sum + subscription.amount : sum,
      0,
    );
    const duplicates = subscriptions.filter(
      (subscription) => subscription.is_duplicate,
    );

    const result: UploadResult = {
      total_spend: totalSpend,
      waste_amount: wasteAmount,
      subscriptions,
      duplicates,
    };

    return NextResponse.json<UploadResult>(result, { status: 200 });
  } catch {
    return NextResponse.json<ErrorBody>(
      { error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
