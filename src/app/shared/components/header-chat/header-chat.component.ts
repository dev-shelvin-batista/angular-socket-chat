import { Component } from '@angular/core';
import { ConnectionService } from '../../../intranet/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AlertsService } from '../../../core/utils/alerts.service';

@Component({
  selector: 'app-header-chat',
  templateUrl: './header-chat.component.html',
  styleUrl: './header-chat.component.scss',
  standalone: false
})
export class HeaderChatComponent {

  constructor(
    private connectionSer: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socket: Socket,
    private alertSer: AlertsService  ) {}

  /**
   * Method for logging out and exiting the chat
   */
  logOut = () => {
    this.alertSer.openAlert(
      "Confirmación", 
      "¿Desea cerrar sesión?",
      "Si",
      () => {
        this.socket.emit('disconnectUser', { userName: this.connectionSer.db.getItem("userNameAngular"), socketID: this.connectionSer.db.getItem("userNameAngular") });
        this.connectionSer.db.removeItem('userNameAngular');
        this.router.navigate(['/login'], { relativeTo: this.activatedRoute });
      },
      "No"
    )
    
  }
}
