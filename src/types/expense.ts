export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  notes?: string;
  createdAt: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'health'
  | 'education'
  | 'other';

export const CATEGORIES: { value: ExpenseCategory; label: string; color: string; icon: string }[] = [
  { value: 'food', label: 'Food & Dining', color: 'hsl(24, 95%, 53%)', icon: '🍔' },
  { value: 'transport', label: 'Transport', color: 'hsl(217, 91%, 60%)', icon: '🚗' },
  { value: 'entertainment', label: 'Entertainment', color: 'hsl(280, 87%, 60%)', icon: '🎬' },
  { value: 'shopping', label: 'Shopping', color: 'hsl(340, 82%, 52%)', icon: '🛍️' },
  { value: 'utilities', label: 'Utilities', color: 'hsl(47, 96%, 53%)', icon: '💡' },
  { value: 'health', label: 'Health', color: 'hsl(142, 71%, 45%)', icon: '💊' },
  { value: 'education', label: 'Education', color: 'hsl(199, 89%, 48%)', icon: '📚' },
  { value: 'other', label: 'Other', color: 'hsl(215, 16%, 47%)', icon: '📦' },
];

export const getCategoryInfo = (category: ExpenseCategory) => {
  return CATEGORIES.find(c => c.value === category) || CATEGORIES[CATEGORIES.length - 1];
};
