import type { Subscription } from "@/types";

type CancelSuggestionsProps = {
  duplicates: Subscription[];
};

function formatAmount(amount: number): string {
  return amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function capitalize(value: string): string {
  if (value.length === 0) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getReason(subscription: Subscription): string {
  if (subscription.is_duplicate && subscription.is_waste) {
    return "Duplicate + overlapping";
  }

  if (subscription.is_duplicate) {
    return "Duplicate tool";
  }

  return "Overlapping category";
}

export default function CancelSuggestions({
  duplicates,
}: CancelSuggestionsProps) {
  const suggestions = duplicates.filter(
    (subscription) => subscription.is_duplicate || subscription.is_waste,
  );

  if (suggestions.length === 0) {
    return <p className="text-sm text-gray-600">No cancellation suggestions.</p>;
  }

  return (
    <div className="space-y-3">
      {suggestions.map((subscription) => (
        <div key={subscription.id} className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm font-semibold text-red-600">Consider cancelling</p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {capitalize(subscription.name)}
          </p>
          <p className="mt-1 text-sm text-gray-800">
            £{formatAmount(subscription.amount)}/mo
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Reason: {getReason(subscription)}
          </p>
        </div>
      ))}
    </div>
  );
}
