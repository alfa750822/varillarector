import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Download } from "lucide-react";
import { VARILLAS } from "./utils/const";
import EntryForm from "./components/EntryForm";
import EntryList, { Entry } from "./components/EntryList";
import SummaryCard from "./components/SummaryCard";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [nextLoteNumber, setNextLoteNumber] = useState(1);

  const handleAddEntry = (varillaIndex: number, quantity: number) => {
    const varilla = VARILLAS[varillaIndex];
    const weight = quantity * varilla.pesoUnitario * varilla.longitud;

    const newEntry: Entry = {
      id: Date.now().toString(),
      lote: nextLoteNumber,
      varillaIndex,
      quantity,
      weight,
    };

    setEntries([...entries, newEntry]);
    setNextLoteNumber(nextLoteNumber + 1);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">VarillaReceptor</h1>
          <p className="text-slate-600">Sistema de Recepción por Lotes</p>
        </div>

        <div id="receipt" className="space-y-6">
          {/* Formulario de Entrada */}
          <EntryForm onAddEntry={handleAddEntry} />

          {/* Lista de Lotes */}
          <Card>
            <CardHeader>
              <CardTitle>Detalle de Lotes</CardTitle>
              <CardDescription>
                Registro cronológico de recepción de material
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EntryList entries={entries} onDelete={handleDeleteEntry} />
            </CardContent>
          </Card>

          {/* Resumen */}
          <SummaryCard entries={entries} />
        </div>

        <div className="flex justify-center no-print">
          <Button onClick={handlePrint} size="lg" className="gap-2" disabled={entries.length === 0}>
            <Download className="h-5 w-5" />
            Imprimir Recibo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;