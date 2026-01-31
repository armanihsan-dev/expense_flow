import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, X, Check } from 'lucide-react';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Calendar } from '../../components/ui/calendar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';

import {
  CATEGORIES,
  type Expense,
  type ExpenseCategory,
} from '../../types/expense';

import { cn } from '../../lib/utils';

const expenseSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  amount: z
    .number()
    .positive('Amount must be positive')
    .max(1000000, 'Amount is too large'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
});

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (data: Omit<Expense, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const ExpenseForm = ({
  expense,
  onSubmit,
  onCancel,
  isOpen,
}: ExpenseFormProps) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDate(new Date(expense.date));
      setNotes(expense.notes || '');
    } else {
      setTitle('');
      setAmount('');
      setCategory('other');
      setDate(new Date());
      setNotes('');
    }
    setErrors({});
  }, [expense, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title: title.trim(),
      amount: parseFloat(amount) || 0,
      category,
      date: format(date, 'yyyy-MM-dd'),
      notes: notes.trim() || undefined,
    };

    try {
      expenseSchema.parse(formData);
      onSubmit(formData as Omit<Expense, 'id' | 'createdAt'>);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Container */}
      <div className="relative w-full sm:max-w-2xl h-[95vh] sm:h-auto sm:max-h-[90vh] bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col border border-border/40 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-200">
        {/* --- Header (Fixed) --- */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {expense ? 'Edit Expense' : 'New Expense'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {expense
                ? 'Update transaction details'
                : 'Add a new transaction to your list'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="rounded-full p-2 bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* --- Scrollable Form Body --- */}
        <div className="flex-1 overflow-y-auto">
          <form
            id="expense-form"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Title Section */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is this expense for?"
                className={cn(
                  'h-11',
                  errors.title
                    ? 'border-destructive focus-visible:ring-destructive'
                    : ''
                )}
              />
              {errors.title && (
                <p className="text-xs font-medium text-destructive">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Split Row: Amount & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className={cn(
                      'pl-7 h-11 font-mono',
                      errors.amount ? 'border-destructive' : ''
                    )}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal h-11',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Category Grid */}
            <div className="space-y-3">
              <Label>Category</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        'relative flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all duration-200 border',
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary'
                          : 'border-border bg-card hover:bg-muted/50 hover:border-muted-foreground/25'
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 text-primary">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <span className="text-2xl">{cat.icon}</span>
                      <span
                        className={cn(
                          'text-xs font-medium text-center',
                          isSelected ? 'text-primary' : 'text-muted-foreground'
                        )}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">
                Notes{' '}
                <span className="text-muted-foreground font-normal">
                  (Optional)
                </span>
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add details, tags, or reminders..."
                rows={3}
                className={cn(
                  'resize-none',
                  errors.notes ? 'border-destructive' : ''
                )}
              />
              {errors.notes && (
                <p className="text-xs font-medium text-destructive">
                  {errors.notes}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* --- Footer Actions (Fixed) --- */}
        <div className="flex-none p-6 border-t border-border/40 bg-card/50 backdrop-blur-sm rounded-b-3xl">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 h-11 text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="expense-form" // Binds this button to the form above
              className="flex-1 h-11 text-base gradient-primary shadow-lg hover:shadow-xl transition-all"
            >
              {expense ? 'Save Changes' : 'Add Expense'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
