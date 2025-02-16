import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

// Define the root routes
export const routes: Routes = [
  { path: '', redirectTo: 'documents', pathMatch: 'full' }, // Default route
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      { path: 'new', component: ContactEditComponent }, // Route for new document
      { path: ':id', component: ContactDetailComponent }, // Route for viewing a document
      { path: ':id/edit', component: ContactEditComponent }, // Route for editing a document
    ],
  },
  // Contacts page
  {
    path: 'documents',
    component: DocumentsComponent,
    children: [
      { path: 'new', component: DocumentEditComponent }, // Route for new document
      { path: ':id', component: DocumentDetailComponent }, // Route for viewing a document
      { path: ':id/edit', component: DocumentEditComponent }, // Route for editing a document
    ],
  }, // Documents page
  { path: 'messages', component: MessageListComponent }, // Messages page
];
