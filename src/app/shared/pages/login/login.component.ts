import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../../intranet/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('')
  });

  constructor(
    private connectionSer: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socket: Socket
  ){ }

  /**
   * Método para realizar el inicio de sesión y enviar la notificación del usuario conectadose
   * 
   * @param e 
   */
  login = (e: Event) => {
    e.preventDefault();
    console.log(this.loginForm.value.userName);
    if((this.loginForm.value.userName || '').trim() !== ""){
      this.connectionSer.db.setItem('userName', (this.loginForm.value.userName || ''));
      
      this.socket.emit('newUserLogin', { userName: this.loginForm.value.userName, socketID: this.loginForm.value.userName, online: true}); 
      this.router.navigate(['/home'], { relativeTo: this.activatedRoute });
      this.loginForm.patchValue({
        userName: ''
      });
    }
  }  
}
