interface ErrorStateProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorState({
  title = "Oops! Something went wrong",
  message,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`bg-background min-h-screen flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
