export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Don't add any auth check here - it causes redirect loop
  // Auth check should be in individual admin pages or middleware
  return <>{children}</>;
}
