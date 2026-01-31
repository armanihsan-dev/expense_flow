import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CATEGORIES, getCategoryInfo } from '../../types/expense';
import { cn } from '../../lib/utils';
import type { ExpenseCategory } from '../../types/expense';

interface ExpenseChartProps {
  categoryTotals: Record<ExpenseCategory, number>;
  className?: string;
}

export const ExpenseChart = ({
  categoryTotals,
  className,
}: ExpenseChartProps) => {
  const data = CATEGORIES.filter((cat) => categoryTotals[cat.value] > 0).map(
    (cat) => ({
      name: cat.label,
      value: categoryTotals[cat.value],
      color: cat.color,
      icon: cat.icon,
    })
  );

  const total = Object.values(categoryTotals).reduce(
    (sum, val) => sum + val,
    0
  );

  if (data.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-2xl bg-card border border-border/50 p-8 shadow-medium',
          className
        )}
      >
        <div className="text-4xl mb-3">📊</div>
        <p className="text-muted-foreground text-center">
          No expenses yet. Add your first expense to see the chart!
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="glass-strong rounded-lg p-3 shadow-strong">
          <p className="font-medium flex items-center gap-2">
            <span>{data.icon}</span>
            {data.name}
          </p>
          <p className="text-lg font-bold text-foreground">
            ${data.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    icon,
  }: any) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-lg"
      >
        {icon}
      </text>
    );
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-card border border-border/50 p-6 shadow-medium opacity-0 animate-fade-in',
        className
      )}
      style={{ animationDelay: '200ms' }}
    >
      <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
