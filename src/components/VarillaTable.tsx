import { Input } from "../components/ui/input";
import { VARILLAS, Varilla } from "../utils/const";

interface VarillaTableProps {
  quantities: number[];
  onQuantityChange: (index: number, value: number) => void;
}

export function VarillaTable({ quantities, onQuantityChange }: VarillaTableProps) {
  const calculateWeight = (index: number): number => {
    const qty = quantities[index] || 0;
    return qty * VARILLAS[index].pesoUnitario * VARILLAS[index].longitud;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100 border-b-2 border-slate-300">
            <th className="p-3 text-left text-sm font-semibold text-slate-700">No.</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Diámetro (pulg)</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Diámetro (mm)</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Peso unitario (kg/m)</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Longitud (m)</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Barras/t</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Barras/t (red)</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Cant. Recibida</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Peso Recibido (kg)</th>
          </tr>
        </thead>
        <tbody>
          {VARILLAS.map((varilla: Varilla, index: number) => (
            <tr 
              key={varilla.no} 
              className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
              }`}
            >
              <td className="p-3 text-sm font-medium text-slate-800">{varilla.no}</td>
              <td className="p-3 text-sm text-slate-600">{varilla.diamPulg}</td>
              <td className="p-3 text-sm text-slate-600">{varilla.diamMm.toFixed(2)}</td>
              <td className="p-3 text-sm text-slate-600">{varilla.pesoUnitario.toFixed(3)}</td>
              <td className="p-3 text-sm text-slate-600">{varilla.longitud}</td>
              <td className="p-3 text-sm text-slate-600">{varilla.barrasPorTon.toFixed(3)}</td>
              <td className="p-3 text-sm text-slate-600">{varilla.barrasPorTonRed}</td>
              <td className="p-3">
                <Input
                  type="number"
                  min="0"
                  value={quantities[index] || ''}
                  onChange={(e) => onQuantityChange(index, parseInt(e.target.value) || 0)}
                  className="w-24 h-9 text-sm"
                  placeholder="0"
                />
              </td>
              <td className="p-3 text-sm font-medium text-slate-800">
                {calculateWeight(index).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}