import { useState, useMemo } from 'react';
import { Plus, Wallet, TrendingDown, Calendar, PieChart } from 'lucide-react';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { Button } from '../components/ui/button';

import { Header } from '../components/layout/Header';

import { SummaryCard } from '../components/dashboard/SummaryCard';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { MonthlyChart } from '../components/dashboard/MonthlyChart';
import { ExpenseForm } from '../components/expenses/ExpenseForm';
import { ExpenseList } from '../components/expenses/ExpenseList';
import { useExpenses } from '../hooks/useExpenses';
import { useToast } from '../hooks/use-toast';
import type { Expense } from '../types/expense';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const { toast } = useToast();

  const {
    expenses,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getCategoryTotals,
    getMonthlyTotals,
    getExpensesByDateRange,
  } = useExpenses();

  // Calculate stats
  const stats = useMemo(() => {
    const total = getTotalExpenses();
    const categoryTotals = getCategoryTotals();
    const monthlyTotals = getMonthlyTotals();

    // This month
    const thisMonthStart = startOfMonth(new Date());
    const thisMonthEnd = endOfMonth(new Date());
    const thisMonthExpenses = getExpensesByDateRange(
      thisMonthStart,
      thisMonthEnd
    );
    const thisMonthTotal = thisMonthExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    // Last month
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
    const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
    const lastMonthExpenses = getExpensesByDateRange(
      lastMonthStart,
      lastMonthEnd
    );
    const lastMonthTotal = lastMonthExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    // Calculate trend
    const trend =
      lastMonthTotal > 0
        ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
        : 0;

    // Average per day this month
    const daysInMonth = new Date().getDate();
    const avgPerDay = thisMonthTotal / daysInMonth;

    // Most spent category this month
    const thisMonthCategoryTotals: Record<string, number> = {};
    thisMonthExpenses.forEach((e) => {
      thisMonthCategoryTotals[e.category] =
        (thisMonthCategoryTotals[e.category] || 0) + e.amount;
    });
    const topCategory = Object.entries(thisMonthCategoryTotals).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      total,
      thisMonthTotal,
      lastMonthTotal,
      trend,
      avgPerDay,
      topCategory,
      categoryTotals,
      monthlyTotals,
      expenseCount: expenses.length,
    };
  }, [
    expenses,
    getTotalExpenses,
    getCategoryTotals,
    getMonthlyTotals,
    getExpensesByDateRange,
  ]);

  const handleAddExpense = (data: Omit<Expense, 'id' | 'createdAt'>) => {
    addExpense(data);
    setIsFormOpen(false);
    setEditingExpense(undefined);
    toast({
      title: 'Expense added',
      description: `$${data.amount.toFixed(2)} for ${data.title}`,
    });
  };

  const handleUpdateExpense = (data: Omit<Expense, 'id' | 'createdAt'>) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
      setIsFormOpen(false);
      setEditingExpense(undefined);
      toast({
        title: 'Expense updated',
        description: 'Your changes have been saved.',
      });
    }
  };

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
    toast({
      title: 'Expense deleted',
      description: 'The expense has been removed.',
      variant: 'destructive',
    });
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingExpense(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="gradient-primary rounded-2xl p-4 inline-flex mb-4 shadow-glow pulse-soft">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Title & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">
              Track and manage your expenses efficiently
            </p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="gradient-primary hover:opacity-90 shadow-glow gap-2"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            Add Expense
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <SummaryCard
            title="Total Expenses"
            value={`$${stats.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            subtitle={`${stats.expenseCount} transactions`}
            icon={Wallet}
            variant="primary"
            delay={0}
          />
          <SummaryCard
            title="This Month"
            value={`$${stats.thisMonthTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            subtitle={format(new Date(), 'MMMM yyyy')}
            icon={Calendar}
            trend={
              stats.trend !== 0
                ? {
                    value: Math.round(Math.abs(stats.trend)),
                    isPositive: stats.trend < 0,
                  }
                : undefined
            }
            delay={100}
          />
          <SummaryCard
            title="Daily Average"
            value={`$${stats.avgPerDay.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            subtitle="This month"
            icon={TrendingDown}
            delay={200}
          />
          <SummaryCard
            title="Top Category"
            value={
              stats.topCategory
                ? stats.topCategory[0].charAt(0).toUpperCase() +
                  stats.topCategory[0].slice(1)
                : 'N/A'
            }
            subtitle={
              stats.topCategory
                ? `$${stats.topCategory[1].toFixed(2)}`
                : 'No data yet'
            }
            icon={PieChart}
            variant="accent"
            delay={300}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <ExpenseChart categoryTotals={stats.categoryTotals} />
          <MonthlyChart monthlyTotals={stats.monthlyTotals} />
        </div>

        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
        />
      </main>

      {/* Expense Form Modal */}
      <ExpenseForm
        expense={editingExpense}
        onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
        onCancel={handleCloseForm}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default Index;
