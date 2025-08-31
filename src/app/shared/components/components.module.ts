import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterChatComponent } from './footer-chat/footer-chat.component';
import { MessagesChatComponent } from './messages-chat/messages-chat.component';
import { UsersOnlineComponent } from './users-online/users-online.component';
import { FormsModule } from '@angular/forms';
import { HeaderChatComponent } from './header-chat/header-chat.component';



@NgModule({
  declarations: [FooterChatComponent, MessagesChatComponent, UsersOnlineComponent, HeaderChatComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FooterChatComponent, MessagesChatComponent, UsersOnlineComponent, HeaderChatComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
