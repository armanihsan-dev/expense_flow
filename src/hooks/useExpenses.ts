import { useState, useEffect, useCallback } from 'react';
import type { Expense, ExpenseCategory } from '../types/expense';

const STORAGE_KEY = 'expense-tracker-data';

const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load expenses from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setExpenses(parsed);
      }
    } catch (error) {
      console.error('Failed to load expenses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, isLoading]);

  const addExpense = useCallback(
    (expense: Omit<Expense, 'id' | 'createdAt'>) => {
      const newExpense: Expense = {
        ...expense,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    },
    []
  );

  const updateExpense = useCallback(
    (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>) => {
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id ? { ...expense, ...updates } : expense
        )
      );
    },
    []
  );

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  const getExpenseById = useCallback(
    (id: string) => {
      return expenses.find((expense) => expense.id === id);
    },
    [expenses]
  );

  const getExpensesByCategory = useCallback(
    (category: ExpenseCategory) => {
      return expenses.filter((expense) => expense.category === category);
    },
    [expenses]
  );

  const getExpensesByDateRange = useCallback(
    (startDate: Date, endDate: Date) => {
      return expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
    },
    [expenses]
  );

  const getTotalExpenses = useCallback(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const getCategoryTotals = useCallback(() => {
    const totals: Record<ExpenseCategory, number> = {
      food: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
      utilities: 0,
      health: 0,
      education: 0,
      other: 0,
    };

    expenses.forEach((expense) => {
      totals[expense.category] += expense.amount;
    });

    return totals;
  }, [expenses]);

  const getMonthlyTotals = useCallback(() => {
    const totals: Record<string, number> = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      totals[key] = (totals[key] || 0) + expense.amount;
    });

    return totals;
  }, [expenses]);

  return {
    expenses,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getExpensesByCategory,
    getExpensesByDateRange,
    getTotalExpenses,
    getCategoryTotals,
    getMonthlyTotals,
  };
};
