export interface Lote {
  id: number;
  varillaNo: string;
  cantidad: number;
  pesoTotal: number;
  fecha: Date;
}

export interface Varilla {
  no: string;
  diamPulg: string;
  diamMm: number;
  pesoUnitario: number;
  longitud: number;
  barrasPorTon: number;
  barrasPorTonRed: number;
}