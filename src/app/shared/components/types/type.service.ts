import { Injectable } from '@angular/core';
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TypeService {
  public typeMultSelectSubject: Subject<Map<string, any>> = new Subject<Map<string, any>>();
  constructor() { }
}
