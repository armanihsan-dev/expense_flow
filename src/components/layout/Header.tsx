import { Wallet } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0  z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 max-w-7xl flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="gradient-primary rounded-full p-2.5 shadow-glow">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ExpenseFlow</h1>
            <p className="text-xs text-muted-foreground">
              Smart Money Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm">
            <span className="text-muted-foreground">Data saved locally</span>
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
};
