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
    <div className="glass glass-hover p-6 overflow-x-auto">
      <h4 className="font-headline font-semibold mb-4 text-lg" style={{ color: "var(--fg)" }}>
        {tableName}
      </h4>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <th className="text-left py-3 pr-4 font-mono text-xs font-medium uppercase tracking-wider" style={{ color: "var(--accent)" }}>Column</th>
            <th className="text-left py-3 pr-4 font-mono text-xs font-medium uppercase tracking-wider" style={{ color: "var(--accent)" }}>Type</th>
            <th className="text-left py-3 font-medium text-xs uppercase tracking-wider font-mono" style={{ color: "var(--accent)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((col, idx) => (
            <tr
              key={idx}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <td className="py-3 pr-4 font-mono text-xs" style={{ color: "var(--fg)" }}>{col.name}</td>
              <td className="py-3 pr-4 font-mono text-xs" style={{ color: "var(--muted)" }}>{col.type}</td>
              <td className="py-3 text-sm" style={{ color: "var(--muted)" }}>{col.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
