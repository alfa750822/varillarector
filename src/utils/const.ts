import { Varilla } from "../types";

export const VARILLAS: Varilla[] = [
  { no: "No. 2", diamPulg: "1/4", diamMm: 6.40, pesoUnitario: 0.250, longitud: 12, barrasPorTon: 333.333, barrasPorTonRed: 333 },
  { no: "No. 3", diamPulg: "3/8", diamMm: 9.50, pesoUnitario: 0.560, longitud: 12, barrasPorTon: 148.809, barrasPorTonRed: 149 },
  { no: "No. 4", diamPulg: "1/2", diamMm: 12.70, pesoUnitario: 0.994, longitud: 12, barrasPorTon: 83.836, barrasPorTonRed: 84 },
  { no: "No. 5", diamPulg: "5/8", diamMm: 15.90, pesoUnitario: 1.552, longitud: 12, barrasPorTon: 53.683, barrasPorTonRed: 54 },
  { no: "No. 6", diamPulg: "3/4", diamMm: 19.10, pesoUnitario: 2.235, longitud: 12, barrasPorTon: 37.309, barrasPorTonRed: 37 },
  { no: "No. 7", diamPulg: "7/8", diamMm: 22.20, pesoUnitario: 3.042, longitud: 12, barrasPorTon: 27.416, barrasPorTonRed: 27 },
  { no: "No. 8", diamPulg: "1", diamMm: 25.40, pesoUnitario: 3.973, longitud: 12, barrasPorTon: 20.982, barrasPorTonRed: 21 },
  { no: "No. 9", diamPulg: "1-1/8", diamMm: 28.70, pesoUnitario: 5.028, longitud: 12, barrasPorTon: 16.573, barrasPorTonRed: 17 },
  { no: "No. 10", diamPulg: "1-1/4", diamMm: 32.30, pesoUnitario: 6.207, longitud: 12, barrasPorTon: 13.434, barrasPorTonRed: 13 },
  { no: "No. 11", diamPulg: "1-3/8", diamMm: 35.80, pesoUnitario: 7.510, longitud: 12, barrasPorTon: 11.105, barrasPorTonRed: 11 },
  { no: "No. 14", diamPulg: "1-3/4", diamMm: 43.00, pesoUnitario: 10.840, longitud: 12, barrasPorTon: 7.690, barrasPorTonRed: 8 },
  { no: "No. 18", diamPulg: "2-1/4", diamMm: 57.30, pesoUnitario: 19.262, longitud: 12, barrasPorTon: 4.328, barrasPorTonRed: 4 },
];

export const getVarillaByNo = (no: string): Varilla | undefined => {
  return VARILLAS.find(v => v.no === no);
};