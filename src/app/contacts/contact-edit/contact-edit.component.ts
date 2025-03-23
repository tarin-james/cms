import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
@Component({
  selector: 'cms-contact-edit',
  imports: [FormsModule, NgIf, ContactItemComponent, CdkDropList, NgForOf],

  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;
  canAdd : boolean = true;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      this.originalContact?.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      this.canAdd = false
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      this.canAdd = false;
      return true;
    };
    const inGroup = this.groupContacts.some(
      (groupContact) => newContact.id === groupContact.id
    );
    inGroup ? this.canAdd = false : this.canAdd = true
    return inGroup;
  }

  // Method to add a contact to the group
  addToGroup(event: CdkDragDrop<Contact[]>): void {
    const selectedContact: Contact = event.item.data; // Retrieve the contact being dragged
    const invalidGroupContact = this.isInvalidContact(selectedContact); // Check if it's valid
    if (invalidGroupContact) {
      return; // Exit if contact is invalid
    }
    this.groupContacts.push(selectedContact); // Add valid contact to the group
  }

  // Method to remove a contact from the group by index
  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length) {
      return; // Exit if index is invalid
    }
    this.groupContacts.splice(index, 1); // Remove the contact from the group
  }
}
