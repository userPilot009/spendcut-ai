import type { Subscription } from "@/types";

type SubscriptionListProps = {
  subscriptions: Subscription[];
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

export default function SubscriptionList({
  subscriptions,
}: SubscriptionListProps) {
  if (subscriptions.length === 0) {
    return <p className="text-sm text-gray-600">No subscriptions detected.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-700">Name</th>
            <th className="px-4 py-3 font-medium text-gray-700">Amount</th>
            <th className="px-4 py-3 font-medium text-gray-700">Frequency</th>
            <th className="px-4 py-3 font-medium text-gray-700">Duplicate</th>
            <th className="px-4 py-3 font-medium text-gray-700">Waste</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                {capitalize(subscription.name)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                £{formatAmount(subscription.amount)}/mo
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                {capitalize(subscription.frequency)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    subscription.is_duplicate
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {subscription.is_duplicate ? "Yes" : "No"}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    subscription.is_waste
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {subscription.is_waste ? "Yes" : "No"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
