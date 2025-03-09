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
  maxContactId: number;
  private firebaseUrl = 'https://cms-project-851c2-default-rtdb.firebaseio.com/contacts.json'; // Firebase URL for contacts

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
    this.loadContactsFromServer();  // Load contacts from the server initially
  }

  // Helper method to load contacts from Firebase
  private loadContactsFromServer(): void {
    this.http.get<Contact[]>(this.firebaseUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts || [];
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  // Get the max ID for contact IDs
  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // Get the list of contacts
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // Store the updated list of contacts in Firebase
  storeContacts(): void {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, contactsString, { headers }).subscribe(
      () => {
        // Emit the updated list of contacts when the server responds successfully
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error('Error saving contacts:', error);
      }
    );
  }

  // Add a new contact
  addContact(newContact: Contact): void {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();  // Save the updated contact list to Firebase
  }

  // Update an existing contact
  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) return;
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();  // Save the updated contact list to Firebase
  }

  // Get a contact by its ID
  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id) || new Contact('fail', 'fail', 'fail', 'fail', 'fail', []);
  }

  // Delete a contact from the list
  deleteContact(contact: Contact | null): void {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();  // Save the updated contact list to Firebase
  }
}
