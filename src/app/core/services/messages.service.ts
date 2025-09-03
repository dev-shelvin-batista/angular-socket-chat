import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages:any = [];
  userSelected = '';

  constructor() { }
}
