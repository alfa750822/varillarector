import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { VARILLAS } from "../utils/const";
import { Plus } from "lucide-react";

interface EntryFormProps {
  onAddEntry: (varillaIndex: number, quantity: number) => void;
}

export default function EntryForm({ onAddEntry }: EntryFormProps) {
  const [selectedVarillaIndex, setSelectedVarillaIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<string>("");

  const handleAdd = () => {
    const qty = parseInt(quantity);
    if (qty > 0) {
      onAddEntry(selectedVarillaIndex, qty);
      setQuantity(""); // Reset quantity but keep varilla selected for convenience
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tipo de Varilla
        </label>
        <select
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
          value={selectedVarillaIndex}
          onChange={(e) => setSelectedVarillaIndex(parseInt(e.target.value))}
        >
          {VARILLAS.map((v, index) => (
            <option key={v.no} value={index}>
              {v.no} (Ø {v.diamPulg}" | {v.diamMm}mm)
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-32">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Cantidad
        </label>
        <Input
          type="number"
          min="1"
          placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
      </div>

      <Button onClick={handleAdd} className="w-full sm:w-auto gap-2">
        <Plus className="h-4 w-4" />
        Agregar
      </Button>
    </div>
  );
}