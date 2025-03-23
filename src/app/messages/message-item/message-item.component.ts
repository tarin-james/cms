import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  imports: [],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent {
  @Input() message!: Message;
  messageSender: String | undefined = '';
  constructor(private contactService: ContactService) {}
  ngOnInit(): void {

    const contact: Contact = this.contactService.getContact(
      this.message.sender.id
    );
    this.messageSender = contact.name;
  }
}
