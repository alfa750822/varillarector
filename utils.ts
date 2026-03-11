import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { VARILLAS } from "../utils/const";

interface VarillaSelectorProps {
  selectedVarilla: string;
  onVarillaChange: (value: string) => void;
}

export function VarillaSelector({ selectedVarilla, onVarillaChange }: VarillaSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="varilla-select" className="text-sm font-medium text-slate-700">
        Seleccionar Varilla
      </Label>
      <Select value={selectedVarilla} onValueChange={onVarillaChange}>
        <SelectTrigger id="varilla-select" className="w-full">
          <SelectValue placeholder="Seleccione el número de varilla" />
        </SelectTrigger>
        <SelectContent>
          {VARILLAS.map((varilla) => (
            <SelectItem key={varilla.no} value={varilla.no}>
              {varilla.no} - Ø {varilla.diamPulg}" ({varilla.diamMm}mm)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}