import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { format, parseISO, subMonths } from 'date-fns';
import { cn } from '../../lib/utils';

interface MonthlyChartProps {
  monthlyTotals: Record<string, number>;
  className?: string;
}

export const MonthlyChart = ({
  monthlyTotals,
  className,
}: MonthlyChartProps) => {
  // Generate last 6 months
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return format(date, 'yyyy-MM');
  });

  const data = last6Months.map((month) => ({
    month,
    label: format(parseISO(`${month}-01`), 'MMM'),
    fullLabel: format(parseISO(`${month}-01`), 'MMMM yyyy'),
    amount: monthlyTotals[month] || 0,
  }));

  const maxAmount = Math.max(...data.map((d) => d.amount), 100);
  const currentMonth = format(new Date(), 'yyyy-MM');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = data.find((d) => d.label === label);
      return (
        <div className="glass-strong rounded-lg p-3 shadow-strong">
          <p className="text-sm text-muted-foreground">{item?.fullLabel}</p>
          <p className="text-lg font-bold text-foreground">
            $
            {payload[0].value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  const hasData = data.some((d) => d.amount > 0);

  if (!hasData) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-2xl bg-card border border-border/50 p-8 shadow-medium',
          className
        )}
      >
        <div className="text-4xl mb-3">📈</div>
        <p className="text-muted-foreground text-center">
          Start tracking to see your monthly trends!
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-2xl bg-card border border-border/50 p-6 shadow-medium opacity-0 animate-fade-in',
        className
      )}
      style={{ animationDelay: '300ms' }}
    >
      <h3 className="text-lg font-semibold mb-4">Monthly Spending</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              domain={[0, maxAmount * 1.1]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
            />
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.month === currentMonth
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--primary)/0.5)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
