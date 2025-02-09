import { Component } from '@angular/core';
import { Contact } from '../contact.model'; // Import the Contact model
import { Input } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent {
  @Input() contact!: Contact;

  constructor(private contactService: ContactService) {} // Inject the ContactService

  ngOnInit(): void {
    // Subscribe to the contactSelectedEvent
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.contact = contact; // Assign the selected contact
    });
  }
}
