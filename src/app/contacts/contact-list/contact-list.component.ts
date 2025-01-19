import { Component } from '@angular/core';
import { Contact } from '../contact.model'; // Import the Contact model

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  contacts: Contact[] = [
    new Contact(
      '1',
      'R. Kent Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '../../../assets/images/jacksonk.jpg',
      [] // Initialize as an empty array
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '../../../assets/images/barzeer.jpg',
      [] // Initialize as an empty array
    ),
  ];
}
