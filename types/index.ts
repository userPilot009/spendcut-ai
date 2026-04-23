export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
};

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "annual" | "unknown";
  is_duplicate: boolean;
  is_waste: boolean;
};

export type UploadResult = {
  total_spend: number;
  waste_amount: number;
  subscriptions: Subscription[];
  duplicates: Subscription[];
};
