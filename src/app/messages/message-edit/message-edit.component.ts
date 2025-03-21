import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  imports: [],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<Message>(); // Emit new messages
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  currentSender: string = '23';
  constructor(private messageService: MessageService) {}
  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.msgTextInput.nativeElement.value;

    if (subject && msgText) {
      const newMessage = new Message('1', subject, msgText, this.currentSender); // Hardcoded ID
      this.messageService.addMessage(newMessage); // Emit the new message
    }

    this.onClear(); // Clear the form fields
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}
