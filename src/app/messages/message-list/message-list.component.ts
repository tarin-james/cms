import { Component } from '@angular/core';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Message } from '../message.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-message-list',
  imports: [MessageEditComponent, MessageItemComponent, NgFor ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Assignment Posted', 'The grades for this assignment have been posted.', 'Bro. Jackson'),
    new Message('2', 'Assignment Due', 'When is assignment 3 due?', 'Steve Johnson'),
    new Message('3', 'Assignment Deadline', 'Assignment 3 is due on Saturday at 11:30 PM.', 'Bro. Jackson')
  ];

  onAddMessage(newMessage: Message) {
    this.messages.push(newMessage); // Add the new message to the list
  }
}
