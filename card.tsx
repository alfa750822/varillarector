import { Lote } from "../types";

export const exportToCSV = (lotes: Lote[]) => {
  if (lotes.length === 0) return;

  const headers = ['Lote #', 'Varilla', 'Cantidad', 'Peso Total (kg)', 'Fecha'];
  
  const rows = lotes.map(lote => [
    lote.id,
    lote.varillaNo,
    lote.cantidad,
    lote.pesoTotal.toFixed(2),
    new Date(lote.fecha).toLocaleString('es-ES')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `lotes_varillas_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};