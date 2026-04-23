import type { Transaction } from "../types";

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      // Handle escaped quotes inside quoted values.
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseAmount(rawAmount: string): number | null {
  const normalized = rawAmount.replace(/[£,\s]/g, "");
  const amount = Number.parseFloat(normalized);

  if (Number.isNaN(amount)) {
    return null;
  }

  return amount;
}

export function parseCSV(rawCSV: string): Transaction[] {
  const lines = rawCSV
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length <= 1) {
    return [];
  }

  const transactions: Transaction[] = [];

  // Skip header row (Date, Description, Amount).
  for (let i = 1; i < lines.length; i += 1) {
    const [date = "", description = "", rawAmount = ""] = parseCSVLine(lines[i]);
    const amount = parseAmount(rawAmount);

    if (amount === null || amount >= 0) {
      continue;
    }

    transactions.push({
      id: crypto.randomUUID(),
      date,
      description,
      amount: Math.abs(amount),
      currency: "GBP",
    });
  }

  return transactions;
}
