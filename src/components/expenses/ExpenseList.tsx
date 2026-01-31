import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';
import {
  type Expense,
  getCategoryInfo,
  type ExpenseCategory,
  CATEGORIES,
} from '../../types/expense';

import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { cn } from '../../lib/utils';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export const ExpenseList = ({
  expenses,
  onEdit,
  onDelete,
  className,
}: ExpenseListProps) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | 'all'>(
    'all'
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(search.toLowerCase()) ||
      expense.notes?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const groupedExpenses = filteredExpenses.reduce(
    (groups, expense) => {
      const date = expense.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
      return groups;
    },
    {} as Record<string, Expense[]>
  );

  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-card border border-border/50 shadow-medium overflow-hidden opacity-0 animate-fade-in',
        className
      )}
      style={{ animationDelay: '400ms' }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              setCategoryFilter(value as ExpenseCategory | 'all')
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    {cat.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Expense List */}
      <div className="max-h-[500px] overflow-y-auto">
        {sortedDates.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-muted-foreground">
              {expenses.length === 0
                ? 'No expenses yet. Add your first one!'
                : 'No expenses match your filters.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {sortedDates.map((date) => (
              <div key={date}>
                {/* Date Header */}
                <div className="px-6 py-3 bg-muted/30 sticky top-0 backdrop-blur-sm">
                  <p className="text-sm font-medium text-muted-foreground">
                    {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                  </p>
                </div>

                {/* Expenses for this date */}
                <div className="divide-y divide-border/30">
                  {groupedExpenses[date].map((expense, index) => {
                    const categoryInfo = getCategoryInfo(expense.category);
                    return (
                      <div
                        key={expense.id}
                        className="px-6 py-4 flex items-center gap-4 hover:bg-muted/20 transition-colors group"
                      >
                        {/* Category Icon */}
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${categoryInfo.color}15` }}
                        >
                          {categoryInfo.icon}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {expense.title}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{ backgroundColor: categoryInfo.color }}
                            />
                            {categoryInfo.label}
                            {expense.notes && (
                              <span className="truncate">
                                • {expense.notes}
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Amount */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-lg">
                            $
                            {expense.amount.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(expense)}
                            className="h-8 w-8"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(expense.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
