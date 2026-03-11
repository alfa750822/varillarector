import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Trash2, FileSpreadsheet } from "lucide-react";
import { Lote } from "../types";

interface LoteListProps {
  lotes: Lote[];
  onDeleteLote: (id: number) => void;
  onExportCSV: () => void;
}

export function LoteList({ lotes, onDeleteLote, onExportCSV }: LoteListProps) {
  const totalVarillas = lotes.reduce((sum, lote) => sum + lote.cantidad, 0);
  const totalPeso = lotes.reduce((sum, lote) => sum + lote.pesoTotal, 0);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-slate-800">Listado de Lotes</CardTitle>
          <Button 
            onClick={onExportCSV}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={lotes.length === 0}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {lotes.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p className="text-sm">No hay lotes registrados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="text-xs text-slate-600 mb-1">Total Varillas</p>
                <p className="text-xl font-bold text-slate-800">{totalVarillas}</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="text-xs text-slate-600 mb-1">Peso Total</p>
                <p className="text-xl font-bold text-slate-800">{totalPeso.toFixed(2)} kg</p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-200 border-b-2 border-slate-300">
                    <th className="p-3 text-left text-xs font-semibold text-slate-700">Lote #</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-700">Varilla</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-700">Cantidad</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-700">Peso (kg)</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-700">Fecha</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lotes.map((lote) => (
                    <tr 
                      key={lote.id} 
                      className={`border-b border-slate-200 hover:bg-slate-100 transition-colors ${
                        lote.id % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
                    >
                      <td className="p-3 text-sm font-medium text-slate-800">#{lote.id}</td>
                      <td className="p-3 text-sm text-slate-600">{lote.varillaNo}</td>
                      <td className="p-3 text-sm text-slate-600">{lote.cantidad}</td>
                      <td className="p-3 text-sm font-medium text-slate-800">{lote.pesoTotal.toFixed(2)}</td>
                      <td className="p-3 text-xs text-slate-500">{formatDate(lote.fecha)}</td>
                      <td className="p-3">
                        <Button
                          onClick={() => onDeleteLote(lote.id)}
                          variant="destructive"
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}