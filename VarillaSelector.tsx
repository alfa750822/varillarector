import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Download, FileText } from "lucide-react";
import { VARILLAS } from "./utils/const";
import EntryForm from "./components/EntryForm";
import EntryList, { Entry } from "./components/EntryList";
import SummaryCard from "./components/SummaryCard";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [nextLoteNumber, setNextLoteNumber] = useState(1);

  const handleAddEntry = (varillaIndex: number, quantity: number) => {
    const varilla = VARILLAS[varillaIndex];
    
    // CÁLCULO ACTUALIZADO: Basado en barras por tonelada redondeado
    // Peso = (Cantidad * 1000kg) / BarrasPorTonRed
    const weight = (quantity * 1000) / varilla.barrasPorTonRed;

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
    setEntries([]);
    setNextLoteNumber(1);
  };

  const handleExportCSV = () => {
    const headers = ["Lote", "Varilla", "Diametro (pulg)", "Cantidad", "Peso (kg)"];
    
    const rows = entries.map(entry => {
      const varilla = VARILLAS[entry.varillaIndex];
      return [
        entry.lote,
        varilla.no,
        varilla.diamPulg,
        entry.quantity,
        entry.weight.toFixed(2)
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute("download", `recepcion_varillas_${today}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">VarillaReceptor</h1>
          <p className="text-slate-600">Sistema de Recepción por Lotes</p>
        </div>

        <div id="receipt" className="space-y-6">
          <EntryForm onAddEntry={handleAddEntry} />

          <Card>
            <CardHeader>
              <CardTitle>Detalle de Lotes</CardTitle>
              <CardDescription>
                Registro cronológico de recepción de material
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EntryList 
                entries={entries.slice().reverse()} 
                onDelete={handleDeleteEntry} 
              />
            </CardContent>
          </Card>

          <SummaryCard entries={entries} />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 no-print">
          <Button 
            onClick={handleExportCSV} 
            variant="outline" 
            size="lg" 
            className="gap-2" 
            disabled={entries.length === 0}
          >
            <FileText className="h-5 w-5" />
            Exportar CSV
          </Button>
          
          <Button 
            onClick={handlePrint} 
            size="lg" 
            className="gap-2" 
            disabled={entries.length === 0}
          >
            <Download className="h-5 w-5" />
            Imprimir y Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;