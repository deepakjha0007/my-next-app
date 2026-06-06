export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-4 space-y-3 animate-pulse">
      <div className="h-3 w-24 bg-muted rounded" />
      <div className="h-5 w-48 bg-muted rounded" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-14 bg-muted rounded-xl" />
        <div className="h-14 bg-muted rounded-xl" />
        <div className="h-14 bg-muted rounded-xl" />
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full" />
    </div>
  );
}
