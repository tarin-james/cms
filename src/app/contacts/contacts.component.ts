import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-contacts',
  imports: [ContactListComponent,RouterOutlet ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {




}
