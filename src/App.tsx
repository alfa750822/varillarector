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
    setEntries([]);
    setNextLoteNumber(1);
  };

  const handleExportCSV = () => {
    // Definir encabezados del CSV
    const headers = ["Lote", "Varilla", "Diametro (pulg)", "Cantidad", "Peso (kg)"];
    
    // Mapear las entradas a filas de texto
    // Usamos el orden original (cronológico) para el reporte, no el invertido de la vista
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

    // Unir encabezados y filas
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Crear un Blob con el contenido
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Crear un enlace temporal para descargar
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    
    // Nombre del archivo con fecha actual
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute("download", `recepcion_varillas_${today}.csv`);
    
    // Simular clic y limpiar
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
              <EntryList 
                entries={entries.slice().reverse()} 
                onDelete={handleDeleteEntry} 
              />
            </CardContent>
          </Card>

          {/* Resumen */}
          <SummaryCard entries={entries} />
        </div>

        {/* Botones de Acción */}
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