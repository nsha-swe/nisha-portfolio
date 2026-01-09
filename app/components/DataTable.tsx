interface Column {
  name: string;
  type: string;
  description: string;
}

interface DataTableProps {
  tableName: string;
  columns: Column[];
}

export default function DataTable({ tableName, columns }: DataTableProps) {
  return (
    <div className="border border-[var(--border)] bg-white p-6 overflow-x-auto hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
      <h4 className="font-headline font-semibold mb-4 text-lg">{tableName}</h4>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left py-3 pr-4 font-mono text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Column</th>
            <th className="text-left py-3 pr-4 font-mono text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Type</th>
            <th className="text-left py-3 font-medium text-[var(--muted)]">Description</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((col, idx) => (
            <tr key={idx} className="border-b border-[var(--border)] hover:bg-neutral-50 transition-colors">
              <td className="py-3 pr-4 font-mono text-xs">{col.name}</td>
              <td className="py-3 pr-4 text-[var(--muted)] font-mono text-xs">{col.type}</td>
              <td className="py-3">{col.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

