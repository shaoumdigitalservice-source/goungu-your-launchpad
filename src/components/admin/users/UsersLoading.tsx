export default function UsersLoading() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-muted/60 animate-pulse" />
      ))}
    </div>
  );
}