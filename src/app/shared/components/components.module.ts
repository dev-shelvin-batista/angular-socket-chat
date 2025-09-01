import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FooterChatComponent } from './footer-chat/footer-chat.component';
import { MessagesChatComponent } from './messages-chat/messages-chat.component';
import { UsersOnlineComponent } from './users-online/users-online.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderChatComponent } from './header-chat/header-chat.component';
import { AlertComponent } from './alert/alert.component';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [FooterChatComponent, MessagesChatComponent, UsersOnlineComponent, HeaderChatComponent, AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FooterChatComponent, MessagesChatComponent, UsersOnlineComponent, HeaderChatComponent, AlertComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
