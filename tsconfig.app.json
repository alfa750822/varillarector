import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { VARILLAS } from "../utils/const";

export interface Entry {
  id: string;
  lote: number;
  varillaIndex: number;
  quantity: number;
  weight: number;
}

interface EntryListProps {
  entries: Entry[];
  onDelete: (id: string) => void;
}

export default function EntryList({ entries, onDelete }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
        <p className="text-slate-500">No hay lotes registrados aún.</p>
        <p className="text-sm text-slate-400">Use el formulario superior para agregar varillas.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-[80px]">Lote #</TableHead>
            <TableHead>Varilla</TableHead>
            <TableHead className="text-right">Cantidad</TableHead>
            <TableHead className="text-right">Peso (kg)</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            const varilla = VARILLAS[entry.varillaIndex];
            return (
              <TableRow key={entry.id}>
                <TableCell className="font-medium text-slate-500">
                  #{entry.lote}
                </TableCell>
                <TableCell>
                  <div>
                    <span className="font-medium">{varilla.no}</span>
                    <span className="text-slate-500 text-xs ml-2">
                      Ø {varilla.diamPulg}"
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{entry.quantity}</TableCell>
                <TableCell className="text-right font-medium">
                  {entry.weight.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}