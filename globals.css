import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { VARILLAS } from "../utils/const";

interface VarillaTableProps {
  quantities: number[];
  onQuantityChange: (index: number, value: string) => void;
}

export default function VarillaTable({ quantities, onQuantityChange }: VarillaTableProps) {
  return (
    <div className="rounded-md border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Diámetro (pulg)</TableHead>
            <TableHead>Diámetro (mm)</TableHead>
            <TableHead>Peso Unit. (kg/m)</TableHead>
            <TableHead>Longitud (m)</TableHead>
            <TableHead className="text-right">Barras/Ton</TableHead>
            <TableHead className="text-right">Redondeado</TableHead>
            <TableHead className="w-[140px]">Cant. Recibida</TableHead>
            <TableHead className="w-[120px] text-right">Peso (kg)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {VARILLAS.map((varilla, index) => {
            const weight = quantities[index] * varilla.pesoUnitario * varilla.longitud;
            return (
              <TableRow key={varilla.no}>
                <TableCell className="font-medium">{varilla.no}</TableCell>
                <TableCell>{varilla.diamPulg}</TableCell>
                <TableCell>{varilla.diamMm}</TableCell>
                <TableCell>{varilla.pesoUnitario}</TableCell>
                <TableCell>{varilla.longitud}</TableCell>
                <TableCell className="text-right">{varilla.barrasPorTon}</TableCell>
                <TableCell className="text-right">{varilla.barrasPorTonRed}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    className="h-8"
                    value={quantities[index] || ""}
                    onChange={(e) => onQuantityChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-right font-medium">
                  {weight > 0 ? weight.toFixed(2) : "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}