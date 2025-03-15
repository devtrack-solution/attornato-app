import { Injectable } from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

export interface AlertOptions {
  title: string;
  text: string;
  icon: SweetAlertIcon;
  cancellText: string;
  confirmText: string;
}
export enum AlertIcon  {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question'
}
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  timerInterval: any;
  textContent!: number | undefined;
  constructor() { }


  async confirmAlert(config: AlertOptions): Promise<any> {
    return Swal.fire({
      title: config.title,
      text: config.text,
      icon: config.icon,
      showCloseButton: true,
      showCancelButton: true
    });
  }
}
