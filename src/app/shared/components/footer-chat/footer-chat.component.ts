import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConnectionService } from '../../../intranet/connection.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MessagesService } from '../../../core/services/messages.service';

@Component({
  selector: 'app-footer-chat',
  templateUrl: './footer-chat.component.html',
  styleUrl: './footer-chat.component.scss',
  standalone: false
})
export class FooterChatComponent implements OnInit {

  messageForm = new FormGroup({
    message: new FormControl('')
  });

  constructor(
    private connectionSer: ConnectionService,
    private socket: Socket,
    public messagesSer: MessagesService
  ){}

  ngOnInit(): void {
      // Or subscribe to a specific control's valueChanges
      this.messageForm.get('message')?.valueChanges.subscribe(nameValue => {
        
        this.socket.emit('typing', {
          user: this.connectionSer.db.getItem('userNameAngular'),
          text: `Typing...`
        });
      });
  }

  /**
   * Method for notifying a new message
   * 
   * @param e Form event
   */
  sendMessage = (e: Event) => {
    e.preventDefault();

    if((this.messageForm.value.message || '').trim() != ""){
      let obj_message = {};
      const date = new Date();
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
      let year = date.getFullYear();
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      let currentDate = `${year}-${month}-${day} ${hour}:${minute}`;

      let listUsers = JSON.parse(this.connectionSer.db.getItem("list_usersAngular") || "[]");
      const user = listUsers.find((user:any) => user.socketID === this.messagesSer.userSelected);

      obj_message = {
        text: this.messageForm.value.message,
        date: currentDate,
        sender: this.connectionSer.db.getItem('userNameAngular'),
        to: this.messagesSer.userSelected
      }

      user.messages.push(obj_message)
      this.connectionSer.db.setItem('list_usersAngular', JSON.stringify(listUsers)); 

      
      this.messagesSer.messages.push(obj_message)

      this.socket.emit('message', obj_message);
      this.messageForm.patchValue({
        message: ''
      });
    }
  }
}
