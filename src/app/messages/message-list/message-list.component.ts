import { Component } from '@angular/core';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Message } from '../message.model';
import { NgFor } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  imports: [MessageEditComponent, MessageItemComponent, NgFor],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [];
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {

        this.messages = messages; 
      }
    );
  }
}
