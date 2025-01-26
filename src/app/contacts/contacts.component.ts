import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component'
import { Contact } from './contact.model';
@Component({
  selector: 'app-contacts',
  imports: [ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact!: Contact; 

  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}
