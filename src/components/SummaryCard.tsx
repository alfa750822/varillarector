import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Entry } from "./EntryList";

interface SummaryCardProps {
  entries: Entry[];
}

export default function SummaryCard({ entries }: SummaryCardProps) {
  const totalPieces = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);

  const today = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Resumen de Recepción</CardTitle>
        <span className="text-xs text-slate-500">{today}</span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-slate-500">Total Varillas</p>
            <p className="text-2xl font-bold">{totalPieces}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500">Peso Total</p>
            <p className="text-2xl font-bold">{totalWeight.toFixed(2)} <span className="text-sm font-normal text-slate-600">kg</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}