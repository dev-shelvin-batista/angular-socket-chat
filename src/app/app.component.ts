import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectionService } from './intranet/connection.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private connectionSer: ConnectionService
  ){
    this.connectionSer.connectDB();
  }
}
