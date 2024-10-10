import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  selected = new ReplaySubject<any>();
  templateMode = new ReplaySubject<boolean>();
  clearSearch = new ReplaySubject<boolean>();

  select = (value: any) => {
    this.selected.next(value);
  }
}
