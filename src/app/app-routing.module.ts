import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';


// Define the root routes
const appRoutes: Routes = [
  { path: '', component: DocumentsComponent }, // Default route
  { path: 'contacts', component: ContactsComponent }, // Contacts page
  { path: 'documents', component: DocumentsComponent,     
    children: [
    { path: 'new', component: DocumentEditComponent }, // Route for new document
    { path: ':id', component: DocumentDetailComponent }, // Route for viewing a document
    { path: ':id/edit', component: DocumentEditComponent } // Route for editing a document
  ] }, // Documents page
  { path: 'messages', component: MessageListComponent }, // Messages page
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], // Import and configure RouterModule with routes
  exports: [RouterModule] // Export RouterModule for use in other modules
})
export class AppRoutingModule { }
