import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.loadContactsFromServer();  // Load contacts from the server initially
  }

  // Helper method to load contacts from the NodeJS server
  private loadContactsFromServer(): void {
    this.http.get<Contact[]>('http://localhost:3000/contacts').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts || [];
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  // Get the list of contacts
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // Add a new contact
  addContact(newContact: Contact): void {
    if (!newContact) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, contact: Contact }>(
      'http://localhost:3000/contacts', newContact, { headers }
    ).subscribe(responseData => {
      this.contacts.push(responseData.contact);
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  // Update an existing contact
  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`http://localhost:3000/contacts/${originalContact.id}`,
      newContact, { headers }
    ).subscribe(() => {
      const pos = this.contacts.findIndex(c => c.id === originalContact.id);
      if (pos >= 0) {
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    });
  }

  // Get a contact by its ID
  getContact(id: string): Contact  {

    return this.contacts.find(contact => contact.id === id) || new Contact('fail', 'fail', 'fail', 'fail', 'fail', []);
  }

  // Delete a contact
  deleteContact(contact: Contact | null): void {
    if (!contact) return;

    this.http.delete(`http://localhost:3000/contacts/${contact.id}`).subscribe(
      () => {
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
  }
}
