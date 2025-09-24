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
      className={`bg-gray-50 min-h-screen flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{title}</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
