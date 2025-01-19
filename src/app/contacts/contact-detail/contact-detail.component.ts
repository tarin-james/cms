import { Component } from '@angular/core';
import { Contact } from '../contact.model'; // Import the Contact model

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  contact: Contact; // Define the variable of type Contact

  constructor() {
    // For now, leave the variable undefined or initialize it with dummy data if desired.
    this.contact = new Contact(
      '',
      '',
      '',
      '',
      '',
      []
    );
     
 
  }
}
