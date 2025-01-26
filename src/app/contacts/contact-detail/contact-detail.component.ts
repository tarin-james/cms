import { Component } from '@angular/core';
import { Contact } from '../contact.model'; // Import the Contact model
import { Input } from '@angular/core';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {



    @Input() contact!: Contact;
     
 
  
}
