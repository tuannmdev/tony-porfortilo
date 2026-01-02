interface LoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export default function Loading({ size = "md", message }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} animate-spin border-primary border-r-transparent rounded-full`}
      />
      {message && (
        <p className="mt-4 text-sm text-text-muted font-bold">{message}</p>
      )}
    </div>
  );
}
