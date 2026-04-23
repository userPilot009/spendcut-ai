type SpendSummaryProps = {
  totalSpend: number;
  wasteAmount: number;
  duplicateCount: number;
};

function formatCurrency(value: number): string {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SpendSummary({
  totalSpend,
  wasteAmount,
  duplicateCount,
}: SpendSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-gray-100 p-5">
        <p className="text-sm text-gray-600">Total SaaS spend</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          £{formatCurrency(totalSpend)}/mo
        </p>
      </div>

      <div className="rounded-lg bg-gray-100 p-5">
        <p className="text-sm text-gray-600">Suspected waste</p>
        <p className="mt-2 text-2xl font-semibold text-red-600">
          £{formatCurrency(wasteAmount)}/mo
        </p>
      </div>

      <div className="rounded-lg bg-gray-100 p-5">
        <p className="text-sm text-gray-600">Duplicate tools</p>
        <p className="mt-2 text-2xl font-semibold text-amber-600">
          {duplicateCount} tools
        </p>
      </div>
    </div>
  );
}
