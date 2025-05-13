import { Injectable } from '@angular/core';
import moment from 'moment';

export interface Option {
  label: string;
  value: string;

  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  dateFormat(date: Date): string {
    return moment(date).format('DD/MM/YYYY');
  }

  dateAndHourFormat(date: Date): string {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }

  getLabel(value: any, collection: Option[] = []): string {
    let result = '';
    if (value !== undefined && value !== null && collection.length > 0) {
      for (const v of collection) {
        if (v.value === value) {
          result = v.label;
        }
      }
    }
    return result;
  }
}

export type PDF = {
  data: string;
  name: string;
};

function base64ToArrayBuffer(base64: any) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function downloadPDF(pdf: PDF, reportType: string) {
  const buffer = base64ToArrayBuffer(pdf.data);
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  const fileName = `EXTRATO_PESAGEM_${reportType}.pdf`;

  downloadLink.href = url;
  downloadLink.download = fileName;
  // downloadLink.target = '_blank';
  downloadLink.click();
}
