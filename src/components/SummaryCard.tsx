import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Printer } from "lucide-react";
import { VARILLAS } from "../utils/const";

interface SummaryCardProps {
  quantities: number[];
  onPrint: () => void;
}

export function SummaryCard({ quantities, onPrint }: SummaryCardProps) {
  const totalPieces = quantities.reduce((sum, qty) => sum + (qty || 0), 0);
  
  const totalWeight = quantities.reduce((sum, qty, index) => {
    return sum + (qty || 0) * VARILLAS[index].pesoUnitario * VARILLAS[index].longitud;
  }, 0);

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800">Resumen de Recepción</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-sm text-slate-600">Fecha:</span>
            <span className="text-sm font-medium text-slate-800">{currentDate}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-sm text-slate-600">Total de Varillas Recibidas:</span>
            <span className="text-lg font-bold text-slate-800">{totalPieces}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-sm text-slate-600">Peso Total:</span>
            <span className="text-lg font-bold text-slate-800">{totalWeight.toFixed(2)} kg</span>
          </div>
          <Button 
            onClick={onPrint}
            className="w-full mt-4 bg-slate-700 hover:bg-slate-800 text-white"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimir Recibo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}