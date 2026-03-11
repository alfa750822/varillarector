import { useState } from "react";
import { LoteForm } from "./components/LoteForm";
import { LoteList } from "./components/LoteList";
import { exportToCSV } from "./utils/exportCSV";
import { Lote } from "./types";

function App() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [nextLoteNumber, setNextLoteNumber] = useState(1);
  const [selectedVarilla, setSelectedVarilla] = useState<string>("");

  const handleAddLote = (nuevoLote: Lote) => {
    setLotes([...lotes, nuevoLote]);
    setNextLoteNumber(nextLoteNumber + 1);
  };

  const handleDeleteLote = (id: number) => {
    setLotes(lotes.filter(lote => lote.id !== id));
  };

  const handleExportCSV = () => {
    exportToCSV(lotes);
    // Limpiar selección de varilla solo al exportar
    setSelectedVarilla("");
  };

  // Ordenar lotes: el último agregado aparece primero
  const sortedLotes = [...lotes].reverse();

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">VarillaReceptor</h1>
          <p className="text-slate-600">Sistema de Recepción de Varillas por Lotes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <LoteForm 
              onAddLote={handleAddLote}
              nextLoteNumber={nextLoteNumber}
              selectedVarilla={selectedVarilla}
              onVarillaChange={setSelectedVarilla}
            />
          </div>

          {/* List Section */}
          <div>
            <LoteList 
              lotes={sortedLotes}
              onDeleteLote={handleDeleteLote}
              onExportCSV={handleExportCSV}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} VarillaReceptor — Registro por Lotes</p>
        </div>
      </div>
    </div>
  );
}

export default App;