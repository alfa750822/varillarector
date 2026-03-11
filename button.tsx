import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Plus } from "lucide-react";
import { VARILLAS, getVarillaByNo } from "../utils/const";
import { Lote } from "../types";
import { VarillaSelector } from "./VarillaSelector";

interface LoteFormProps {
  onAddLote: (lote: Lote) => void;
  nextLoteNumber: number;
  selectedVarilla: string;
  onVarillaChange: (value: string) => void;
}

export function LoteForm({ onAddLote, nextLoteNumber, selectedVarilla, onVarillaChange }: LoteFormProps) {
  const [cantidad, setCantidad] = useState<string>("");

  const selectedVarillaData = selectedVarilla ? getVarillaByNo(selectedVarilla) : null;
  const pesoCalculado = selectedVarillaData && cantidad 
    ? parseInt(cantidad) * selectedVarillaData.pesoUnitario * selectedVarillaData.longitud 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVarilla || !cantidad || parseInt(cantidad) <= 0) {
      return;
    }

    const varillaData = getVarillaByNo(selectedVarilla);
    if (!varillaData) return;

    const nuevoLote: Lote = {
      id: nextLoteNumber,
      varillaNo: selectedVarilla,
      cantidad: parseInt(cantidad),
      pesoTotal: pesoCalculado,
      fecha: new Date(),
    };

    onAddLote(nuevoLote);
    
    // Solo limpiamos la cantidad, mantenemos la selección de varilla
    setCantidad("");
  };

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Ingresar Nuevo Lote
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <VarillaSelector 
            selectedVarilla={selectedVarilla}
            onVarillaChange={onVarillaChange}
          />
          
          <div className="space-y-2">
            <Label htmlFor="cantidad" className="text-sm font-medium text-slate-700">
              Cantidad de Varillas
            </Label>
            <Input
              id="cantidad"
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Ingrese la cantidad"
              className="w-full"
              autoFocus={selectedVarilla !== ""}
            />
          </div>

          {selectedVarillaData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Peso unitario:</span>
                <span className="font-medium text-slate-800">{selectedVarillaData.pesoUnitario.toFixed(3)} kg/m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Longitud:</span>
                <span className="font-medium text-slate-800">{selectedVarillaData.longitud} m</span>
              </div>
              <div className="flex justify-between text-sm border-t border-blue-200 pt-2">
                <span className="text-slate-600 font-medium">Peso total:</span>
                <span className="font-bold text-blue-700">{pesoCalculado.toFixed(2)} kg</span>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-slate-700 hover:bg-slate-800 text-white"
            disabled={!selectedVarilla || !cantidad || parseInt(cantidad) <= 0}
          >
            Agregar Lote #{nextLoteNumber}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}