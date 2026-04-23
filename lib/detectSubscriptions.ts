import type { Subscription, Transaction } from "../types";

const KEYWORDS = [
  "netflix",
  "spotify",
  "slack",
  "notion",
  "figma",
  "github",
  "aws",
  "google",
  "microsoft",
  "adobe",
  "zoom",
  "dropbox",
  "mailchimp",
  "hubspot",
  "intercom",
  "linear",
  "vercel",
  "heroku",
  "stripe",
  "twilio",
  "xero",
  "quickbooks",
  "salesforce",
  "canva",
  "loom",
  "miro",
  "asana",
  "monday",
  "clickup",
] as const;

const WASTE_CATEGORIES: readonly (readonly string[])[] = [
  ["asana", "monday", "clickup", "linear", "notion"],
  ["zoom", "google", "microsoft"],
  ["figma", "canva", "miro", "adobe"],
  ["xero", "quickbooks"],
];

type Keyword = (typeof KEYWORDS)[number];

function findKeyword(description: string): Keyword | null {
  const lowerDescription = description.toLowerCase();

  for (const keyword of KEYWORDS) {
    if (lowerDescription.includes(keyword)) {
      return keyword;
    }
  }

  return null;
}

export function detectSubscriptions(transactions: Transaction[]): Subscription[] {
  const grouped = new Map<Keyword, Transaction[]>();

  for (const transaction of transactions) {
    const keyword = findKeyword(transaction.description);

    if (!keyword) {
      continue;
    }

    const existing = grouped.get(keyword) ?? [];
    existing.push(transaction);
    grouped.set(keyword, existing);
  }

  const wasteKeywords = new Set<Keyword>();

  for (const category of WASTE_CATEGORIES) {
    const present = category.filter((keyword) => grouped.has(keyword as Keyword));

    if (present.length >= 2) {
      for (const keyword of present) {
        wasteKeywords.add(keyword as Keyword);
      }
    }
  }

  const subscriptions: Subscription[] = [];

  for (const keyword of KEYWORDS) {
    const matches = grouped.get(keyword);

    if (!matches || matches.length === 0) {
      continue;
    }

    subscriptions.push({
      id: crypto.randomUUID(),
      name: keyword,
      amount: matches[0].amount,
      frequency: "monthly",
      is_duplicate: matches.length > 1,
      is_waste: wasteKeywords.has(keyword),
    });
  }

  return subscriptions;
}
