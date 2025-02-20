import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model'; // Import the Contact model
import { ContactService } from '../contact.service'; // Import the ContactService
import { NgFor } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [NgFor, ContactItemComponent, RouterLink],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Get the list of contacts from the ContactService
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  // Emit the contactSelectedEvent when a contact is selected
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
