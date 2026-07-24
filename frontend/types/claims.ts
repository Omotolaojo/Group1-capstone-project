export type Claim = {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  receiptUrl?: string;
  extracted?: {
    merchant: string;
    total: number;
    date: string;
  };
};