import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConnectionService } from '../../../intranet/connection.service';
import { MessagesService } from '../../../core/services/messages.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrl: './users-online.component.scss',
  standalone: false
})
export class UsersOnlineComponent implements OnInit {
  listUsers:any = [];

  constructor(
    public connectionSer: ConnectionService,
    private socket: Socket,
    private messagesSer: MessagesService
  ) { }

  ngOnInit(): void {
    this.generateUsers();

    // Event socket for new or existing user logging in
    this.socket.on('newUserResponse', (data) => {
      
      let list = JSON.parse((this.connectionSer.db.getItem("list_usersAngular") || "[]"));
      data.list.map((item:any) => {
        const exist:any = list.find((user:any) => user.socketID === item.userName);
        if(!exist){
          list.push({
            userName: item.userName, socketID: item.socketID, nuevos_mensajes: 0, online: item.online, messages: []
          })
        } else {
          exist.online = item.online;
        }
      });
      const user = list.find((user:any) => user.socketID === data.user.userName);
      if(user){
        user.online = data.user.online
      }else{
        list.push({
          userName: data.user.userName, socketID: data.user.socketID, nuevos_mensajes: 0, online: data.user.online, messages: []
        })
      }
      this.listUsers = [...list];
      this.connectionSer.db.setItem('list_usersAngular', JSON.stringify(list));  
     
    });

    // Socket event for receiving a new message
    this.socket.on(`messageResponse-${this.connectionSer.db.getItem("userNameAngular")}`, (data) => {
      let list = JSON.parse(this.connectionSer.db.getItem("list_usersAngular") || "[]");
      
      const user = list.find((user:any) => user.socketID === data.sender);

      if(this.messagesSer.userSelected === ""){
        user.nuevos_mensajes += 1
      }

      user.messages.push({
        text: data.text,
        date: data.date,
        sender: data.sender,
        to: data.to
      });
      this.messagesSer.messages = [...user.messages]
      
      this.connectionSer.db.setItem('list_usersAngular', JSON.stringify(list));   
      this.listUsers = [...list];
    });
  }

  /**
   * Method for loading the list of users saved in localStorage
   */
  generateUsers = () => {
    let listUsers = this.connectionSer.db.getItem("list_usersAngular") || "[]";
    listUsers = JSON.parse(listUsers);
    this.listUsers = [...listUsers]
  }

  /**
   * Method for selecting a user and displaying their chat messages
   * @param event 
   * @param row Object with the selected user's data
   */
  selectUser = (row:any) => {
    this.messagesSer.userSelected = row.socketID;

    row.nuevos_mensajes = 0;
    
    let listUsers = JSON.parse(this.connectionSer.db.getItem("list_usersAngular") || "[]");

    listUsers.map((item:any) => {
      if(item.socketID == this.messagesSer.userSelected) {
        item.nuevos_mensajes = 0;
        this.messagesSer.messages = [...item.messages]
      }
    })
  
    this.connectionSer.db.setItem('list_usersAngular', JSON.stringify(listUsers));   
    this.listUsers = [...listUsers];
  }
  
}
