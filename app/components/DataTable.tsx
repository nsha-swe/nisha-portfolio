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
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-md overflow-x-auto">
      <h4 className="font-semibold mb-4 text-lg">{tableName}</h4>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10">
            <th className="text-left py-2 pr-4 font-semibold">Column</th>
            <th className="text-left py-2 pr-4 font-semibold">Type</th>
            <th className="text-left py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((col, idx) => (
            <tr key={idx} className="border-b border-black/5">
              <td className="py-2 pr-4 font-mono text-xs">{col.name}</td>
              <td className="py-2 pr-4 text-black/60">{col.type}</td>
              <td className="py-2 text-black/70">{col.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

