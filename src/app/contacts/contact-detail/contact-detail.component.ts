import { Component } from '@angular/core';
import { Contact } from '../contact.model'; // Import the Contact model
import { Input } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { NgForOf,NgIf } from '@angular/common';

@Component({
  imports: [RouterLink, ContactItemComponent, NgForOf, NgIf],
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent {
  @Input() contact!: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {} // Inject the ContactService

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id']; // Get 'id' from route parameters
      this.contact = this.contactService.getContact(id); // Fetch document
    });
    // Subscribe to the contactSelectedEvent

    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.contact = contact; // Assign the selected contact
    });
  }
  onDelete() {
    this.contactService.deleteContact(this.contact);
  }
}
