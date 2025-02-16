import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'cms-contact-item',
  imports: [RouterLink],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact!: Contact;
}
