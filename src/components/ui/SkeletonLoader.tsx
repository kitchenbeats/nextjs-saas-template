interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  height?: string;
  width?: string;
}

export default function SkeletonLoader({
  className = '',
  count = 1,
  height = 'h-4',
  width = 'w-full',
}: SkeletonLoaderProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded bg-gray-300 ${height} ${width} ${
            index < count - 1 ? 'mb-2' : ''
          }`}
          role="status"
          aria-label="Loading content"
        />
      ))}
    </div>
  );
}
