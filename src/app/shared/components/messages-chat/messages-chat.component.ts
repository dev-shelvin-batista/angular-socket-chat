import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ConnectionService } from '../../../intranet/connection.service';
import { Socket } from 'ngx-socket-io';
import { MessagesService } from '../../../core/services/messages.service';

@Component({
  selector: 'app-messages-chat',
  templateUrl: './messages-chat.component.html',
  styleUrl: './messages-chat.component.scss',
  standalone: false
})
export class MessagesChatComponent implements OnInit {
  typingStatus = '';
  @ViewChild('scrollContainer') private myScrollContainer!: ElementRef;

  constructor(
    public connectionSer: ConnectionService,
    private socket: Socket,
    public messagesSer: MessagesService
  ){

  }

  ngOnInit(): void {
    this.socket.on('typingResponse', (data) => {
      if(this.messagesSer.userSelected == data.user){
        this.typingStatus = data.text;
      }
      setTimeout(() => {
        this.typingStatus = '';
      }, 1000);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  /**
   * Method for scrolling to the end
   */
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  // Keyboard event with the Escape key that closes the current chat
  @HostListener('window:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.messagesSer.messages = []
    this.messagesSer.userSelected = '';
  }
}
