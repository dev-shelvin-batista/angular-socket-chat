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

    // Evento socket de nuevo usuario o uno ya existente que inici sesión
    this.socket.on('newUserResponse', (data) => {
      this.socket.on('newUserResponse', (data) => {
        let list = JSON.parse((this.connectionSer.db.getItem("listado_usuarios") || "[]"));
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
        this.connectionSer.db.setItem('listado_usuarios', JSON.stringify(list));  
      });
    });

    // Evento socket de recibir un nuevo mensaje
    this.socket.on(`messageResponse-${this.connectionSer.db.getItem("userName")}`, (data) => {
      let list = JSON.parse(this.connectionSer.db.getItem("listado_usuarios") || "[]");
      
      const user = list.find((user:any) => user.socketID === data.sender);

      if(this.messagesSer.usuarioSeleccionado === ""){
        user.nuevos_mensajes += 1
      }

      user.messages.push({
        text: data.text,
        date: data.date,
        sender: data.sender,
        to: data.to
      });
      this.messagesSer.messages = [...user.messages]
      
      this.connectionSer.db.setItem('listado_usuarios', JSON.stringify(list));   
      this.listUsers = [...list];
    });
  }

  /**
   * Metodo para cargar el listado de usuarios guardado en el localStorage
   */
  generateUsers = () => {
    let listUsers = this.connectionSer.db.getItem("listado_usuarios") || "[]";
    listUsers = JSON.parse(listUsers);
    this.listUsers = [...listUsers]
  }

  /**
   * Metodo para seleccionar un usuario y asi mostrar sus mensajes del chat
   * @param event 
   * @param row Objeto con los datos del usuario seleccionado
   */
  selectUser = (row:any) => {
    this.messagesSer.usuarioSeleccionado = row.socketID;

    row.nuevos_mensajes = 0;
    
    let listUsers = JSON.parse(this.connectionSer.db.getItem("listado_usuarios") || "[]");

    listUsers.map((item:any) => {
      if(item.socketID == this.messagesSer.usuarioSeleccionado) {
        item.nuevos_mensajes = 0;
        this.messagesSer.messages = [...item.messages]
      }
    })
  
    this.connectionSer.db.setItem('listado_usuarios', JSON.stringify(listUsers));   
    this.listUsers = [...listUsers];
  }
  
}
