import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';


interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
  delay?: number;
}

export const SummaryCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
  delay = 0,
}: SummaryCardProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-strong hover:-translate-y-1',
        'opacity-0 animate-fade-in',
        variant === 'primary' && 'gradient-primary text-primary-foreground',
        variant === 'accent' && 'gradient-accent text-accent-foreground',
        variant === 'default' &&
          'bg-card shadow-medium border border-border/50',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decoration */}
      <div
        className={cn(
          'absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10',
          variant === 'default' ? 'bg-primary' : 'bg-white'
        )}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              'inline-flex items-center justify-center rounded-xl p-3',
              variant === 'default'
                ? 'bg-primary/10 text-primary'
                : 'bg-white/20 text-inherit'
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          {trend && (
            <div
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                trend.isPositive
                  ? 'bg-success/10 text-success'
                  : 'bg-destructive/10 text-destructive',
                variant !== 'default' && 'bg-white/20 text-inherit'
              )}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <p
            className={cn(
              'text-sm font-medium',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
            )}
          >
            {title}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p
              className={cn(
                'mt-1 text-sm',
                variant === 'default' ? 'text-muted-foreground' : 'opacity-70'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
