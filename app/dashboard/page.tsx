"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";

import CancelSuggestions from "@/components/CancelSuggestions";
import SpendSummary from "@/components/SpendSummary";
import SubscriptionList from "@/components/SubscriptionList";
import UploadForm from "@/components/UploadForm";
import type { UploadResult } from "@/types";

export default function DashboardPage() {
  const supabaseBrowser = getSupabaseBrowser();
  const [result, setResult] = useState<UploadResult | null>(null);
  const [user, setUser] = useState<{ id: string; email?: string | null } | null>(
    null
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabaseBrowser.auth.getUser();
      setUser(currentUser);
    };

    void getUser();
  }, []);

  const handleSignOut = async () => {
    await supabaseBrowser.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">SpendCut AI</h1>
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-600">{user?.email ?? ""}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </div>

      <UploadForm onResult={setResult} userId={user?.id ?? ""} />

      {result && (
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your SaaS spend report
            </h2>
            <SpendSummary
              totalSpend={result.total_spend}
              wasteAmount={result.waste_amount}
              duplicateCount={result.duplicates.length}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Detected subscriptions
            </h2>
            <SubscriptionList subscriptions={result.subscriptions} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Cancellation suggestions
            </h2>
            <CancelSuggestions duplicates={result.duplicates} />
          </div>
        </section>
      )}
    </main>
  );
}
