import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {transports: ['websocket'],} };

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
